import styled from 'styled-components';

import background from './../assets/bg.jpg';

import bg1 from './../assets/college.jpg';

import couresbg from './../assets/rr8.jpg'

import instiutebg from './../assets/bluebg.jpg'

import users from './../assets/user.jpg';

import inst from './../assets/ins.jpg';

import {Link} from 'react-router-dom';
import background1 from './../assets/adminpage1.jpg'
import enrollcoursebg from './../assets/rr6.jpg'
export const colors = {
    primary: "#fff",
    theme: "#BE185D",
    light1: "#F3F4F6",
    light2: "#E5E7EB",
    dark1: "#1F2937",
    dark2: "#4B5563",
    dark3: "#9CA3AF",
    red: "#DC2626",
    green: "#008000"
}

export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg1});
    background-size: cover;
    background-attachment: fixed;
`;
export const StyledContainer1 = styled.div`
    margin: 0;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background1});
    background-size: cover;
    background-attachment: fixed;
`;
export const StyledContainer2 = styled.div`
    margin: 0;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background});
    background-size: cover;
    background-attachment: fixed;
`;
export const StyledContainer3 = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${users});
    background-size: cover;
    background-attachment: fixed;
`;
//Heading
export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color:colors.primary};
    padding: 5px;
    margin-bottom: 20px;
`;

//SubHeading
export const StyledSubTitle = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color:colors.primary};
    padding: 5px;
    margin-bottom: 25px;
`;

//Logo
export const Avatar = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

//Buttons
export const StyledButton = styled(Link)`
    padding: 10px;
    width: 200px;
    background-color: transparent;
    font-size: 18px;
    border: 3px solid ${colors.primary};
    border-radius: 30px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.4s;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary}
        cursor: pointer;
    }

`;

//Button Style
export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;

//Text input Style
export const StyledTextInput = styled.input`
    width: 280px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.dark1};
    backgorund-color: ${colors.light2};    
    border: 0;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.invalid && `background-color: ${colors.red}; color: ${colors.primary};`}

    &:focus{
        background-color: ${colors.dark2};
        color: ${colors.primary};
    }
`;

//Text Label Style
export const StyledLabel = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
`;

//Form Style
export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || colors.light1};
    text-align: center;
    padding: 45px 55px;
`;

//Form Button Style
export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.theme};
    transition: ease-in-out 0.3s;

    &:hover{
        background-color: ${colors.primary};
        color: ${colors.theme}
        cursor: pointer;
    }
`;

//Error Messages
export const ErrorMsg = styled.div`
    font-size: 11px;
    color: ${colors.red};
    margin-top: -5px;
    margin-bottom: 10px;
    text-align: left;
`;

//ExtraText
export const ExtraText = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => (props.color?props.color:colors.dark2)};
    padding: 2px;
    margin-top: 10px;
`;

//TextLink
export const TextLink = styled(Link)`
    text-decoration: none;
    font-size: ${(props) => props.size}px;
    color: ${(props) => props.color ? props.color:colors.theme};
    transition: ease-in-out 0.3s;

    &:hover{
        text-decoration: underline;
        letter-spacing: 2px;
        font-weight: bold;
    }

`;

//Icons
export const StyledIcons = styled.p`
    color: ${colors.dark1};
    position: absolute;
    font-size: 21px;
    top: 40px;
    ${(props) => props.right && `right: 15px; `};
    ${(props) => !props.right && `left: 20px; `}
`;

//Copyright
export const CopyrightText = styled.p`
    padding: 5px;
    margin: 20px;
    text-align: center;
    color: ${colors.light2};
`;

export const Dropdown = styled.select`
    width: 280px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.dark1};
    backgorund-color: ${colors.light2};    
    border: 0;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.invalid && `background-color: ${colors.red}; color: ${colors.primary};`}

    &:focus{
        background-color: ${colors.dark2};
        color: ${colors.primary};
    }

    option {
        color: ${colors.dark2};
        background: ${colors.light2};
        display: block;
        min-height: 20px;
        padding: 0px 2px 1px;
      }

`;

export const CoursesContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${couresbg});
    align-items: flex-start;
    background-size: cover;
    background-attachment: fixed;
`;

export const EnrolledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${enrollcoursebg});
    align-items: flex-start;
    background-size: cover;
    background-attachment: fixed;
`;

export const AdmissionContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background});
    align-items: flex-start;
    background-size: cover;
    background-attachment: fixed;
`;

export const UnEnrollButton = styled(Link)`
    padding: 10px;
    width: 50px;
    background-color: transparent;
    font-size: 15px;
    border: 1px solid ${colors.primary};
    border-radius: 10px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary}
        cursor: pointer;
    }

`;


export const InstituteInfoContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${instiutebg});
    background-size: cover;
    background-attachment: fixed;
`;

export const InstituteContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${inst});
    background-size: cover;
    background-attachment: fixed;
`;


