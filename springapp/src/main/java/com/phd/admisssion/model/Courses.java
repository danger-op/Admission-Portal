package com.phd.admisssion.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Courses {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int courseid;
	private String title;
	private String course_desc;
	private int instituteid;
	private String institute_name;
	private String academicYear;
	private String courseDuration;
	private int elgibleMarks;

	public Courses(int courseid, String title, String course_desc, int instituteid, String institute_name,
			String academicYear, String courseDuration, int elgibleMarks) {
		this.courseid = courseid;
		this.title = title;
		this.course_desc = course_desc;
		this.instituteid = instituteid;
		this.institute_name = institute_name;
		this.academicYear = academicYear;
		this.courseDuration = courseDuration;
		this.elgibleMarks = elgibleMarks;
	}


	public Courses() {
	}



	public int getCourseid() {
		return courseid;
	}

	public void setCourseid(int courseid) {
		this.courseid = courseid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCourse_desc() {
		return course_desc;
	}

	public void setCourse_desc(String course_desc) {
		this.course_desc = course_desc;
	}

	public int getInstituteid() {
		return instituteid;
	}

	public void setInstituteid(int instituteid) {
		this.instituteid = instituteid;
	}

	public String getInstitute_name() {
		return institute_name;
	}

	public void setInstitute_name(String institute_name) {
		this.institute_name = institute_name;
	}

	public String getAcademicYear() {
		return academicYear;
	}

	public void setAcademicYear(String academicYear) {
		this.academicYear = academicYear;
	}

	public String getCourseDuration() {
		return courseDuration;
	}

	public void setCourseDuration(String courseDuration) {
		this.courseDuration = courseDuration;
	}

	public int getElgibleMarks() {
		return elgibleMarks;
	}

	public void setElgibleMarks(int elgibleMarks) {
		this.elgibleMarks = elgibleMarks;
	}

	

	


	

	
	
	
	

}
