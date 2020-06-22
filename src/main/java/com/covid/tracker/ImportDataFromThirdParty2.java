package com.covid.tracker;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.apache.commons.httpclient.HttpStatus;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestClientException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

@PropertySource("classpath:application.properties")
public class ImportDataFromThirdParty2 implements Runnable{
    private static final String BASE_URL = "https://api.metamug.com/";
    private static final String API_ENDPOINT = "covid/v1.0/india/count";
    private static final int CONNECTIONTIMEOUT = 50000;
    OkHttpClient client = new OkHttpClient().newBuilder()
    		.followRedirects(false)
    		.followSslRedirects(false)
    		.connectTimeout(50, TimeUnit.SECONDS)
    		.writeTimeout(20, TimeUnit.SECONDS)
    		.readTimeout(60, TimeUnit.SECONDS)
    		.build();
    
    public String getData() throws RestClientException, Exception {
    	System.out.println("getting data");
    	String bodyStr = "";    	
    	Request request = new Request.Builder()
    						.url(BASE_URL + API_ENDPOINT)
    						.method("GET", null)
    						.addHeader("Accept", "*/*")
    						.build();
        try {
        	Response response = client.newCall(request).execute();
        	if (!response.isSuccessful()) { 
                if(HttpStatus.SC_OK == response.code()) {
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
	     } catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	 public static void main(String[] args) throws RestClientException, Exception {
		 ImportDataFromThirdParty2 currObject = new ImportDataFromThirdParty2();
//		 ScheduledExecutorService schedular = Executors.newScheduledThreadPool(1);
//		 schedular.scheduleAtFixedRate(currObject, 0,10, TimeUnit.MINUTES);
		 try {
			 System.out.println(currObject.getData());
	     } catch (IOException e) {
	         e.printStackTrace();
	     }
		 
	 }
}
