import User from "../models/user.model";
import Request from "../models/request.model";
import Team from "../models/team.model";

const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')
const teamService = require('../services/team-service')

export class RequestService {

    async joinTeam(authorizationHeader: string, team_id: number): Promise<void>{
        const accessToken = authorizationHeader.split(' ')[1];
        const user_id: number = jwt.decode(accessToken).id

        const request = await Request.findOne({where: {author_id: user_id}})
        if (request){
            throw ApiError.BadRequest("User has already created request")
        }
        const teamExist = await Team.findOne({where: {id: team_id}});
        if (!teamExist){
            throw ApiError.BadRequest("Chosen team does not exists")
        }

        await Request.create({author_id: user_id, action: 'JOIN', team_id})
    }

    async quitTeam(authorizationHeader: string, team_id: number): Promise<void>{
        const accessToken = authorizationHeader.split(' ')[1];
        const user_id: number = jwt.decode(accessToken).id
        await Request.create({author_id: user_id, action: 'QUIT', team_id})
    }


    async switchTeam(authorizationHeader: string, team_id: number): Promise<void>{
        const accessToken = authorizationHeader.split(' ')[1];
        const user_id: number = jwt.decode(accessToken).id
        await Request.create({author_id: user_id, action: 'SWITCH', team_id})
    }


    async accept(id: number): Promise<void> {
        const userRequest: Request | null = await Request.findOne({where: {id: id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }

        const action = userRequest.action;
        if (action == "JOIN") {
            const user_id: number = userRequest.author_id;
            await teamService.joinTeam(user_id, userRequest.team_id);
            await userRequest.destroy();

        } else if (action == "QUIT") {
            //TODO:
        }
    }

    async decline(id: number): Promise<void> {
        const userRequest: Request | null = await Request.findOne({where: {id: id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }
        await userRequest.destroy();
    }
}

module.exports = new RequestService();
