import {StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText, StyledContainer} from './../components/Styles'
import RambosLogo from './../assets/RambosLogo.jpg';
import {Formik, Form} from 'formik';
import {TextInput} from './../components/FormLib';
import {FiMail, FiLock} from 'react-icons/fi';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom'
import React from 'react';

let name=""
let mobno=""
let emailadd=""
let authorized=false
let errormsg=""


const Login = () => {
    const history  = useHistory();
    return(
        <StyledContainer>
        <div>
            <StyledFormArea>
                <Avatar image={RambosLogo} />
                <StyledTitle color={colors.theme} size={30}>Login</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        pwd: ""
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email id")
                            .required("Required"),
                            pwd: Yup.string().min(8, "Password is too short").max(15, "Password is too long")
                            .required("Required")
                        })
                    }
                    onSubmit={(values) => {
                        console.log(JSON.stringify(values, null, 4));
                        fetch("http://localhost:8080/user/login",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(values)

                            }).then((response) => {
                                if(response.status===200){
                                    response.json().then(d=>{
                                        if(d.user_type==="1")
                                        {
                                            authorized=true;
                                            name=d.name
                                            mobno=d.mobno
                                            emailadd=d.email
                                            history.push('/admin')
                                        }
                                        else
                                        {
                                            authorized=true;
                                            name=d.name
                                            mobno=d.mobno
                                            emailadd=d.email
                                            history.push('/user')
                                            //login
                                        }
                                    })
                                }
                                else
                                {
                                    throw Error('Invalid Login Credentials')
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
                                label="Email Address"
                                placeholder="xyz@example.com"
                                icon={<FiMail />}
                            >

                            </TextInput>

                            <TextInput
                                name="pwd"
                                type="password"
                                label="Password"
                                placeholder="******"
                                icon={<FiLock />}
                            >

                            </TextInput>

                            <ButtonGroup>
                                <StyledFormButton type="submit">Login</StyledFormButton>
                                <StyledFormButton type="reset">Reset</StyledFormButton>
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Forgot Password ? <TextLink to="/forgottenpassword">Forgot</TextLink>
                </ExtraText>
                <ExtraText>
                    New Member ? <TextLink to="/signup">Signup</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy; 2022
            </CopyrightText>
        </div>
        </StyledContainer>
    )
}
export {authorized, name, mobno, emailadd, errormsg};
export default Login;