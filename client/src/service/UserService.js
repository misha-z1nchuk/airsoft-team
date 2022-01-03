import $api, {API_URL} from "../http";


export default class UserService{
    static fetchUsers(){
        return $api.get('/users')
    }

    static changePhoto(photo){
        return $api.post(API_URL + "/user/change-img", photo)
    }

}

