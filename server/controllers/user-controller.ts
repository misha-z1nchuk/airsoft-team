import {NextFunction, Request, Response} from "express";

import path from "path";
import {validationResult} from "express-validator";
const uuid = require('uuid')
const userService = require('../services/user-service')
const ApiError = require('../exeptions/api-error')

interface MulterRequest extends Request {
    files: any;
}

class UserController{



    async changePhoto(req: MulterRequest, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const authorizationHeader = req.headers.authorization;
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            await userService.changeImg(authorizationHeader, fileName);
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

            const authorizationHeader = req.headers.authorization;
            const {new_email} = req.body;
            await userService.changeEmail(new_email, authorizationHeader);
            return res.status(200).send();
        }catch (e){
            next(e)
        }

    }





    async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        }catch (e){
            next(e);
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
}

module.exports = new UserController();
