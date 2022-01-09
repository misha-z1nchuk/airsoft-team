import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {emitter} from "../index";
import {annotateModelWithIndex} from "sequelize-typescript";
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
            const {teamId} = req.body;

            await requestService.joinTeam(authorizationHeader, teamId)
            emitter.emit('NewNotification')
            return res.json("Request to join team is sent")
        }catch (e){
            next(e)
        }
    }

    async quitFromTeam(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const authorizationHeader = req.headers.authorization;
            await requestService.quitTeam(authorizationHeader)
            return res.json("Request to quit team is sent")
        }catch (e){
            next(e)
        }
    }

    async changeTeam(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const {new_team} = req.body;
            const authorizationHeader = req.headers.authorization;
            await requestService.changeTeam(authorizationHeader, new_team)
            return res.json("Request to change team is sent")
        }catch (e){
            next(e)
        }
    }

    async accept(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            const authorizationHeader = req.headers.authorization
            await requestService.accept(id, authorizationHeader);
            return res.status(200).send();
        }catch (e){
            next(e)
        }
    }

    async decline(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            const authorizationHeader = req.headers.authorization;
            await requestService.decline(id, authorizationHeader);
            return res.status(200).send();

        }catch (e){
            next(e)
        }
    }

    async getRequestByAuthor(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const authorizationHeader = req.headers.authorization;
            const response = await requestService.getRequestByAuthor(authorizationHeader);
            return res.json(response);
        }catch (e){

        }
    }

}


module.exports = new RequestController()