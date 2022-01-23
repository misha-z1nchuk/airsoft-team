import $api from "../http";


export default class TeamService{
    static getAllTeamsPlayers(){
        return $api.get('/team')
    }

    static getCertainTeamPlayers(id){
        return $api.get(`/team/${id}`)
    }

}

