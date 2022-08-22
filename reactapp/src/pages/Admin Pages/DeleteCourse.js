import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import base_url from '../../coursesapi';
import { toast } from 'react-toastify';

function DeleteCourse(props){
    const[courses,setCourses]=useState({});


    const getCourseInfo=()=>{
        axios.get(`${base_url}/courses/getbyId?id=${props.match.params.id}`)
        .then(response => {
          console.log(response.data)
          setCourses(response.data)
          //console.log(courses.title)
        })
        .catch(error => {
          console.log(error)
        })
      }

      useEffect(()=>{
        getCourseInfo();
      },{})

      const DeleteCourseFromServer=(id) => {
          axios.delete(`${base_url}/courses/delete/${id}`)
          .then(response => {
              console.log(response.data)
              toast.success("Course deleted")
          })
          .catch(error => {
              console.log(error)
          })
      }

      return(
        <Fragment>
            <Container className='text-center'>
            <br></br>
            <h3 className='text-danger'>Do you wish to delete this course?</h3>
            <br></br>
            <table className = "table table-striped table-light table-bordered table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Course Title</th>
                        <th>Institute Name</th>
                        <th>Academic Year</th>
                        <th>Eligibility Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key = {courses.courseid}>
                        <td className="align-middle text-center"> {courses.title} </td>
                        <td className="align-middle text-center"> {courses.institute_name} </td>
                        <td className="align-middle text-center"> {courses.academicYear} </td>
                        <td className="align-middle text-center"> {courses.elgibleMarks} </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="btn btn-danger" onClick={()=>DeleteCourseFromServer(courses.courseid)}>
                Delete
            </button>
            {"  "}
            <Link className='btn btn-success' to={'/admincourse/view-course'}>  Cancel</Link>
            </Container>
        </Fragment>
      )



}

export default DeleteCourse;