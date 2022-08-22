import React, {useEffect, useState } from 'react'
import { Form, FormGroup, Input, Label, Container, Button } from 'reactstrap';
import axios from 'axios';
import base_url from '../../coursesapi';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {TextLink} from './../../components/Styles'

function EditAcademy(props){

    const [institutes,Setinstitutes] = useState({})

    const handleform = (e) => {
        console.log(institutes);
        UpdateDatatoServer(institutes);
        e.preventDefault();
    }

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

    const UpdateDatatoServer=(data)=>{
        axios.put(`${base_url}/institutes/edit/${props.match.params.id}`,data)
        .then(response => {
            console.log(response.data)
            toast.success("Institute Updated Successfully")
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div className='w-75 p-3'>
            <h1 className='text-center'>Edit Institute here</h1>
            <Form onSubmit={handleform}>
            <FormGroup>
                    <Label for="institutename" ><strong>Institute Name</strong></Label>
                        <Input type="text" name="institutename" id="institutename" required value={institutes.institueName} readOnly
                        />
            </FormGroup>
            <FormGroup>
                    <Label for="institutePlace" ><strong>Institute Place</strong></Label>
                        <Input type="text" name="institutePlace" id="institutePlace" value={institutes.institutePlace} required
                        onChange={(e)=>{
                            Setinstitutes({...institutes,institutePlace:e.target.value})
                        }}
                        />
            </FormGroup>
            <FormGroup>
                    <Label for="instituteDescription" ><strong>Institute Description</strong></Label>
                        <Input type="textarea" name="instituteDescription" id="instituteDescription" value={institutes.instituteDescription} required
                        onChange={(e)=>{
                            Setinstitutes({...institutes,instituteDescription:e.target.value})
                        }}
                        />
            </FormGroup>
            
            <FormGroup>
                    <Label for="rating" ><strong>Institute Rating</strong></Label>
                        <Input type="text" name="rating" id="rating" placeholder="Enter Institute Rating" value={institutes.rating} readOnly
                        />
            </FormGroup>
            <FormGroup>
                    <Label for="imgLocation" ><strong>Institute Image</strong></Label>
                        <Input type="text" name="imgLocation" id="imgLocation" value={institutes.imgLocation} required
                        onChange={(e)=>{
                            Setinstitutes({...institutes,imgLocation:e.target.value})
                        }}
                        />
            </FormGroup>
            <img src={process.env.PUBLIC_URL + '/' +institutes.imgLocation} className="rounded mx-auto d-block" width="500" height="400"/>
            <br></br>
            <Container className='text-center'>
                    <Button type="submit" color="warning">Update</Button>
                    {" "}
                    <Link className='btn btn-success' to={'/admininstitute'}>Cancel</Link>
            </Container>
            </Form>
            <br></br>
            <h4 className='text-center'>
                <TextLink to='/admininstitute'>View Institutes</TextLink>
            </h4>
        </div>
    )

}
export default EditAcademy