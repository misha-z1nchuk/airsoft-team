import {UserI} from "../global/types";

const User = require('../models/user.model')

import Request from "../models/request.model";
import Team from "../models/team.model";

const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')

export class TeamService {
    async joinTeam(user_id: number, team_id: number){
        const user: UserI | null = await User.findOne({where: {id: user_id}})
        if (!user) {
            throw ApiError.BadRequest(`User does not exist`);
        }
        user.teamId = team_id;
        await user.save();
    }
}

module.exports = new TeamService();
