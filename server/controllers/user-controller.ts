import { Request, Response, NextFunction } from 'express';
import {validationResult} from "express-validator";
const userService = require('../services/user-service')
const ApiError = require('../exeptions/api-error')

declare var process : {
    env: {
        CLIENT_URL:string
    }
}

class UserController{
    async registration(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {first_name, last_name, email, password, role} = req.body;
            const userData = await userService.registration(first_name, last_name, email, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*1000, httpOnly: true})
            return res.json(userData);
        }catch (e){
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch (e){
            next(e)

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*1000, httpOnly: true})
            return res.json(userData);
        }catch (e){
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction):Promise<Response|void> {
        try {
            const activationLink= req.params.link;
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e){
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
