import http from './../../../Admission-http'

class AdmissionDataService{

    processAdmission(data){
        return http.post("/add",data)
    }
}

export default new AdmissionDataService()