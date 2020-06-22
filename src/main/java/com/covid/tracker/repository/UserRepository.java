/**
 * 
 */
package com.covid.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covid.tracker.model.User;

/**
 * @author VakulSaxena
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
}
