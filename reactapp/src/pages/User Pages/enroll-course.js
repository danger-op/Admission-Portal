import React, { Component } from "react";
import CoursesServiceUser from "./CourseService-User/CoursesService-User";
import {emailadd, name, mobno} from './../Login'
import { Container} from 'reactstrap';
import axios from "axios";
import {TextLink, StyledFormArea, StyledTitle, CoursesContainer, colors} from './../../components/Styles'

export default class CourseEnroll extends Component{

    constructor(props) {
        super(props);
        this.getCourse = this.getCourse.bind(this);
        this.enrollCourse = this.enrollCourse.bind(this);
        this.onChangeHSCMarks = this.onChangeHSCMarks.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    
        this.state = {
          currentCourse: {
            courseid: null,
            title: "",
            course_desc: "",
            instituteid: null,
            institute_name: ""
          },
          HSCMarks: null,
          marksfile: "",
          enrolled: false,
          alreadyenrolled: false
        };
      }
    
      componentDidMount() {
        this.getCourse(this.props.match.params.id);
      }

      getCourse(id) {
        CoursesServiceUser.getbyID(id)
          .then(response => {
            this.setState({
                currentCourse: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      onChangeHSCMarks(e) {
        this.setState({
            HSCMarks: e.target.value
        });
      }

      uploadFile(e){
        let file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const API_URL = "http://localhost:8080/courses/uploadMarks"
        axios.post(API_URL,formData)
        .then(response => {
          console.log(response.data)
          this.setState({
            marksfile: response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
      }

      enrollCourse(){
        var email = emailadd
        var username = name
        var data = {
            academicYear: this.state.currentCourse.academicYear,
            coursedesc: this.state.currentCourse.course_desc,
            hscmarks: this.state.HSCMarks,
            instituteName: this.state.currentCourse.institute_name,
            title: this.state.currentCourse.title,
            useremail: email,
            username: username,
            eligibleMarks: this.state.currentCourse.elgibleMarks,
            marksfile: this.state.marksfile
          };
          CoursesServiceUser.enroll(data)
          .then(response => {
            console.log(response.data);
              if(response.status===200){
                this.setState({
                  enrolled: true,
                  alreadyenrolled: false
                })
              }
              else{
                this.setState({
                  enrolled: true,
                  alreadyenrolled: true
                })
              }
          })
          .catch(error => {
            console.log(error);
          });
      }

      render(){
        const { currentCourse } = this.state;
        return(
          <CoursesContainer>
              {this.state.enrolled ? (
                 this.state.alreadyenrolled?(
                  <CoursesContainer>
                  <div>
                      <StyledFormArea>
                          <StyledTitle color={colors.red} size={25}>
                              <strong>
                              You have already applied to this Course!
                              </strong>
                          </StyledTitle>
                          <StyledTitle color={colors.dark2} size={20}>
                              <TextLink to="/courseenrolled">View Applied Courses</TextLink>
                          </StyledTitle>
                          <StyledTitle color={colors.dark2} size={20}>
                              Apply new Course ? <TextLink to="/usercourse">Click Here</TextLink>
                          </StyledTitle>
                      </StyledFormArea>
                  </div>
                  </CoursesContainer>
                 ):(
                  <CoursesContainer>
                  <div>
                      <StyledFormArea>
                          <StyledTitle color={colors.green} size={25}>
                          <strong>
                              You have applied for the Course Successfully!
                          </strong>
                          </StyledTitle>
                          <StyledTitle color={colors.dark2} size={20}>
                            <TextLink to="/courseenrolled">View Applied Courses</TextLink>
                          </StyledTitle>
                          <StyledTitle color={colors.dark2} size={20}>
                              Apply another Course ? <TextLink to="/usercourse">Click Here</TextLink>
                          </StyledTitle>
                      </StyledFormArea>
                  </div>
                  </CoursesContainer>
                 )
              ) : (
                <div className="w-100 was-validated justify-content-center">
                <StyledTitle  size={20} color={colors.light1}>
                  <strong>Course Application Form</strong>
                </StyledTitle>
                <div class="p-3 mb-2 bg-light text-dark">
                    <label htmlFor="title" className="text-success form-label">
                      <strong>Title: </strong>
                    </label>
                    <input
                      type="text"
                      readonly class="form-control-plaintext"
                      id="title"
                      required
                      value={currentCourse.title}
                      name="title"
                    />
              </div>

              <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="description" className="text-success form-label">
                  <strong>Description:</strong>
                </label>
                  <textarea
                    className="form-control-plaintext"
                    readOnly
                    value={currentCourse.course_desc}
                    required
                    id="description"
                    name="description"
                  >

                  </textarea>
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="institute"  className="text-success form-label">
                  <strong>Institute Name:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="institute"
                    required
                    value={currentCourse.institute_name}
                    name="institute"
                  />
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="academicyear"  className="text-success form-label">
                  <strong>Academic Year:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="academicyear"
                    required
                    value={currentCourse.academicYear}
                    name="academicyear"
                  />
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="courseDuration"  className="text-success form-label">
                  <strong>Course Duration:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="courseDuration"
                    required
                    value={currentCourse.courseDuration}
                    name="courseDuration"
                  />
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="fname" className="text-success form-label">
                  <strong>Name:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="fname"
                    required
                    value={name}
                    name="fname"
                  />
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="email" className="text-success form-label">
                  <strong>Email:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="email"
                    required
                    value={emailadd}
                    name="email"
                  />
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="mobile" className="text-success form-label">
                  <strong>Mobile Number:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="mobile"
                    required
                    value={mobno}
                    name="mobile"
                  />
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="elgibleMarks"  className="text-success form-label">
                  <strong>Eligibility Marks:</strong>
                </label>
                  <input
                    type="text"
                    readonly class="form-control-plaintext"
                    id="elgibleMarks"
                    required
                    value={currentCourse.elgibleMarks}
                    name="elgibleMarks"
                  />
            </div>


            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="hscmarks" className="text-success form-label">
                  <strong>HSC/12th Percentage:</strong>
                </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="hscmarks"
                    value={this.state.HSCMarks}
                    onChange={this.onChangeHSCMarks}
                    name="hscmarks"
                  />
                <div className="invalid-feedback">
                    Percentage is required!
                </div>
            </div>

            <div class="p-3 mb-2 bg-light text-dark">
                <label htmlFor="marksfile" className="text-success form-label">
                  <strong>HSC/12th Marksheet:</strong>
                </label>
                  <input
                    required
                    type="file"
                    accept=".pdf"
                    className="form-control"
                    id="marksfile"
                    onChange={this.uploadFile}
                    name="marksfile"
                  />
                <div className="invalid-feedback">
                    Mark proof is required!
                </div>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="Datacheck" required />
              <label className="text-white" htmlFor="Datacheck">
              <strong>I hereby declare that above information is correct to the best of my knowledge.</strong>
              </label>
              <div className="invalid-feedback">
                    Declaration is required!
              </div>
            </div>
            <Container className='text-center'>
            <button type="submit" onClick={this.enrollCourse} className="btn btn-success">
              Apply Now
            </button>
            </Container>

          </div>
              )}
          </CoursesContainer>

        )
      }
}


