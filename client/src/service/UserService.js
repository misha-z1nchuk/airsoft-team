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
    static changeTeam(new_team){
        return $api.post(API_URL+"/request/change-team", new_team);
    }

    static declineReq(id){
        return $api.post(API_URL+`/request/decline/${id}`);
    }

    static quitTeam(){
        return $api.post(API_URL+`/request/quit-team`);
    }

    static changeMail(email){
        return $api.post(API_URL+`/user/change-email`, {new_email: email});
    }

}

