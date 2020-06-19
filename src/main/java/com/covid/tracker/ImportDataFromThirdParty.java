package com.covid.tracker;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpStatus;

import okhttp3.*;



public class ImportDataFromThirdParty implements Runnable{
    private static final String BASE_URL = "https://api.covidindiatracker.com";
    private static final String API_ENDPOINT = "/state_data.json";
    OkHttpClient client = new OkHttpClient().newBuilder()
    		.connectTimeout(20, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .build();
    
    public String getData() throws IOException {
    	System.out.println("getting data");
    	String bodyStr = "";
    	Request request = new Request.Builder()
    						.url(BASE_URL + API_ENDPOINT)
    						.method("GET", null)
    						.build();
        try (Response response = client.newCall(request).execute()) {
        	if (!response.isSuccessful()) { 
                int statusCode = response.code();
                if(HttpStatus.OK.value() == statusCode) {
	                ResponseBody body = response.body();
	                bodyStr = body.string();
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return bodyStr;
    }
    
	 @Override
	 public void run() {
	     try {
	         System.out.println(this.getData());
	     } catch (IOException e) {
	         e.printStackTrace();
	     }
	 }
	
	 public static void main(String[] args) {
		 ImportDataFromThirdParty currObject = new ImportDataFromThirdParty();
	    ScheduledExecutorService schedular = Executors.newScheduledThreadPool(1);
	    schedular.scheduleAtFixedRate(currObject, 0,10, TimeUnit.MINUTES);
	 }
}
