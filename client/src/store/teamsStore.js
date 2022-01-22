import {makeAutoObservable} from "mobx";
import TeamService from "../service/TeamService";


export default class TeamsStore{
    teamA = [];
    teamB = [];
    constructor() {
        makeAutoObservable(this);
    }

    setTeamA(playerList){
        this.teamA = playerList;
    }


    setTeamB(playerList){
        this.teamB = playerList;
    }



    async getAllTeamsPlayers(){
        try{
            return await TeamService.getAllTeamsPlayers();
        }catch (e){
            console.log(e)
        }
    }

}