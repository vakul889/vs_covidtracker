package com.covid.tracker;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.covid.tracker.model.CountryData;
import com.covid.tracker.repository.CountryRepository;
 
@RestController
public class HelloController {
	
	
    @GetMapping("/api/hello")
    public String hello() {
        return "Covid Tracker, the time at the server is now " + new Date() + "\n";
    }
    
    @Autowired
	private CountryRepository countryRepository;
    @Autowired
    private ImportDataFromThirdParty dataFetcher;
    
    @RequestMapping(value = "/api/thirdparty")
    public String fetchTPcontent() throws RestClientException, Exception {
       //check if data with current date is found; if no then fetch data with current date else return with updated status.
    	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(df.parse(df.format(new Date())));
		List<CountryData> listCountry = countryRepository.findByCreatedAtGreaterThan(cal.getTime());
		if(listCountry.size() > 0) {
			return "{ \"found\": \"true\"}";
		} else {
	    	return dataFetcher.getData();
		}
    }
    
    @RequestMapping(value = "/api/countrydata")
    public String getCountryData() throws IOException {
    	BufferedReader br = null;
    	String totaldata = "";
    	File file = new File(
    			getClass().getClassLoader().getResource("totaldata.json").getFile()
    		);
    	try {
			br = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
    	String line = "";
    	while(br!=null && (line = br.readLine())!=null) {
    		totaldata+=line+"\n";
    	}
    	System.out.println(totaldata);
       return totaldata;
    }
    @RequestMapping(value = "/api/statedata")
    public String getStateData() throws IOException {
    	BufferedReader br = null;
    	String statedata = "";
    	File file = new File(
    			getClass().getClassLoader().getResource("statedata.json").getFile()
    		);
    	try {
			br = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
    	String line = "";
    	while(br!=null && (line = br.readLine())!=null) {
    		statedata+=line+"\n";
    	}
       return statedata;
    }
    @RequestMapping(value = "/api/citydata")
    public String getCityData() throws IOException {
    	BufferedReader br = null;
    	String citydata = "";
    	File file = new File(
    			getClass().getClassLoader().getResource("statecitydata.json").getFile()
    		);
    	try {
			br = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
    	String line = "";
    	while(br!=null && (line = br.readLine())!=null) {
    		citydata+=line+"\n";
    	}
       return citydata;
    }
    
    
}