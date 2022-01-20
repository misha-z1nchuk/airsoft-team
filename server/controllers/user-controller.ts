import {NextFunction, Request, Response} from "express";

import path from "path";
import {validationResult} from "express-validator";
import {UserI} from "../global/types";
const uuid = require('uuid')
const userService = require('../services/user-service')
const ApiError = require('../exeptions/api-error')

interface MulterRequest extends Request {
    files: any;
    user: UserI;
}

class UserController{

    async banUnbanUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {userId, reason} = req.body;
            await userService.banUnbanUser(userId, reason);
            res.status(200).send();
        }catch (e){
            next(e)
        }
    }


    async changePhoto(req: MulterRequest, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            await userService.changeImg(req.user, fileName);
            return res.status(200).send();
        }catch (e){
            next(e);
        }
    }

    async changeEmail(req: MulterRequest, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {new_email} = req.body;
            await userService.changeEmail(new_email, req.user);
            return res.status(200).send();
        }catch (e){
            next(e)
        }

    }



    async getUser(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const {id} = req.params;
            const user = await userService.getUser(id);
            return res.json(user);
        }catch (e){
            next(e);
        }
    }

    async confirmChangeEmail(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const {token} = req.params;
            await userService.confirmChangeEmail(token);
            res.write(`<h1>Email is changed<h1/>`)
        }catch (e){
            next(e)
        }

    }
}

module.exports = new UserController();
