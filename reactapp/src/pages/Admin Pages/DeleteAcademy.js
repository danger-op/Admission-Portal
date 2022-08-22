import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import base_url from '../../coursesapi';
import { toast } from 'react-toastify';
import {TextLink} from './../../components/Styles'

function DeleteAcademy(props){

    const [institutes,Setinstitutes] = useState({})

    const getInstituteInfo=()=>{
        axios.get(`${base_url}/institutes/getById?id=${props.match.params.id}`)
        .then(response => {
            console.log(response.data)
            Setinstitutes(response.data)
        })
        .catch(error=> {
            console.log(error)
        })
    }

    useEffect(()=>{
        getInstituteInfo()
    },{})

    const DeleteAcademy=(id)=>{
        axios.delete(`${base_url}/institutes/delete/${id}`)
        .then(response => {
            console.log(response.data)
            toast.success("Institute Deleted Successfully")
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <Fragment>
            <Container className='text-center'>
                <br></br>
                <h3 className='text-danger'>Do you wish to delete this Institute?</h3>
                <br></br>
                <h2><strong>{institutes.institueName} - {institutes.institutePlace}</strong></h2>
                <img src={process.env.PUBLIC_URL + '/' +institutes.imgLocation} className="rounded mx-auto d-block" width="500" height="400"/>
                <br></br>
                <p className="text-dark h4">{institutes.instituteDescription}</p>
                <br></br>

                {/* <table className = "table table-striped table-light table-bordered table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Institute Name</th>
                        <th>Institute Description</th>
                        <th>Institute Place</th>
                    </tr>
                </thead>

                <tbody>
                    <tr key = {institutes.institutesId}>
                        <td className="align-middle text-center"> {institutes.institueName} </td>
                        <td className="align-middle text-center"> {institutes.instituteDescription} </td>
                        <td className="align-middle text-center"> {institutes.institutePlace} </td>
                    </tr>
                </tbody>

                </table> */}

            <button type="submit" className="btn btn-danger" onClick={()=>DeleteAcademy(institutes.institutesId)}>
                Delete
            </button>
            {"    "}
            <Link className='btn btn-success' to={'/admininstitute'}>  Cancel</Link>
            </Container>
            <br></br>
            <h4 className='text-center'>
                <TextLink to='/admininstitute'>View Institutes</TextLink>
            </h4>
        </Fragment>
    )

}

export default DeleteAcademy