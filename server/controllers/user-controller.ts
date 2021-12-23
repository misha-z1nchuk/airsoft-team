import { Request, Response, NextFunction } from 'express';
const userService = require('../services/user-service')


class UserController{

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
