import React from 'react';
import Navbar from './User Components/Navbar'
import {EnrolledContainer} from './../../components/Styles'
import EnrolledCoursesList from './User Components/CourseEnrolledList';

const CourseEnrolled = () => {
return (
	<div>
	<Navbar />
	<EnrolledContainer>
	<EnrolledCoursesList />
	</EnrolledContainer>
	</div>
);
};



export default CourseEnrolled;
