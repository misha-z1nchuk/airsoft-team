import {UserI} from "../global/types";

const User = require('../models/user.model')

import Request from "../models/request.model";
import Team from "../models/team.model";

const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')
const UserDto = require('../dtos/user-dto')

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
}

module.exports = new TeamService();
