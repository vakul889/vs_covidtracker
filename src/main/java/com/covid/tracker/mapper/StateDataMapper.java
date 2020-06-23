package com.covid.tracker.mapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"districtData","cchanges","dchanges","rchanges","achanges"})
public class StateDataMapper {
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("state")
	private String state;
	
	@JsonProperty("confirmed")
	private String confirmed;
	
	@JsonProperty("active")
	private String active;
	
	@JsonProperty("recovered")
	private String recovered;
	
	@JsonProperty("deaths")
	private String deaths;
	
	@JsonProperty("cChanges")
	private String cChanges;
	
	@JsonProperty("aChanges")
	private String aChanges;
	
	@JsonProperty("rChanges")
	private String rChanges;
	
	@JsonProperty("dChanges")
	private String dChanges;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the confirmed
	 */
	public String getConfirmed() {
		return confirmed;
	}

	/**
	 * @param confirmed the confirmed to set
	 */
	public void setConfirmed(String confirmed) {
		this.confirmed = confirmed;
	}

	/**
	 * @return the active
	 */
	public String getActive() {
		return active;
	}

	/**
	 * @param active the active to set
	 */
	public void setActive(String active) {
		this.active = active;
	}

	/**
	 * @return the recovered
	 */
	public String getRecovered() {
		return recovered;
	}

	/**
	 * @param recovered the recovered to set
	 */
	public void setRecovered(String recovered) {
		this.recovered = recovered;
	}

	/**
	 * @return the deaths
	 */
	public String getDeaths() {
		return deaths;
	}

	/**
	 * @param deaths the deaths to set
	 */
	public void setDeaths(String deaths) {
		this.deaths = deaths;
	}

	/**
	 * @return the cChanges
	 */
	public String getcChanges() {
		return cChanges;
	}

	/**
	 * @param cChanges the cChanges to set
	 */
	public void setcChanges(String cChanges) {
		this.cChanges = cChanges;
	}

	/**
	 * @return the aChanges
	 */
	public String getaChanges() {
		return aChanges;
	}

	/**
	 * @param aChanges the aChanges to set
	 */
	public void setaChanges(String aChanges) {
		this.aChanges = aChanges;
	}

	/**
	 * @return the rChanges
	 */
	public String getrChanges() {
		return rChanges;
	}

	/**
	 * @param rChanges the rChanges to set
	 */
	public void setrChanges(String rChanges) {
		this.rChanges = rChanges;
	}

	/**
	 * @return the dChanges
	 */
	public String getdChanges() {
		return dChanges;
	}

	/**
	 * @param dChanges the dChanges to set
	 */
	public void setdChanges(String dChanges) {
		this.dChanges = dChanges;
	}
}
