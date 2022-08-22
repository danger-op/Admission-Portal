import React, { Component } from "react";
import InstituteDataService from '../Institute-Service/InstituteService-User'
import CollegeCard from './CollegeCard'
import "./style.css";
import {InstituteInfoContainer} from './../../../components/Styles'

export default class InstituteList extends Component{
    constructor(props){
        super(props)
        this.onChangeSearchInstitute = this.onChangeSearchInstitute.bind(this);
        this.searchInstitute = this.searchInstitute.bind(this);
        this.retrieveInstitutes = this.retrieveInstitutes.bind(this);

        this.state = {
            institutes: [],
            searchval: "",
            errormsg: "",
            institutenotfound: false
        }
    }

    componentDidMount(){
        this.retrieveInstitutes();
    }

    onChangeSearchInstitute(e){
        const searchval = e.target.value
        this.setState({
            searchval: searchval
        })
    }

    retrieveInstitutes(){
        InstituteDataService.getAll()
        .then(response => {
            console.log(response)
            this.setState({
                institutes: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    searchInstitute(){
        InstituteDataService.searchInstitutebyName(this.state.searchval)
        .then(response => {
            console.log(response)
            this.setState({
                institutes: response.data
            })
        })
        .catch(error => {
            console.log(error.response.data.message)
            this.setState({
                errormsg: error.response.data.message,
                institutenotfound: true
            })
        })
    }

    render(){
        const {institutes, searchval} = this.state
        return(
            <InstituteInfoContainer>
                <div className="col-md-8 mx-auto">
                  <div className="input-group mb-3">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Institute Name"
                      value={searchval}
                      onChange={this.onChangeSearchInstitute}
                  />
                  <div className="input-group-append">
                      <button
                          className="btn btn-primary"
                          type="button"
                          onClick={this.searchInstitute}
                      >
                          Search
                      </button>
                  </div>
                  </div>
              </div>
              {this.state.institutenotfound?(
                  <h2>{this.state.errormsg}</h2>
              ):(
                  <CollegeCard collegedata={institutes}>
                  </CollegeCard>
              )}
            </InstituteInfoContainer>
              
        )
    }



}