import React, { useState, useEffect } from 'react'
import CollegeCard from "./CollegeCard";
import "./style.css";
import base_url from './../../../coursesapi'
import axios from 'axios';
import { InstituteInfoContainer } from '../../../components/Styles';

let colleges=[]
const CollegesList = () => {



  useEffect (()=>{
    getAllColleges();
  },[]);

  const getAllColleges = () => {
    axios.get(`${base_url}/institutes/getAll`)
    .then(response => {
      console.log(response.data)
      colleges = response.data
    })
    .catch(error => {
      console.log(error)
    })
  }

  


  return(
    <InstituteInfoContainer>

      
      <CollegeCard collegedata={colleges}>
      </CollegeCard>
    </InstituteInfoContainer>

  )



}

  export default CollegesList;