package com.covid.tracker;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.Collections;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.SSLContext;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HostConfiguration;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@PropertySource("classpath:application.properties")
public class ImportDataFromThirdParty implements Runnable{
    private static final String BASE_URL = "https://api.covidindiatracker.com/";
    private static final String API_ENDPOINT = "state_data.json";
    private static final int CONNECTIONTIMEOUT = 50000;
    
    @Value("${trust.store}")
    private Resource trustStore;

    @Value("${trust.store.password}")
    private String trustStorePassword;
   
//    HttpClient httpClient = new OkHttpClient();
//    		newBuilder()
//    		.connectTimeout(50, TimeUnit.SECONDS)
//            .readTimeout(60, TimeUnit.SECONDS)
//            .build();
    public RestTemplate restTemplate() throws Exception {
        SSLContext sslContext = new SSLContextBuilder()
        		.loadTrustMaterial(trustStore.getURL(), trustStorePassword.toCharArray())
        		.build();
        SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext);
        CloseableHttpClient httpClient = HttpClients.custom()
            .setSSLSocketFactory(socketFactory)
            .build();
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
        return new RestTemplate(factory);
    }
    
    public String getData() throws RestClientException, Exception {
//    	KeyStore keystore = KeyStore.getInstance("PKCS12");
//    	FileInputStream instream = new FileInputStream(new File("tracker-project.p12"));
//    	try {
//            keystore.load(instream, "password".toCharArray());
//        } catch (NoSuchAlgorithmException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (CertificateException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//            instream.close();
//        }
    	String jsonString = "";
    	ResponseEntity<String> response = restTemplate().getForEntity(BASE_URL+API_ENDPOINT, String.class, Collections.emptyMap());
    	if(org.springframework.http.HttpStatus.OK == response.getStatusCode()) {
    		jsonString = response.getBody();
    	}
    	
    	System.out.println(jsonString);
        
//    	HttpMethodBase method = new GetMethod();
//		try {
//			HttpClient client = new HttpClient();
//			client.getHttpConnectionManager().getParams().setConnectionTimeout(CONNECTIONTIMEOUT);
//			URL url = new URL(BASE_URL+API_ENDPOINT);
//			HostConfiguration hostConfig = new HostConfiguration();
//			hostConfig.setHost(url.getHost(), url.getPort(), url.getProtocol());
//
//			method = new GetMethod(BASE_URL+API_ENDPOINT);
//			method.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler(3, true));
//			method.addRequestHeader("Accept", "*/*");
//			int statusCode = client.executeMethod(hostConfig, method);
//
//			if (statusCode != HttpStatus.SC_OK) {
//				throw new Exception("Error sending api request");
//			} else {
//				byte[] responseBody = method.getResponseBody();
//				if (responseBody != null) {
//					jsonString = new String(responseBody, "UTF-8");
//				}
//				return jsonString;
//			}
//		}catch (HttpException e) {
//			e.printStackTrace();
//		} catch (MalformedURLException e) {
//			e.printStackTrace();
//		} catch (SocketTimeoutException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			method.releaseConnection();
//		}
		return "";
////    	httpClient.setConnectTimeout(50, TimeUnit.SECONDS);
////    	httpClient.setReadTimeout(60, TimeUnit.SECONDS);
//    	System.out.println("getting data");
//    	
//    	String bodyStr = "";    	
//    	Request request = new Request.Builder()
//    						.url(BASE_URL + API_ENDPOINT)
//    						.method("GET", null)
//    						.addHeader("Accept", "*/*")
//    						.build();
//        try {
//        	Response response = httpClient.newCall(request).execute();
//        	if (!response.isSuccessful()) { 
//                int statusCode = response.code();
//                if(HttpStatus.OK.value() == statusCode) {
//	                ResponseBody body = response.body();
//	                bodyStr = body.string();
//                }
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return bodyStr;
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
		 ImportDataFromThirdParty currObject = new ImportDataFromThirdParty();
//		 ScheduledExecutorService schedular = Executors.newScheduledThreadPool(1);
//		 schedular.scheduleAtFixedRate(currObject, 0,10, TimeUnit.MINUTES);
		 try {
			 System.out.println(currObject.getData());
	     } catch (IOException e) {
	         e.printStackTrace();
	     }
		 
	 }
}
