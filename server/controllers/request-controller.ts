import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ExtRequest} from "../global/types";
const ApiError = require('../exeptions/api-error')
const requestService = require('../services/request-service')



export class RequestController {
    async joinTeam(req: ExtRequest, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }
            const {teamId} = req.body;

            let request = await requestService.joinTeam(req.user, teamId)
            res.json(request);
        }catch (e){
            next(e)
        }
    }

    async quitFromTeam(req: ExtRequest, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            let result = await requestService.quitTeam(req.user)
            return res.json(result)
        }catch (e){
            next(e)
        }
    }

    async changeTeam(req: ExtRequest, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const {new_team} = req.body;
            let result = await requestService.changeTeam(req.user, new_team)
            return res.json(result);
        }catch (e){
            next(e)
        }
    }

    async accept(req: ExtRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            await requestService.accept(id, req.user);
            return res.status(200).send();
        }catch (e){
            next(e)
        }
    }

    async decline(req: ExtRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            await requestService.decline(id, req.user);
            return res.status(200).send();

        }catch (e){
            next(e)
        }
    }

    async getRequestByAuthor(req: ExtRequest, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const response = await requestService.getRequestByAuthor(req.user);
            return res.json(response);
        }catch (e){
            next(e)
        }
    }

    async getManagerRequests(req: ExtRequest, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const response = await requestService.getManagerRequests(req.user);
            return res.json(response);
        }catch (e){
            next(e)
        }

    }
}


module.exports = new RequestController()