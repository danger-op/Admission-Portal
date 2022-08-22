import { Button, CardBody, CardSubtitle, CardText, Card, Container } from "reactstrap"
import {React} from "react"
import axios from "axios"
import base_url from "../../coursesapi"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"


const hello=({hello,update})=>{
    const deleteCourse=(id)=>{
        axios.delete(`${base_url}/courses/delete/${id}`).then(
            (response)=>{
                console.log(response);
                toast.success("Course deleted");
                update(id);
            },
            (error)=>{
                console.log(error);
                toast.error("Course not deleted");
            }
        )
    }
    
    
    
    return(
        <Card className="text-center">
            <CardBody>
            <CardSubtitle className="font-weight-bold"><strong>{hello.title}</strong> </CardSubtitle>
            <CardText>{hello.course_desc}</CardText>
            <CardText><strong>Institute Name: </strong>{hello.institute_name}</CardText>
            <CardText><strong>Course Duration: </strong>{hello.courseDuration}</CardText>
            <CardText><strong>Academic Year: </strong>{hello.academicYear}</CardText>
            <CardText><strong>Eligibility Marks: </strong>{hello.elgibleMarks}</CardText>
            <Container className="text-center">
                <Link class="btn btn-danger ml-3" to={`/admincourse/view-course/delete/${hello.courseid}`}>Delete</Link>
                {" "}
                <Link class="btn btn-warning ml-3" to={`/admincourse/view-course/update/${hello.courseid}`}>Update</Link>
            </Container>
            </CardBody>
        </Card>
    )
}
export default hello;