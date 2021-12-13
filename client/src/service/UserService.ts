import $api from "../http";
import {AxiosResponse} from "axios";
import {UserI} from "../../../server/global/types";


export default class UserService{
    static fetchUsers(): Promise<AxiosResponse<UserI[]>>{
        return $api.get('/users')
    }
}