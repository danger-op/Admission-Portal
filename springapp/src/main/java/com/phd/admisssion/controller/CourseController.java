package com.phd.admisssion.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.phd.admisssion.model.CourseRegistration;
import com.phd.admisssion.model.Courses;
import com.phd.admisssion.service.CourseService;
import com.phd.admisssion.service.FileStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/courses")
@CrossOrigin
public class CourseController {
	
	@Autowired
	private CourseService courseservice;

	@Autowired
	private FileStorageService fileStorageService;
	
	@GetMapping("/getAll")
	@ApiOperation("Fetch all the records of courses")
	public ResponseEntity<List<Courses>> getAll(){
		return new ResponseEntity<List<Courses>>(courseservice.getAllCourses(),HttpStatus.OK);
	}
	
	@GetMapping("/getbyTitle")
	@ApiOperation("Fetch the course by title")
	public ResponseEntity<List<Courses>> getbyTitle(@RequestParam(required = true) String title){
		
		List<Courses> courses = new ArrayList<Courses>();
		courseservice.getCoursebyTitle(title).forEach(courses::add);
		if(courses.isEmpty())
		{
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(courses, HttpStatus.OK);
		
	}

	@GetMapping("/getbyId")
	@ApiOperation("Fetch the course by Course id")
	public ResponseEntity<Courses> getbyId(@RequestParam(required = true) int id){
		if(courseservice.courseDetails(id)!=null){
			return  new ResponseEntity<Courses>(courseservice.courseDetails(id), HttpStatus.OK);
		}
		return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/add")
	@ApiOperation("Adding a Course")
	public ResponseEntity<String> add(@RequestBody Courses crs){
		if(courseservice.addCourse(crs)!=null){
			return  new ResponseEntity<String>("Course added successfully", HttpStatus.OK);
		}
		return  new ResponseEntity<>("Course was already added", HttpStatus.ALREADY_REPORTED);
	}

	@PutMapping("/edit/{id}")
	@ApiOperation("Editing a Course")
	public ResponseEntity<Courses> editCourse(@PathVariable("id") int id, @RequestBody Courses crs){
		if(courseservice.courseDetails(id)!=null){
			Courses crsdt = courseservice.courseDetails(id);
			crsdt.setCourse_desc(crs.getCourse_desc());
			crsdt.setInstituteid(crs.getInstituteid());
			crsdt.setInstitute_name(crs.getInstitute_name());
			crsdt.setAcademicYear(crs.getAcademicYear());
			crsdt.setCourseDuration(crs.getCourseDuration());
			crsdt.setElgibleMarks(crs.getElgibleMarks());
			Courses editted = courseservice.saveCourse(crsdt);

			List<CourseRegistration> coursereg = courseservice.getCourseRegDetails(crsdt.getTitle());
			for(CourseRegistration crgs:coursereg){
				crgs.setAcademicYear(crsdt.getAcademicYear());
				crgs.setCoursedesc(crsdt.getCourse_desc());
				crgs.setInstituteName(crsdt.getInstitute_name());
				crgs.setEligibleMarks(crsdt.getElgibleMarks());
				courseservice.saveRegistration(crgs);
			}

			return new ResponseEntity<Courses>(editted,HttpStatus.OK);
		}
		return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/delete/{id}")
	@Transactional
	@ApiOperation("Delete a course")
	public ResponseEntity<String> deleteCourse(@PathVariable("id") int id){
		if(courseservice.courseDetails(id)!=null){
				Courses crd = courseservice.courseDetails(id);
				courseservice.deletefromCourseReg(crd.getTitle());
				courseservice.deletebyId(id);
				return  new ResponseEntity<String>("Course Deleted Successfully", HttpStatus.OK);
		}
		return  new ResponseEntity<>("Course not able to delete", HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/deleteAll")
	@Transactional
	@ApiOperation("Delete all courses")
	public ResponseEntity<HttpStatus> deleteAllCourse(){
		courseservice.deleteAll();
		return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	
	@PostMapping("/enroll")
	@ApiOperation("Enroll into a new course")
	public ResponseEntity<CourseRegistration> enroll(@RequestBody CourseRegistration crg) {
		if(courseservice.enrollCourse(crg)!=null)
		{
			courseservice.enrollCourse(crg);
			if(courseservice.courseRegistrationDetails(crg.getUseremail(), crg.getTitle())!=null){
				CourseRegistration crgs = courseservice.courseRegistrationDetails(crg.getUseremail(), crg.getTitle());
				return new ResponseEntity<CourseRegistration>(crgs,HttpStatus.OK);
			}
			return new ResponseEntity<CourseRegistration>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<CourseRegistration>(HttpStatus.IM_USED);
	}
	
	@GetMapping("/viewenrolled")
	@ApiOperation("View enrolled courses")
	public ResponseEntity<List<CourseRegistration>> viewenrolled(@RequestParam(required = true)String useremail){
		
		List<CourseRegistration> enrolled = new ArrayList<CourseRegistration>();
		enrolled = courseservice.viewenrolled(useremail);
		if(enrolled.isEmpty())
		{
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(enrolled,HttpStatus.OK);
	}

	@GetMapping("/enrolledbyid")
	@ApiOperation("View enrolled course by Registarion id")
	public ResponseEntity<CourseRegistration> viewenrolledbyId(@RequestParam(required = true)int regid){
		
		CourseRegistration enrolledcourse = courseservice.courseRegistrationDetails(regid);
		if(enrolledcourse!=null){
			return new ResponseEntity<>(enrolledcourse,HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/deleteenrolled")
	@Transactional
	@ApiOperation("Delete enrolled courses")
	public ResponseEntity<String> deleteCourse(@RequestParam(required = true) int regid, @RequestParam(required = true) String useremail){
		if(courseservice.deleteenrolled(regid,useremail)>0)
		{
			return new ResponseEntity<>("Course Unenrolled Successfully", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/getAllregistered")
	@ApiOperation("View Registred Courses List")
	public ResponseEntity<List<CourseRegistration>> getregisteredlist(){
		if(courseservice.getAllRegisteredCourses().size()>0){
			return new ResponseEntity<>(courseservice.getAllRegisteredCourses(),HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/uploadMarks")
	@ApiOperation("Upload Marksheet")
	public ResponseEntity<String> uploadMarks(@RequestParam("file") MultipartFile file) throws IOException{
		String fileName = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/courses/")
				.path(fileName)
				.toUriString();
		System.out.println("fileDownloadUri: "+fileDownloadUri);
		return new ResponseEntity<String>(fileDownloadUri,HttpStatus.OK);
	}

	@GetMapping("/{fileName:.+}")
	@ApiOperation("Get Marksheet")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,HttpServletRequest request) throws IOException{
		Resource resource = fileStorageService.loadFileAsResource(fileName);
		String contentType = null;
		contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		if(contentType==null) {
			contentType = "application/octet-stream";
		}
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.body(resource);
	}
	
	

}
