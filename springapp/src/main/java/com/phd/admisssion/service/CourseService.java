package com.phd.admisssion.service;

import java.util.List;

import com.phd.admisssion.model.CourseRegistration;
import com.phd.admisssion.model.Courses;

public interface CourseService {
	
	public List<Courses> getAllCourses();

	public List<CourseRegistration> getAllRegisteredCourses();
	
	public List<Courses> getCoursebyTitle(String title);
	
	public boolean CheckifAlreadyEnrolled(String useremail, String title);
	
	public CourseRegistration enrollCourse(CourseRegistration crg);


	public CourseRegistration courseRegistrationDetails(String useremail, String title);

	public CourseRegistration courseRegistrationDetails(int regid);
	
	public List<CourseRegistration> viewenrolled(String email);

	public List<CourseRegistration> getCourseRegDetails(String title);

	public CourseRegistration saveRegistration(CourseRegistration crgs);
	
	public int deleteenrolled(int regid, String useremail);

	public Courses addCourse(Courses crs);

	public Courses courseDetails(int id);

	public Courses saveCourse(Courses crs);

	public int deletebyId(int courseid);

	public int deletefromCourseReg(String title);

	public void deleteAll();


}
