package com.covid.tracker.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author VakulSaxena
 *
 */
@Entity
@Table(name = "state_data")
public class StateData extends AuditModel{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "countrycode", nullable = false)
	private String countrycode;
	
	@Column(name = "statecode", nullable = false)
	private String statecode;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "confirmed", nullable = false)
	private String confirmed;
	
	@Column(name = "active", nullable = false)
	private String active;
	
	@Column(name = "recovered", nullable = false)
	private String recovered;
	
	@Column(name = "deaths", nullable = false)
	private String deaths;
	
	@Column(name = "cChanges", nullable = false)
	private String cChanges;
	
	@Column(name = "aChanges", nullable = false)
	private String aChanges;
	
	@Column(name = "rChanges", nullable = false)
	private String rChanges;
	
	@Column(name = "dChanges", nullable = false)
	private String dChanges;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the countrycode
	 */
	public String getCountrycode() {
		return countrycode;
	}

	/**
	 * @param countrycode the countrycode to set
	 */
	public void setCountrycode(String countrycode) {
		this.countrycode = countrycode;
	}

	/**
	 * @return the statecode
	 */
	public String getStatecode() {
		return statecode;
	}

	/**
	 * @param statecode the statecode to set
	 */
	public void setStatecode(String statecode) {
		this.statecode = statecode;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
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
