package com.phd.admisssion.service;

import java.util.List;

import javax.mail.MessagingException;

import com.phd.admisssion.exceptions.InvalidLogin;
import com.phd.admisssion.exceptions.InvalidUserException;
import com.phd.admisssion.exceptions.UserAlreadyExistsException;
import com.phd.admisssion.model.User;

public interface UserService {
	
	public User saveUser(User user) throws UserAlreadyExistsException;
	
    public List<User> getAllUsers();
    
    public boolean checkIfUserExist(String email);

    public User loginUser(User user) throws InvalidUserException;

    public void SendOTPMail(User user) throws MessagingException;

    public void ValidateOTP(int otp, User user);

    public User ForgotPassword(User user) throws InvalidLogin;

    
    
   

}
