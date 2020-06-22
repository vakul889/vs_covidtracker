package com.covid.tracker.controller;

import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.covid.tracker.model.User;
import com.covid.tracker.repository.UserRepository;
/**
 * @author VakulSaxena
 *
 */
@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	//Add a new user
	@PostMapping("/api/user")
	public ResponseEntity<String> create(@RequestBody User user){
		String response = "";
		HttpHeaders headers = new HttpHeaders(); 
		headers.clear(); headers.add("content-type", "application/json");
		ExampleMatcher userMatcher = ExampleMatcher.matching()
				.withMatcher("email", GenericPropertyMatcher.of(StringMatcher.DEFAULT));
		Example<User> example = Example.of(user, userMatcher);
		List<User> validated = userRepository.findAll(example);
		if(validated.size() > 0) {
			response = "{ \"result\": \"USER ALREADY EXISTS\" }";
			return new ResponseEntity<String>(response, HttpStatus.OK); 
		} else {
			userRepository.save(user);
			response = "{ \"result\": \"USER ADDED\" }";
			return new ResponseEntity<String>(response, HttpStatus.OK);
		}
	}
	
	//validate user details
	@PostMapping("/api/validate")
	public ResponseEntity<String> validate(@RequestBody User user){
		String response = "";
		HttpHeaders headers = new HttpHeaders(); 
		headers.clear(); headers.add("content-type", "application/json");
		ExampleMatcher userMatcher = ExampleMatcher.matching()
				.withMatcher("email", GenericPropertyMatcher.of(StringMatcher.DEFAULT))
				.withMatcher("password", GenericPropertyMatcher.of(StringMatcher.DEFAULT));
		Example<User> example = Example.of(user, userMatcher);
		List<User> validated = userRepository.findAll(example);
		if(validated.size() == 1) {
			String combine = validated.get(0).getEmail()+"|"+validated.get(0).getFirstname();
			Encoder encoder = Base64.getEncoder();
			String encodedString = encoder.encodeToString(combine.getBytes());
			response = "{ \"result\": \"SUCCESS\",\"auth\": \""+encodedString+"\" }";
			return new ResponseEntity<String>(response, headers, HttpStatus.OK);
		} else if(validated.size() == 0) {
			response = "{ \"result\": \"USER NOT FOUND\" }";
			return new ResponseEntity<String>(response, HttpStatus.OK);
		} else {
			response = "{ \"result\": \"UNKNOWN ERROR OCCURED\" }";
			return new ResponseEntity<String>(response, HttpStatus.OK);
		}
	}
}
