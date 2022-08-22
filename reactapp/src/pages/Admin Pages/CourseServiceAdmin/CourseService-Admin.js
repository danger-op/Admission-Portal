import http from '../../../Courses-http'

class CoursesDataService{

    getAllRegistered(){
        return http.get("/getAllregistered");
    }

    getRegistrationDetails(id){
        return http.get(`/enrolledbyid?regid=${id}`)
    }
}

export default new CoursesDataService();