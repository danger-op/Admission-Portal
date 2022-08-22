import http from '../../../Courses-http'

class CoursesDataService{

    getAll() {
        return http.get("/getAll");
      }

      findByTitle(title) {
        return http.get(`/getbyTitle?title=${title}`);
      }
      getbyID(id){
        return http.get(`/getbyId?id=${id}`);
      }

      enroll(data) {
        return http.post("/enroll", data);
      }

      viewEnrolled(useremail){
        return http.get(`/viewenrolled?useremail=${useremail}`);
      }

      getEnrolled(regid){
        return http.get(`/enrolledbyid?regid=${regid}`);
      }

      deleteEnrolled(regid, useremail){
        return http.delete(`/deleteenrolled?regid=${regid}&useremail=${useremail}`);
      }


}

export default new CoursesDataService();