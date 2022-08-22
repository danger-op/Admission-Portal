import React, { useState, useEffect } from 'react'
import InstituteDataService from '../Institute-Service/InstituteService-User'
import CollegeCard from './CollegeCard'
import "./style.css";

let colleges=[]
const AllColleges = () => {


  useEffect (()=>{
    getAllColleges();
  },[]);

  const getAllColleges = () => {
    InstituteDataService.getAll()
    .then(response => {
      console.log(response.data)
      colleges = response.data
    })
    .catch(error => {
      console.log(error)
    })
  }


  return(
    <>
      <CollegeCard collegedata={colleges}>
      </CollegeCard>
    </>
  )



}

  export default AllColleges;