import React from "react";
import axios from "axios"
import base_url from "./../../../coursesapi"
import { toast } from "react-toastify"
import {useHistory} from 'react-router-dom'
import { Link } from "react-router-dom"

const CollegeCard = ({ collegedata }) => {

  const deleteInstitute = (id) => {
    axios.delete(`${base_url}/institutes/delete/${id}`)
    .then(response => {
      console.log(response.data)
      toast.success("Institute Deleted")
    })
  }

  const history = useHistory()

  
  return (
    <>
      <section className="main-card--cointainer">
        {collegedata.map((curElem, index) => {
          const {  institutesId, institueName, imgLocation, institutePlace} = curElem;

          return (
            <>
              <div className="card-container" key={institutesId}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{index+1}</span>
                    <h1>
                      <strong>{institueName}</strong>  
                    </h1>
                    <span className="card-description subtle">
                      <h3>{institutePlace}</h3>
                    </span>
                  </div>
                <img src={imgLocation} alt="images" className="card-media" /> 

                  {/* <span className="card-tag  subtle">Edit</span>
                  <span className="card-tag subtle">Delete</span> */}
                  <br></br>
                  <Link className="btn btn-warning" to={`/editAcademy/${institutesId}`}>Edit</Link>
                  <Link className="btn btn-danger" to={`/deleteAcademy/${institutesId}`}>Delete</Link>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default CollegeCard;