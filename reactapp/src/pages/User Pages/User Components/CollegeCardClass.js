import React, { Component } from "react";
import InstituteDataService from "../Institute-Service/InstituteService-User";
import Rating from '@mui/material/Rating';
import {TextLink, StyledFormArea, StyledTitle, CoursesContainer, colors} from './../../../components/Styles'

let rating=[]
export default class CollegeCard extends Component{
	constructor(props){
		super(props)
		this.getRating = this.getRating.bind(this)
        this.calculateAvg = this.calculateAvg.bind(this)
	}


    

    render(){
        const {collegedata} = this.props
        //console.log(collegedata)  
        return(
            <>
                <section className="main-card--cointainer">
                    {collegedata.map((currElem) => {
                        const { id, institueName, imgLocation, institutePlace} = currElem;
                        return(
                            <>
                                <div className="card-container w-auto p-1" key={id}>
                                    <div className="card ">
                                        <div className="card-body">
                                            <span className="card-number card-circle subtle">{id}</span>
                                            {<img src={imgLocation} alt="images" className="card-media" />  }
                                            <h1 className="text-center">
                                                <strong>{institueName}</strong>
                                            </h1>
                                            <span className="card-description text-center">
                                            <h2>{institutePlace}</h2>
                      
                                             </span>
                    
                                             <Rating name="half-rating-read" value={4} precision={0.5} readOnly size="large" />
                                             <TextLink to={"/rate/" + id}>Rate Now</TextLink>
                                        </div>  
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </section>
            </>
        )
    }
	
}