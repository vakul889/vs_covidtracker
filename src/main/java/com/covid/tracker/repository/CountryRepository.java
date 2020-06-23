/**
 * 
 */
package com.covid.tracker.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covid.tracker.model.CountryData;

/**
 * @author VakulSaxena
 *
 */
@Repository
public interface CountryRepository extends JpaRepository<CountryData, Long>{
	
	public List<CountryData> findByCreatedAtGreaterThan(Date createdAt);
	
}
