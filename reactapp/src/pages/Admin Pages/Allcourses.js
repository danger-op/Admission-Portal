import React, { useState, useEffect } from 'react'
import Hello from './hello';

import base_url from './../../coursesapi'
import axios from 'axios';
import { toast } from 'react-toastify';
const Allcourses=()=> {
  const getAllCoursesFromServer=()=>{
    axios.get(`${base_url}/courses/getAll`).then(
      (response)=>{
        console.log(response.data);
        toast.success("courses has been loaded");
        setCourses(response.data);
      },
      (error)=>{
        console.log(error);
        toast.error("Something went wrong");
      }
    )
  }

  useEffect (()=>{
    getAllCoursesFromServer();
  },[]);

     const[courses,setCourses]=useState([]);
        const removeCourseById=(courseid)=>{
          setCourses(courses.filter((c)=>c.courseid!=courseid));
        }
     
  return (
    <div>
      <h1>All courses</h1>
      <p> List of courses</p>
      {
          courses.length>0
          ? courses.map((item)=><Hello key={item.id}hello={item}update={removeCourseById}/>)
          : "No courses"}
    </div>
  );
};
export default Allcourses
