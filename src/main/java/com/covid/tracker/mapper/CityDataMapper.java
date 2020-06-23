package com.covid.tracker.mapper;

import java.util.ArrayList;
import java.util.LinkedHashMap;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CityDataMapper {
	
	@JsonProperty("state")
	private String state;
	
	@JsonProperty("statecode")
	private String stateId;
	
	@JsonProperty("districtData")
	private ArrayList<LinkedHashMap<String, Object>> cityArray;

	/**
	 * @return the stateId
	 */
	public String getStateId() {
		return stateId;
	}

	/**
	 * @param stateId the stateId to set
	 */
	public void setStateId(String stateId) {
		this.stateId = stateId;
	}

	/**
	 * @return the cityArray
	 */
	public ArrayList<LinkedHashMap<String, Object>> getCityArray() {
		return cityArray;
	}

	/**
	 * @param cityArray the cityArray to set
	 */
	public void setCityArray(ArrayList<LinkedHashMap<String, Object>> cityArray) {
		this.cityArray = cityArray;
	}
	
	
}
