package com.phd.admisssion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phd.admisssion.model.CourseRegistration;
import com.phd.admisssion.model.Courses;
import com.phd.admisssion.repository.CourseRegistrationRepo;
import com.phd.admisssion.repository.CourseRepo;

@Service
public class CourseServiceImpl implements CourseService {
	
	
	@Autowired
	private CourseRepo courserepo;
	
	@Autowired
	private CourseRegistrationRepo crgrepo;

	@Override
	public List<Courses> getAllCourses() {
		return courserepo.findAll();
	}

	@Override
	public List<Courses> getCoursebyTitle(String title) {
		return courserepo.findByTitleContaining(title);
	}

	@Override
	public boolean CheckifAlreadyEnrolled(String useremail, String title) {
		return crgrepo.findByUseremailAndTitle(useremail, title)!=null ? true:false;
	}

	@Override
	public CourseRegistration enrollCourse(CourseRegistration crg) {
		if(CheckifAlreadyEnrolled(crg.getUseremail(),crg.getTitle()))
		{
			return null;
		}
		return crgrepo.save(crg);
	}

	@Override
	public List<CourseRegistration> viewenrolled(String email) {
		return crgrepo.findByUseremail(email);
	}

	@Override
	public int deleteenrolled(int regid, String useremail) {
		return crgrepo.deleteByRegidAndUseremail(regid, useremail);
	}

	@Override
	public Courses addCourse(Courses crs) {
		if(CourseAlreadyExits(crs.getTitle(), crs.getInstituteid()))
		{
			return null;
		}
		return courserepo.save(crs);
	}

	private boolean CourseAlreadyExits(String title, int instituteid){
		if(courserepo.findByTitleAndInstituteid(title, instituteid)!=null){
			return true;
		}
		return false;
	}

	@Override
	public Courses courseDetails(int id) {
		if(courserepo.findByCourseid(id)!=null){
			return courserepo.findByCourseid(id);
		}
		return null;
	}

	@Override
	public Courses saveCourse(Courses crs) {
		return courserepo.save(crs);
	}

	@Override
	public int deletebyId(int courseid) {
		return courserepo.deleteByCourseid(courseid);
	}

	@Override
	public void deleteAll() {
		courserepo.deleteAll();
	}

	@Override
	public CourseRegistration courseRegistrationDetails(String useremail, String title) {
		if(crgrepo.findByUseremailAndTitle(useremail, title)!=null){
			return crgrepo.findByUseremailAndTitle(useremail, title);
		}
		return null;
	}

	@Override
	public CourseRegistration courseRegistrationDetails(int regid) {
		if(crgrepo.findByRegid(regid)!=null){
			return crgrepo.findByRegid(regid);
		}
		return null;
	}

	@Override
	public int deletefromCourseReg(String title) {
		return crgrepo.deleteByTitle(title);
	}

	@Override
	public List<CourseRegistration> getCourseRegDetails(String title) {
		return crgrepo.findByTitle(title);
	}

	@Override
	public CourseRegistration saveRegistration(CourseRegistration crgs) {
		return crgrepo.save(crgs);
	}

	@Override
	public List<CourseRegistration> getAllRegisteredCourses() {
		return crgrepo.findAll();
	}

	

	

}
