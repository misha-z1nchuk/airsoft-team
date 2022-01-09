import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {UserI} from "../global/types";
import User from "../models/user.model";
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

    async kickUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {userId, reason} = req.body;
            await teamService.kickUser(userId, reason);
            res.status(200).send();
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TeamController();
