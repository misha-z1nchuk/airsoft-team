import $api, {API_URL} from "../http";


export default class RequestService{

    static async getUserResponse() {
        return await $api.get(API_URL+"/request");
    }

    static async joinTeam(team_id){
        return $api.post(API_URL+"/request/join-team", team_id)
    }

    static async getAllManagerRequests(){
        return $api.get(API_URL+"/request/manager")
    }

    static async acceptRequest(id) {
        return $api.post(API_URL+`/request/accept/${id}`)
    }

    static async declineRequest(id) {
        return $api.post(API_URL+`/request/decline/${id}`)
    }
}