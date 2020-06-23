/**
 * 
 */
package com.covid.tracker.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covid.tracker.model.CityData;

/**
 * @author VakulSaxena
 *
 */
@Repository
public interface CityRepository extends JpaRepository<CityData, Long>{
	
	public List<CityData> findByCreatedAtGreaterThan(Date createdAt);
	
}
