import axios from "axios";
//admin section
export default axios.create({
    baseURL: "http://localhost:8080/admission",
    headers: {
      "Content-type": "application/json"
    }
  });