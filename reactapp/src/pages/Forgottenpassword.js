

import {StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText, StyledContainer} from './../components/Styles'
import RambosLogo from './../assets/RambosLogo.jpg';
import {Formik, Form} from 'formik';
import {TextInput} from './../components/FormLib';
import {FiMail, FiLock} from 'react-icons/fi';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import React, { useState } from 'react';

let name=""
let mobno=""
let emailadd=""
let errormsg=""


const Forgottenpassword = () => {
    const history  = useHistory();
    const [setSubmitted] = useState(false);
    return(
        <StyledContainer>
        <div>
            <StyledFormArea>
                <Avatar image={RambosLogo} />
                <StyledTitle color={colors.theme} size={30}>Forgot Password</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        pwd: ""
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email id")
                            .required("Required"),
                        })
                    }
                    onSubmit={(values) => {
                        console.log(JSON.stringify(values, null, 4));
                        fetch("http://localhost:8080/user/forgotpassword",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(values)

                            }).then((response) => {
                                if(response.status===200){
                                    response.json().then(d => {
                                        emailadd=d.email
                                        name=d.name
                                        mobno=d.mobno
                                        history.push('/otp')
                                        setSubmitted(true)
                                    })
                                    
                                }
                                else
                                {
                                    throw Error('Invalid Credentials')
                                }
                            })
                            .catch(error => {
                                console.log(error.message)
                                errormsg = error.message
                                history.push('/invalidlogin')
                            })
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput
                                name="email"
                                type="text"
                                label="Enter registered Email Address"
                                placeholder="abc@xyz.com"
                                icon={<FiMail />}
                            >

                            </TextInput>

                            <ButtonGroup>
                                <StyledFormButton type="submit">Submit</StyledFormButton>
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy; 2022
            </CopyrightText>
        </div>
        </StyledContainer>
    )
}
export { name, mobno, emailadd, errormsg};
export default Forgottenpassword;