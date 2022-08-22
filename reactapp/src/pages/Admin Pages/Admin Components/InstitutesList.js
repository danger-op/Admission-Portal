import React, { Component } from "react";
import CollegeCard from "./CollegeCard";
import "./style.css";
import base_url from './../../../coursesapi'
import axios from 'axios';

export default class InstituteList extends Component{
    constructor(props){
        super(props)
        this.retrieveInstitutes = this.retrieveInstitutes.bind(this);
        this.state = {
            institutes: []
        }

    }

    componentDidMount(){
        this.retrieveInstitutes();
    }

    retrieveInstitutes(){
        axios.get(`${base_url}/institutes/getAll`)
        .then(response => {
            console.log(response.data)
            this.setState({
                institutes: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const {institutes} = this.state
        return(
            <>
                <CollegeCard collegedata={institutes}>
                </CollegeCard>
            </>
        )
    }
}