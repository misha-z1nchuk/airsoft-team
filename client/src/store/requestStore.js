import {makeAutoObservable} from "mobx";
import RequestService from "../service/RequestService";
import UserService from "../service/UserService";


export default class RequestStore{
    request = {};

    constructor() {
        makeAutoObservable(this);
    }

    setRequest(request){
        this.request = request;
    }

    async getRequestByAuthor(){
        let res = await RequestService.getUserResponse()
        this.setRequest(res.data);
    }

    async joinTeam(team_id){
        try{
            const response = await UserService.joinTeam({team_id: team_id})
        }catch (e){
            console.log(e)
        }
    }
}