package com.phd.admisssion.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phd.admisssion.exceptions.InvalidLogin;
import com.phd.admisssion.exceptions.InvalidUserException;
import com.phd.admisssion.exceptions.UserAlreadyExistsException;
import com.phd.admisssion.model.User;
import com.phd.admisssion.service.UserService;

import io.swagger.annotations.ApiOperation;

import java.util.List;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserContoller {

	Logger logger = LoggerFactory.getLogger(UserContoller.class);

	@Autowired
	private UserService userservice;
	
	@PostMapping("/add")
	@ApiOperation("Add users to the Portal")
	public ResponseEntity<User> add(@RequestBody User user) throws UserAlreadyExistsException{
		User uresp = userservice.saveUser(user);
		logger.info(uresp.toString());
		return new ResponseEntity<User>(uresp,HttpStatus.OK);

	}

	@PostMapping("/login")
	@ApiOperation("Login users the Portal")
	public ResponseEntity<User> login(@RequestBody User user) throws InvalidUserException{
		User uresp = userservice.loginUser(user);
		logger.info("Logged in with: "+uresp.getEmail());
		return new ResponseEntity<User>(uresp,HttpStatus.OK);

	}
	
	
	
	@GetMapping("/getAll")
	@ApiOperation("Fetch all the records of users")
	public ResponseEntity<List<User>> list(){
        return new ResponseEntity<List<User>>(userservice.getAllUsers(),HttpStatus.OK);
    }
	@PostMapping("/forgotpassword")
	@ApiOperation("Forgot Password")
	public ResponseEntity<User> Forgotpassword(@RequestBody User user) throws InvalidLogin, MessagingException{
		User uresp = userservice.ForgotPassword(user);
		userservice.SendOTPMail(uresp);
		logger.info("OTP Sent to "+uresp.getEmail());
		return new ResponseEntity<User>(uresp,HttpStatus.OK);
	}

	@PostMapping("/validateOTP")
	@ApiOperation("Validate OTP")
	public ResponseEntity<String> validateAdminOTP(@RequestBody User user, @RequestParam (required = true) int otp){
		userservice.ValidateOTP(otp, user);
		logger.info("Logged in as "+user.getName());
		return new ResponseEntity<String>("Login Successful",HttpStatus.OK);
	}


}
