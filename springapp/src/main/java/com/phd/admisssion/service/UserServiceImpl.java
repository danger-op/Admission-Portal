package com.phd.admisssion.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.mail.MessagingException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.phd.admisssion.exceptions.InvalidLogin;
import com.phd.admisssion.exceptions.InvalidUserException;
import com.phd.admisssion.exceptions.UserAlreadyExistsException;
import com.phd.admisssion.model.User;
import com.phd.admisssion.repository.UserRepo;

import java.util.Base64;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepo userRepo;
	@Autowired
	private JavaMailSender mailSender;
	static Map<String, Integer> b = new HashMap<String, Integer>();
	
	
	
	@Override
	public User saveUser(User user) throws UserAlreadyExistsException{
		if(checkIfUserExist(user.getEmail()))
		{
			throw new UserAlreadyExistsException(user.getEmail());
		}
		Base64.Encoder encoder = Base64.getEncoder();  
		user.setPwd(encoder.encodeToString(user.getPwd().getBytes()));
		user.setConfirmpwd(encoder.encodeToString(user.getConfirmpwd().getBytes()));
		userRepo.save(user);
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}
	
	@Override
    public boolean checkIfUserExist(String email) {
        return userRepo.findByEmail(email) !=null ? true : false;
    }

	@Override
	public User loginUser(User user) throws InvalidUserException {
		if(isValidUser(user.getEmail(),user.getPwd())){
			String email = user.getEmail();
			Base64.Encoder encoder = Base64.getEncoder();
			String pwd = encoder.encodeToString(user.getPwd().getBytes());
			return userRepo.findByEmailAndPwd(email,pwd);
		}
		throw new InvalidUserException();
	}

	private boolean isValidUser(String email, String password){
		Base64.Encoder encoder = Base64.getEncoder();
		String pwd = encoder.encodeToString(password.getBytes());
		return userRepo.findByEmailAndPwd(email, pwd) != null ? true:false;
	}

	@Override
	public void SendOTPMail(User user) throws MessagingException {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setFrom("rambosadmissionportal@gmail.com");
		mimeMessageHelper.setTo(user.getEmail());

		int otp = OTPGenerator(user.getEmail());
		b.put(user.getEmail(), otp);
		System.out.println(b.get(user.getEmail()));
		System.out.println(user.getName());

		String body = "Hi "+"<b>"+user.getName() +"</b>"+","+"<br><br>"+"Please find your Password for Login as "+"<b>"+otp+"</b>"+"."+"<br><br>"+"Regards,"+"<br>"+"<b>"+"Gladiators Admission Center"+"</b>"+".";	

		mimeMessageHelper.setText(body,true);


        String subject = "OTP for Login";
        mimeMessageHelper.setSubject(subject);

		mailSender.send(mimeMessage);

		System.out.println("OTP Sent...");


		
	}

	private int OTPGenerator(String email) {
		b.remove(email);
		Random rnd = new Random();
		int otp = rnd.nextInt(9999);
		return otp;
	}

	@Override
	public void ValidateOTP(int otp, User user) {
		if(otp==b.get(user.getEmail())){
			b.remove(user.getEmail());
			return;
		}
	}

	@Override
	public User ForgotPassword(User user) throws InvalidLogin {
		if(isValid(user.getEmail())){
			return userRepo.findByEmail(user.getEmail());
		}
		throw new InvalidLogin();
	}

	private boolean isValid(String email) {
		return (userRepo.findByEmail(email)!=null) && (userRepo.findByEmail(email).getUser_type().equals("2")) ? true:false;
	}


}


	

	

	

	
