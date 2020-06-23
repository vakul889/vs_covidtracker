package com.covid.tracker.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.covid.tracker.model.CityData;
import com.covid.tracker.model.CountryData;
import com.covid.tracker.model.StateData;
import com.covid.tracker.repository.CityRepository;
import com.covid.tracker.repository.CountryRepository;
import com.covid.tracker.repository.StateRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * @author VakulSaxena
 *
 */
@RestController
public class DataController {
	
	@Autowired
	private CountryRepository countryRepository;
    @Autowired
	private StateRepository stateRepository;
    @Autowired
	private CityRepository cityRepository;
	
	//get country data from db
	@GetMapping("/api/country_data")
	public ResponseEntity<String> getCountryData() throws ParseException{
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		String response = "";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(df.parse(df.format(new Date())));
		List<CountryData> listCountry = countryRepository.findByCreatedAtGreaterThan(cal.getTime());
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			response = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listCountry);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>(response,headers,HttpStatus.OK); 
	       
	}
	//get state data from db
	@GetMapping("/api/state_data")
	public ResponseEntity<String> getStateData() throws ParseException{
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		String response = "";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(df.parse(df.format(new Date())));
		List<StateData> listState = stateRepository.findByCreatedAtGreaterThan(cal.getTime());
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			response = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listState);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>(response,headers,HttpStatus.OK); 
	       
	}
	//get country data from db
	@GetMapping("/api/city_data")
	public ResponseEntity<String> getCityData() throws ParseException{
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		String response = "";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(df.parse(df.format(new Date())));
		List<CityData> listCity = cityRepository.findByCreatedAtGreaterThan(cal.getTime());
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			response = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listCity);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>(response,headers,HttpStatus.OK); 
	       
	}
}
