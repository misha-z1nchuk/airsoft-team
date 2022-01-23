import {RequestI, RequestResponse, TokenI, UserI} from "../global/types";

const Request = require("../models/request.model");
const User = require('../models/user.model')
import Team from "../models/team.model";
const Token = require('../models/token.model')
import {io} from "../index";
import {Op} from "sequelize";
import {checkRole} from "../utils/checkRole";
import {checkPlayersAmount} from "../utils/checkAllowJoinTeam";
const {Roles} = require("../global/enums");
const {RequestActions} = require('../global/enums')

const ApiError = require('../exeptions/api-error')
const teamService = require('../services/team-service')

export class RequestService {

    async joinTeam(user: UserI, team_id: number): Promise<void>{
        const request = await Request.findOne({where: {userId: user.id}})
        if (request){
            throw ApiError.BadRequest("User has already created request")
        }
        const teamExist = await Team.findOne({where: {id: team_id}});
        if (!teamExist){
            throw ApiError.BadRequest("Chosen team does not exists")
        }
        let isAbleToJoint = await checkPlayersAmount(team_id);
        if(!isAbleToJoint){
            throw ApiError.BadRequest("This team is already full")
        }

        io.sockets.in(Roles.MANAGER).emit('message', `user with ${user.id} wanna JOIN team with id ${team_id}`);
        return await Request.create({userId: user.id, action: 'JOIN', teamId:  team_id})
    }

    async quitTeam(user: UserI): Promise<RequestResponse>{
        if (!user.teamId){
            throw ApiError.BadRequest("User are not in the team");
        }
        const request = await Request.findOne({where: {userId: user.id}})
        if (request){
            throw ApiError.BadRequest("User has already created request")
        }
        let createdRequest: RequestI = await Request.create({userId: user.id, action: 'QUIT'});
        return {message: "Request to quit team is sent", request: createdRequest};
    }


    async accept(id: string, user: UserI): Promise<void> {
        const userRequest: RequestI | null = await Request.findOne({where: {id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }
        const action = userRequest.action;
        switch (action) {
            case RequestActions.JOIN:
            {
                const user_id: number = userRequest.userId;
                await teamService.joinTeam(user_id, userRequest.teamId);
                break;
            }
            case RequestActions.QUIT:
            {
                const user_id: number = userRequest.userId;
                await teamService.quitTeam(user_id)
                break;
            }
            case RequestActions.REGISTRATION_MANAGER:
            {
                await checkRole(user, Roles.ADMIN);
                break;
            }
            case RequestActions.SWITCH:
            {
                await teamService.changeTeam(userRequest.userId, userRequest.teamId);
                break;
            }
        }
        await userRequest.destroy();

    }

    async decline(id: number, user: UserI): Promise<void> {
        const userRequest: RequestI | null = await Request.findOne({where: {id: id}})
        if (!userRequest) {
            throw ApiError.BadRequest("Such request does not exists")
        }

        if (userRequest.action == "REGISTRATION MANAGER"){
            await checkRole(user, Roles.ADMIN);

            const candidate : UserI|null = await User.findOne({where : {id: userRequest.userId}});
            const token: TokenI|null = await Token.findOne({where : {userId: userRequest.userId}})
            await token?.destroy();
            await candidate?.destroy();
        }
        await userRequest.destroy();
    }


    async changeTeam(user: UserI, new_team: number): Promise<RequestResponse> {
        if (!user.teamId){
            throw ApiError.BadRequest("User are not in the team");
        }
        const request = await Request.findOne({where: {userId: user.id}})
        if (request){
            throw ApiError.BadRequest("User has already created request")
        }
        let isAbleToJoint = await checkPlayersAmount(new_team);
        if(!isAbleToJoint){
            throw ApiError.BadRequest("This team is already full")
        }

        let createdRequest: RequestI = await Request.create({userId: user.id, action: 'SWITCH', teamId: new_team})
        return {message: "Request to change team is sent" ,request:  createdRequest}
    }

    async getRequestByAuthor(user: UserI): Promise<Request|null>{
        return await Request.findOne({where: {userId : user.id}})
    }


    async getManagerRequests(user: UserI):  Promise<Request|null>{
        return await Request.findAll({where: {
            action: { [Op.ne]: "REGISTRATION MANAGER"}
            }})
    }
}

module.exports = new RequestService();
