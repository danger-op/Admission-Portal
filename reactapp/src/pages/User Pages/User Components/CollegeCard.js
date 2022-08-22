import React, { useState, useReducer, useEffect } from "react";
import InstituteDataService from "../Institute-Service/InstituteService-User";
import Rating from '@mui/material/Rating';
import {TextLink, StyledFormArea, StyledTitle, CoursesContainer, colors} from './../../../components/Styles'
import { Link } from "react-router-dom";

const CollegeCard = ({ collegedata }) => {

  
  return (
    <>
      <section className="main-card--cointainer">
        {collegedata.map((curElem, index) => {
          const { institutesId, institueName, imgLocation, institutePlace, rating} = curElem;

          return (
            <>
              <div className="card-container w-auto p-1">
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{index+1}</span>
                    {<img src={imgLocation} alt="images" className="card-media" />  }
                    <TextLink color={colors.dark1} to={"/info/"+institutesId}>
                    <h1 className="text-center">
                      <strong>{institueName}</strong>
                    </h1>
                    </TextLink>
                    <span className="card-description text-center">
                      <h2>{institutePlace}</h2>
                    </span>
                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly size="large" />
                    <TextLink to={"/rate/" + institutesId}>Rate Now</TextLink>
                    {/* <br></br>
                    <TextLink to="/usercourse">Courses</TextLink> */}
                  </div>                 
                  
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default CollegeCard;