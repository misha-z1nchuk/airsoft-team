import $api, {API_URL} from "../http";


export default class UserService{
    static fetchUsers(){
        return $api.get('/users')
    }

    static changePhoto(photo){
        return $api.post(API_URL + "/user/change-img", photo)
    }

    static joinTeam(team_id){
        return $api.post(API_URL+"/request/join-team", team_id);
    }

    static declineReq(id){
        return $api.post(API_URL+`/request/decline/${id}`);
    }

}

