import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {log} from "util";
const ApiError = require('../exeptions/api-error')
const requestService = require('../services/request-service')

export class RequestController {
    async joinTeam(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const authorizationHeader = req.headers.authorization;
            const {team_id} = req.body;

            await requestService.joinTeam(authorizationHeader, team_id)
            return res.json("User joined team")
        }catch (e){
            next(e)
        }
    }

    async accept(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            await requestService.accept(id);
            return res.status(200).send();
        }catch (e){
            next(e)
        }
    }

    async decline(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            await requestService.decline(id);
            return res.status(200).send();

        }catch (e){
            next(e)
        }
    }

}


module.exports = new RequestController()