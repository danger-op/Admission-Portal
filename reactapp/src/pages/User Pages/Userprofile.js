import React from 'react';
import Navbar from './User Components/Navbar'
import { name, mobno, emailadd } from '../Login';
import { StyledContainer3 } from '../../components/Styles';
const Userprofile = () => {
return (
	<StyledContainer3>
	<div style={{height:'100vh'}}>
		<Navbar/>
	<div style={{
                display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start'
            }}>
                <h1 style={{color:"#fff",fontFamily:"Dosis",fontSize:"50px"}}>Welcome, {name}</h1>
    </div>
	<span>
		<h2 style={{color:"	#fff",fontFamily:"Dosis",fontSize:"35px"}}>Email: {emailadd}</h2>
        <h2 style={{color:"	#fff",fontFamily:"Dosis",fontSize:"35px"}}>Mobile: {mobno}</h2>
	</span>
	</div>
	</StyledContainer3>
);
};

export default Userprofile;
