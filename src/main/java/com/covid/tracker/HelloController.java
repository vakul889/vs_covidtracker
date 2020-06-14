package com.covid.tracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
import java.util.Date;
 
@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "Covid Tracker, the time at the server is now " + new Date() + "\n";
    }
}