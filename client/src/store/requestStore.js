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

    async getAllRequestsManager(){
        return  await RequestService.getAllManagerRequests()
    }

    async joinTeam(team_id){
        try{
            await UserService.joinTeam({teamId: team_id});
        }catch (e){
            console.log(e)
        }
    }
    async changeTeam(team_id){
        try{
            await UserService.changeTeam({new_team: team_id});
        }catch (e){
            console.log(e)
        }
    }

    async declineReq(id){
        try{
            await UserService.declineReq(id);
        }catch (e){
            console.log(e)
        }
    }
    async quitTeam(){
        try{
            await UserService.quitTeam();
        }catch (e){
            console.log(e)
        }
    }

    async acceptRequest(id){
        try{
            await RequestService.acceptRequest(id);
        }catch (e){
            console.log(e)
        }
    }

    async declineRequest(id){
        try{
            await RequestService.declineRequest(id);
        }catch (e){
            console.log(e)
        }
    }



}