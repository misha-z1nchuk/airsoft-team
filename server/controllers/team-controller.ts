import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
const teamService = require('../services/team-service')
const ApiError = require('../exeptions/api-error')


class TeamController{
    async getTeamUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            let users = await teamService.getTeamUsers(id);
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TeamController();
