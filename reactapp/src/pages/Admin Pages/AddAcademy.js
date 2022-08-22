import React, {useEffect, useState } from 'react'
import { Form, FormGroup, Input, Label, Container, Button } from 'reactstrap';
import axios from 'axios';
import base_url from '../../coursesapi';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {TextLink} from './../../components/Styles'

const AddAcademy=()=>{
    const [institutes,Setinstitutes] = useState({})

    const handleform=(e) => {
        console.log(institutes)
        postData(institutes)
        e.preventDefault();
    }

    const postData = (data) => {
        axios.post(`${base_url}/institutes/add`,data)
        .then(response => {
            console.log(response.data)
            toast.success("Institute added successfully");
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div className='w-75 p-3'>
            <h1 className='text-center'>Add Institute here</h1>
            <Form onSubmit={handleform}>
                <FormGroup>
                    <Label for="institutename" ><strong>Institute Name</strong></Label>
                        <Input type="text" name="institutename" id="institutename" placeholder="Enter Institute name" required
                            onChange={(e)=>{
                            Setinstitutes({...institutes,institueName:e.target.value})
                        }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="instituteDescription" ><strong>Institute Description</strong></Label>
                        <Input type="textarea" name="instituteDescription" id="instituteDescription" placeholder="Enter Institute Description" required
                            onChange={(e)=>{
                            Setinstitutes({...institutes,instituteDescription:e.target.value})
                        }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="institutePlace" ><strong>Institute Place</strong></Label>
                        <Input type="text" name="institutePlace" id="institutePlace" placeholder="Enter Institute Place" required
                            onChange={(e)=>{
                            Setinstitutes({...institutes,institutePlace:e.target.value})
                        }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="rating" ><strong>Institute Rating</strong></Label>
                        <Input type="text" name="rating" id="rating" placeholder="Enter Institute Rating" value={0} readOnly
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="imgLocation" ><strong>Institute Image Location</strong></Label>
                        <Input type="text" name="imgLocation" id="imgLocation" placeholder="Enter Institute Image Location" required
                            onChange={(e)=>{
                            Setinstitutes({...institutes,imgLocation:e.target.value})
                        }}/>
                </FormGroup>
                <Container className='text-center'>
                    <Button type="submit" color="success">Add</Button>
                    {" "}
                    <Button type="reset"color="warning ml-3">Clear</Button>
                </Container>
            </Form>
            <br></br>
            <h4 className='text-center'>
                <TextLink to='/admininstitute'>View Institutes</TextLink>
            </h4>
        </div>
    )

}
export default AddAcademy