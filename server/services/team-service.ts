import {UserI} from "../global/types";

const User = require('../models/user.model')

import Request from "../models/request.model";
import Team from "../models/team.model";
import Comment from "../models/comment";

const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')
const UserDto = require('../dtos/user-dto')
const {Actions} = require('../global/enums')

export class TeamService {
    async joinTeam(user_id: number, team_id: number){
        const user: UserI | null = await User.findOne({where: {id: user_id}})
        if (!user) {
            throw ApiError.BadRequest(`User does not exist`);
        }
        user.teamId = team_id;
        await user.save();
    }

    async getTeamUsers(id: number) {
        const users: UserI[] | null = await User.findAll({where : {teamId: id}});
        if (!users?.length){
            throw ApiError.BadRequest("This team doesn`t have players yet")
        }
        let result: UserI[] = []
        users.map((user: UserI) => {
            let userToAdd = new UserDto(user);
            result.push(userToAdd);
        })
        return result;
    }

    async quitTeam(user_id: number) {
        const user: UserI | null = await User.findOne({where: {id: user_id}})
        if (!user) {
            throw ApiError.BadRequest(`User does not exist`);
        }
        user.teamId = null;
        await user.save();
    }

    async kickUser(userId: number, reason: string) {
        const user : UserI | null =await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("User not found");
        }
        if(!user.teamId){
            throw ApiError.BadRequest("User are not in the team");
        }

        user.teamId = null;
        await user.save();
        await Comment.create({userId, action: Actions.KICK, reason: reason});
    }

    async changeTeam(userId: number, teamId: number) {
        const user : UserI | null =await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("User not found");
        }
        if(!user.teamId){
            throw ApiError.BadRequest("User are not in the team");
        }
        user.teamId = teamId;
        await user.save();
    }
}

module.exports = new TeamService();
