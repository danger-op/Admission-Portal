package com.phd.admisssion.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phd.admisssion.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{

	User findByEmail(String email);
	
	User findByEmailAndPwd(String email, String pwd);
	
	
	
	

}
