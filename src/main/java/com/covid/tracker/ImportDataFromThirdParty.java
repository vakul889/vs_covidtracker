package com.covid.tracker;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.covid.tracker.mapper.CityDataMapper;
import com.covid.tracker.mapper.CountryDataMapper;
import com.covid.tracker.mapper.StateDataMapper;
import com.covid.tracker.model.CityData;
import com.covid.tracker.model.CountryData;
import com.covid.tracker.model.StateData;
import com.covid.tracker.repository.CityRepository;
import com.covid.tracker.repository.CountryRepository;
import com.covid.tracker.repository.StateRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;


@PropertySource("classpath:application.properties")
@Component
public class ImportDataFromThirdParty{
    private static final String COUNTRY_API_URL = "https://api.covidindiatracker.com/total.json";
    private static final String STATE_API_URL = "https://api.covidindiatracker.com/state_data.json";
    private static final String CITY_API_URL = "https://api.covid19india.org/v2/state_district_wise.json";
//	private static final String COUNTRY_API_URL = "http://localhost:8080/api/countrydata";
//    private static final String STATE_API_URL = "http://localhost:8080/api/statedata";
//    private static final String CITY_API_URL = "http://localhost:8080/api/citydata";
    private static final Logger logger = LoggerFactory.getLogger(TrackerApplication.class);
    
    @Autowired
    RestTemplate restTemplate;
    @Autowired
	private CountryRepository countryRepository;
    @Autowired
	private StateRepository stateRepository;
    @Autowired
	private CityRepository cityRepository;
    
    
        
    public String getData() throws RestClientException, Exception {
    	 HttpHeaders headers = new HttpHeaders();
         headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
         HttpEntity <String> entity = new HttpEntity<String>(headers);
         
         String countryString = restTemplate.exchange(COUNTRY_API_URL, 
      		   HttpMethod.GET, entity, String.class).getBody();
         String stateString = restTemplate.exchange(STATE_API_URL, 
        		   HttpMethod.GET, entity, String.class).getBody();
         String cityString = restTemplate.exchange(CITY_API_URL, 
      		   HttpMethod.GET, entity, String.class).getBody();
         
         logger.info("************************Fetch data from API***************************");
//         logger.debug("Country data recieved successfully : " + countryString);
//         logger.debug("State data recieved successfully : " + stateString.substring(0, 1000));
//         logger.debug("City data recieved successfully : " + cityString.substring(0, 1000));
         logger.info("**********************************************************************");
         
         ObjectMapper mapper = new ObjectMapper();
         JsonNode countryNode = (JsonNode) mapper.readTree(countryString);
 		 ArrayNode stateArrayNode = (ArrayNode) mapper.readTree(stateString);
 		 ArrayNode cityArrayNode = (ArrayNode) mapper.readTree(cityString);

 		 CountryDataMapper newCountryNode = mapper.treeToValue(countryNode, CountryDataMapper.class);
 		 
 		 List<StateDataMapper> stateList = new ArrayList<StateDataMapper>();
 		 List<CityDataMapper> cityList = new ArrayList<CityDataMapper>();
 		 for (JsonNode jsonNode : stateArrayNode) {
			StateDataMapper newJsonNode = mapper.treeToValue(jsonNode, StateDataMapper.class);
			stateList.add(newJsonNode);
 		 }	
 		 for (JsonNode jsonNode : cityArrayNode) {
			CityDataMapper newJsonNode = mapper.treeToValue(jsonNode, CityDataMapper.class);
			cityList.add(newJsonNode);
 		 }
 		 
 		 logger.info("****************************SAVE Data to DB***********************");
 		 Boolean countrySave = SaveCountryData(newCountryNode);
 		 logger.info("Country Data saved : "+countrySave);
 		 Boolean stateSave = SaveStateData(stateList);
 		 logger.info("State Data saved : "+stateSave);
 		 Boolean citySave = SaveCityData(cityList);
 		 logger.info("City Data saved : "+citySave);
         
         Date date = new Date();
         return "ImportDataFromThirdParty ran at: " + date.toString(); 
    }
    
    private Boolean SaveCityData(List<CityDataMapper> cityList) {
		List<CityData> objList = new ArrayList<CityData>();
		for(CityDataMapper mapper : cityList) {
			for(LinkedHashMap<String, Object> data : mapper.getCityArray()) {
				CityData cityData = new CityData();
				cityData.setStatecode(mapper.getStateId().substring(mapper.getStateId().indexOf("-")+1));
				Iterator<String> iter = data.keySet().iterator();
				while(iter.hasNext()) {
					String key = iter.next();
					Object value = data.get(key);
					switch(key) {
						case "district":
							cityData.setName((String)value);
							break;
						case "active":
							cityData.setActive(value+"");
							break;
						case "confirmed":
							cityData.setConfirmed(value+"");
							break;
						case "deceased":
							cityData.setDeaths(value+"");
							break;
						case "recovered":
							cityData.setRecovered(value+"");
							break;
						case "delta" :
							LinkedHashMap<String, Integer> deltaHashMap = (LinkedHashMap<String, Integer>) value;
							cityData.setaChanges((deltaHashMap.get("confirmed") - (deltaHashMap.get("deceased") + deltaHashMap.get("recovered")))+"");
							cityData.setcChanges(deltaHashMap.get("confirmed") + "");
							cityData.setrChanges(deltaHashMap.get("deceased") + "");
							cityData.setdChanges(deltaHashMap.get("recovered") + "");
						default: break;
					}
				}
				objList.add(cityData);
			}
		}
		cityRepository.saveAll(objList);
		return true;
	}

	private Boolean SaveStateData(List<StateDataMapper> stateList) {
		List<StateData> objList = new ArrayList<StateData>();
		for(StateDataMapper mapper : stateList) {
			StateData stateData = new StateData();
			stateData.setCountrycode("IN");
			stateData.setStatecode(("IN-UNK".equalsIgnoreCase(mapper.getId()))?"UN":mapper.getId().substring(mapper.getId().indexOf("-")+1));
			stateData.setName(mapper.getState());
			stateData.setActive(mapper.getActive());
			stateData.setConfirmed(mapper.getConfirmed());
			stateData.setRecovered(mapper.getRecovered());
			stateData.setDeaths(mapper.getDeaths());
			stateData.setaChanges(mapper.getaChanges());
			stateData.setcChanges(mapper.getcChanges());
			stateData.setrChanges(mapper.getrChanges());
			stateData.setdChanges(mapper.getdChanges());
			objList.add(stateData);
		}
		stateRepository.saveAll(objList);
		return true;
	}

	private Boolean SaveCountryData(CountryDataMapper newCountryNode) {
		CountryData countryData = new CountryData();
		countryData.setCountrycode("IN");
		countryData.setActive(newCountryNode.getActive());
		countryData.setConfirmed(newCountryNode.getConfirmed());
		countryData.setRecovered(newCountryNode.getRecovered());
		countryData.setDeaths(newCountryNode.getDeaths());
		countryData.setaChanges(newCountryNode.getaChanges());
		countryData.setcChanges(newCountryNode.getcChanges());
		countryData.setrChanges(newCountryNode.getrChanges());
		countryData.setdChanges(newCountryNode.getdChanges());
		countryRepository.save(countryData);
		return true;
	}

	@Scheduled(fixedRate = 86400000)
	//@Scheduled(cron = "0 0 4 1/1 * ?") 
    public void RunSchedular() throws RestClientException, Exception{
    	this.getData();
    }
	
}
