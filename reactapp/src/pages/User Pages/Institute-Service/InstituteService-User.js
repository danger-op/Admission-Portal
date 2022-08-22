import http from './../../../Institutes-http'

class InstituteDataService {

    getAll() {
        return http.get("/getAll");
      }

    findById(id){
        return http.get(`/getById?id=${id}`);
    }

    getRating(institueName){
        return http.get(`/getRatingbyInstituteName?instituteName=${institueName}`);
    }

    getInstitutebyName(institutename){
        return http.get(`/getInstitutebyName?institutename=${institutename}`)
    }

    searchInstitutebyName(institutename){
        return http.get(`/searchInstitute?institutename=${institutename}`)
    }

    postRating(data){
        return http.post("/rate",data);
    }

}

export default new InstituteDataService();