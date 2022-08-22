import {StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText, StyledContainer, StyledSubTitle} from './../components/Styles'
import RambosLogo from './../assets/RambosLogo.jpg';
import {Formik, Form} from 'formik';
import {TextInput} from './../components/FormLib';
import { FiLock} from 'react-icons/fi';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom'
import React from 'react';

import { emailadd, name, mobno } from './Forgottenpassword';
import axios from 'axios';

let userauthorized=false
let email=""
let username=""
let mobile=""

const OTP = () => {

    const data = {
        email: emailadd,
        name: name
    }

    const history  = useHistory();

    return (
        <StyledContainer>
            <div>
            <StyledFormArea>
                <Avatar image={RambosLogo} />
                <StyledTitle color={colors.theme} size={30}>OTP Login</StyledTitle>
                <StyledSubTitle color={colors.dark1} size={20}>An OTP has been sent to {emailadd}</StyledSubTitle>
                <Formik
                    initialValues={{
                        otp: ""
                    }}
                    validationSchema={
                        Yup.object({
                            otp: Yup.number().min(4).required()
                        })
                    }
                    onSubmit={(values) => {
                        console.log(values.otp);
                        axios.post(`http://localhost:8080/user/validateOTP?otp=${values.otp}`,data).then(
                            response => {
                                console.log(response.data)
                                userauthorized=true
                                email=emailadd
                                username=name
                                mobile=mobno
                                history.push('/user')

                            }
                        )

                    }}
                >
                
                {({isSubmitting}) => (
                    <Form>
                        <TextInput
                                name="otp"
                                type="password"
                                label="OTP"
                                placeholder="****"
                                icon={<FiLock />}
                            >

                            </TextInput>

                            <ButtonGroup>
                                <StyledFormButton type="submit">Submit</StyledFormButton>
                            </ButtonGroup>
                    </Form>
                )}

                </Formik>
                <ExtraText>
                    Resend OTP ? <TextLink to="/forgottenpassword">Click here</TextLink>
                </ExtraText>
            </StyledFormArea>
            </div>
        </StyledContainer>
    )

}
export {username, mobile, email, userauthorized}
export default OTP;