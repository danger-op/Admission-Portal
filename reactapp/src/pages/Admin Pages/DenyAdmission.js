import React, { Component } from "react";
import CourseDataService from './CourseServiceAdmin/CourseService-Admin'
import AdmissionDataService from './AdmissionService/AdmissionService-Admin'
import {name} from './../Login'
import Loader from 'react-loader-spinner'
import {TextLink, StyledFormArea, StyledTitle, AdmissionContainer, colors} from './../../components/Styles'

export default class DenyAdmission extends Component{
    constructor(props){
        super(props);
        this.getRegistrationDts = this.getRegistrationDts.bind(this)
        this.denyAdmission = this.denyAdmission.bind(this);
        this.state = {
            registeredCourse: {
                regid: null,
                useremail: "",
                username: "",
                coursedesc: "",
                title: "",
                instituteName: "",
                academicYear: "",
                hscmarks: null,
                eligibleMarks: null
            },
            denied: false,
            issubmitted: false
        }
    }

    componentDidMount() {
        this.getRegistrationDts(this.props.match.params.id);
    }

    getRegistrationDts(id){
        CourseDataService.getRegistrationDetails(id)
        .then(response => {
            console.log(response.data)
            this.setState({
                registeredCourse: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    denyAdmission(){
        this.setState({
            issubmitted: true
        })
        var adminName = name
        var data = {
            academicYear: this.state.registeredCourse.academicYear,
            adminName: adminName,
            admissionstatus: "Denied",
            instituteName: this.state.registeredCourse.instituteName,
            regid: this.state.registeredCourse.regid,
            title: this.state.registeredCourse.title,
            useremail: this.state.registeredCourse.useremail,
            username: this.state.registeredCourse.username
        }
        AdmissionDataService.processAdmission(data)
        .then(response => {
            console.log(response.data)
            this.setState({
                denied: true
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const { registeredCourse } = this.state;
        return(
            <AdmissionContainer>
                {this.state.denied?(
                    <StyledFormArea>
                    <StyledTitle color={colors.green} size={25}>
                    <strong>
                        Denial of Admission Processed Successfully!
                    </strong>
                    </StyledTitle>
                    <StyledTitle color={colors.dark2} size={20}>
                        <TextLink to="/adminstudents">View Student Registration Table</TextLink>
                    </StyledTitle>
                </StyledFormArea>
                ):(
                    <StyledFormArea>
                            <StyledTitle color={colors.dark1} size={25}>
                                Do you wish to deny admission for  
                            </StyledTitle>
                            <br></br>
                            <table className = "table table-striped table-light table-bordered table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th>Name</th>
                                        <th>Course Title</th>
                                        <th>Institute Name</th>
                                        <th>Academic Year</th>
                                        <th>HSC Percentage</th>
                                        <th>Eligibility Marks</th>
                                    </tr>
                                </thead>

                                <tbody>
                                        <tr key = {registeredCourse.regid}>
                                            <td className="align-middle text-center"> {registeredCourse.username} </td>
                                            <td className="align-middle text-center"> {registeredCourse.title} </td>
                                            <td className="align-middle text-center"> {registeredCourse.instituteName} </td>
                                            <td className="align-middle text-center"> {registeredCourse.academicYear} </td>
                                            <td className="align-middle text-center"> {registeredCourse.hscmarks} </td>
                                            <td className="align-middle text-center"> {registeredCourse.eligibleMarks} </td>
                                        </tr>
                                </tbody>
                                
                            </table>
                            {this.state.issubmitted ? (
                               <Loader 
                                type="ThreeDots"
                                color="#008000"
                                weight={50}
                                height={49}
                                />
                            ):(
                                <button type="submit" onClick={this.denyAdmission} className="btn btn-danger">
                                    Deny
                                </button>
                            )}
                        </StyledFormArea>
                )}
            </AdmissionContainer>
        )
    }
}