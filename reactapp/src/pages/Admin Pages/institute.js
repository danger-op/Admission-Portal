import React from "react";
import CollegesList from "./Admin Components/CollegesList";
import Navbar from './Admin Components/Navbar';
import {useHistory} from 'react-router-dom'
import InstituteList from "./Admin Components/InstitutesList";
import background from './../../assets/adminpage1.jpg'
import { InstituteContainer } from "../../components/Styles";

const SearchBar = () => {

    const history = useHistory()

    const AddAcademy = () => {
        history.push('/addacdemy')
      }

    return(
        <>
        <Navbar />
        <InstituteContainer>
        
        <InstituteList/>
        <button type="button" id="add" className="btn btn-success" onClick={AddAcademy}>Add Institute</button>
        </InstituteContainer>
        </>
    )

}
    


export default SearchBar;