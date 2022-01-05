import {NextFunction, Request, Response} from "express";

import path from "path";
import {log} from "util";
import {UserI} from "../global/types";
const uuid = require('uuid')
const userService = require('../services/user-service')


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




    async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        }catch (e){
            next(e);
        }
    }

}

module.exports = new UserController();
