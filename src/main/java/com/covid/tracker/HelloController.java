package com.covid.tracker;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
 
@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "Covid Tracker, the time at the server is now " + new Date() + "\n";
    }
    
    @Autowired
    RestTemplate restTemplate;
    
    @RequestMapping(value = "/api/thirdparty")
    public String getTPcontent() {
       HttpHeaders headers = new HttpHeaders();
       headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
       HttpEntity <String> entity = new HttpEntity<String>(headers);
       
       return restTemplate.exchange("https://api.covid19india.org/v2/state_district_wise.json", 
    		   HttpMethod.GET, entity, String.class).getBody();
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