import React, { Component } from "react";
import InstituteDataService from "../Institute-Service/InstituteService-User";
import {emailadd, name} from './../../Login'
import Rating from '@mui/material/Rating';
import {TextLink, StyledFormArea, StyledTitle, CoursesContainer, colors} from './../../../components/Styles'

export default class UserRating extends Component{
    constructor(props){
        super(props);
        this.getInstitute = this.getInstitute.bind(this)
        this.rateInstitute = this.rateInstitute.bind(this)
        this.onChangeRating = this.onChangeRating.bind(this)
        this.onChangeReview = this.onChangeReview.bind(this)

        this.state = {
            currentInstitute: {
                institutesid: null,
                institueName: "",
                institutePlace: "",
                imgLocation: "",
                rating: null

            },
            rating: 0,
            review: "",
            submitRating: false
        }
    }

    componentDidMount(){
        this.getInstitute(this.props.match.params.id)
    }

    getInstitute(id){
        InstituteDataService.findById(id)
        .then(response => {
            this.setState({
                currentInstitute: response.data
            })
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    rateInstitute(){
        var email = emailadd
        var data = {
            email: email,
            instituteName: this.state.currentInstitute.institueName,
            name: name,
            rating: this.state.rating,
            review: this.state.review
        };
        InstituteDataService.postRating(data)
        .then(response => {
            console.log(response)
            this.setState({
                submitRating: true
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    onChangeRating(event, newValue){
        this.setState({
            rating: newValue
        })
    }

    onChangeReview(e){
        this.setState({
            review: e.target.value
        })
    }

    render(){
        const {currentInstitute} = this.state;
        return(
            <CoursesContainer>
                {this.state.submitRating?(
                    <CoursesContainer>
                    <div>
                        <StyledFormArea>
                            <StyledTitle color={colors.green} size={25}>
                                <strong>
                                    Thank You for your feedback !!
                                </strong>
                            </StyledTitle>
                            <StyledTitle color={colors.dark2}>
                                View Institutes ? <TextLink to="/userinstitute">Click here</TextLink>
                            </StyledTitle>
                        </StyledFormArea>
                    </div>
                    </CoursesContainer>
                ):(
                    <div className="w-100 was-validated">
                 <StyledTitle  size={20} color={colors.dark1}>
                    <strong>User Feedback on {currentInstitute.institueName}</strong>
                 </StyledTitle>

              <div class="p-3 mb-2 bg-light text-dark">
                    <label htmlFor="instiuterating" className="text-success form-label">
                      <strong>Rating : </strong>
                    </label>
                    <Rating 
                        name="half-rating"
                        precision={0.5}
                        value={this.state.rating}
                        onChange={this.onChangeRating}
                    />
              </div>

              <div class="p-3 mb-2 bg-light text-dark">
                    <label htmlFor="institutereview" className="text-success form-label">
                      <strong>Review : </strong>
                    </label>
                    <textarea 
                        className="form-control"
                        id="institutereview"
                        rows="3"
                        required
                        onChange={this.onChangeReview}
                    />
              </div>

              <button type="submit" onClick={this.rateInstitute} className="btn btn-success">
              Submit Feedback
              </button>


            </div>
                )}
            </CoursesContainer>
        )
    }


}