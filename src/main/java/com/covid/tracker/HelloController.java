package com.covid.tracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Date;
 
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
}