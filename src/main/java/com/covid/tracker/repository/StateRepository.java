/**
 * 
 */
package com.covid.tracker.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covid.tracker.model.StateData;

/**
 * @author VakulSaxena
 *
 */
@Repository
public interface StateRepository extends JpaRepository<StateData, Long>{
	
	public List<StateData> findByCreatedAtGreaterThan(Date createdAt);
	
}
