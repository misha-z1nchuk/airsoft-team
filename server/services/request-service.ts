import {RequestI} from "../global/types";

const Request = require("../models/request.model");
import Team from "../models/team.model";

const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')
const teamService = require('../services/team-service')
const notificationService = require('../services/notification-service')

export class RequestService {

    async joinTeam(authorizationHeader: string, team_id: number): Promise<void>{
        const accessToken = authorizationHeader.split(' ')[1];
        const user_id: number = jwt.decode(accessToken).id

        const request = await Request.findOne({where: {userId: user_id}})
        if (request){
            throw ApiError.BadRequest("User has already created request")
        }
        const teamExist = await Team.findOne({where: {id: team_id}});
        if (!teamExist){
            throw ApiError.BadRequest("Chosen team does not exists")
        }

        await Request.create({userId: user_id, action: 'JOIN', teamId:  team_id})
        await notificationService.createNotification(`User with id ${user_id} wanna to join team with id ${team_id}`, 2);
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


    async accept(id: string): Promise<void> {
        const userRequest: RequestI | null = await Request.findOne({where: {id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }
        const action = userRequest.action;
        if (action == "JOIN") {
            const user_id: number = userRequest.userId;
            await teamService.joinTeam(user_id, userRequest.teamId);
            await userRequest.destroy();
        } else if (action == "QUIT") {
            //TODO:
        }
    }

    async decline(id: number): Promise<void> {
        const userRequest: RequestI | null = await Request.findOne({where: {id: id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }
        await userRequest.destroy();
    }


    async getRequestByAuthor(authorizationHeader: string): Promise<Request|null>{
        const accessToken = authorizationHeader.split(' ')[1];
        const user_id: number = jwt.decode(accessToken).id

        return await Request.findOne({where: {author_id : user_id}})
    }
}

module.exports = new RequestService();
