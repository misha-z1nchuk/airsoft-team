import {RequestI, TokenI, UserI} from "../global/types";

const Request = require("../models/request.model");
const User = require('../models/user.model')
import Team from "../models/team.model";
const Token = require('../models/token.model')
import {io} from "../index";
import {Roles} from "../global/roles";
import {checkAdmin} from "../utils/checkAdmin";

const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')
const teamService = require('../services/team-service')

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

        io.sockets.in("2").emit('message', `user with ${user_id} wanna JOIN team with id ${team_id}`);
        await Request.create({userId: user_id, action: 'JOIN', teamId:  team_id})
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


    async accept(id: string, authorizationHeader: string): Promise<void> {
        const userRequest: RequestI | null = await Request.findOne({where: {id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }
        const action = userRequest.action;
        if (action == "JOIN") {
            const user_id: number = userRequest.userId;
            await checkAdmin(authorizationHeader, Roles.MANAGER)
            await teamService.joinTeam(user_id, userRequest.teamId);
            await userRequest.destroy();
        } else if (action == "QUIT") {
            //TODO:
        } else if (action == "REGISTRATION MANAGER"){
            await checkAdmin(authorizationHeader, Roles.ADMIN);
            await userRequest.destroy();
        }
    }

    async decline(id: number, authorizationHeader: string): Promise<void> {
        const userRequest: RequestI | null = await Request.findOne({where: {id: id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }
        if (userRequest.action == "REGISTRATION MANAGER"){
            await checkAdmin(authorizationHeader, Roles.ADMIN);

            const candidate : UserI|null = await User.findOne({where : {id: userRequest.userId}});
            const token: TokenI|null = await Token.findOne({where : {userId: userRequest.userId}})
            await userRequest.destroy();
            await token?.destroy();
            await candidate?.destroy();
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
