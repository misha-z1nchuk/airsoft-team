import { Request, Response, NextFunction } from 'express';
import {validationResult} from "express-validator";
import Token from "../models/token.model";
const authService = require('../services/auth-service')
const ApiError = require('../exeptions/api-error')

declare var process : {
    env: {
        COOKIE_NAME: string;
        JWT_ACCESS_SECRET: string;
        REDIRECT_URL: string;
        API_URL: string;
        GOOGLE_REDIRECT_URL: string;
        GOOGLE_CLIENT_ID: string;
        CLIENT_URL:string;
        GOOGLE_CLIENT_SECRET: string;
    }
}

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {first_name, last_name, email, password, role} = req.body;
            const userData = await authService.registration(first_name, last_name, email, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {email, password} = req.body;
            const userData = await authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }


    async logout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)

        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const {email} = req.body;
            await authService.forgotPassword(email)

            return res.json("Link sent to the email")
        } catch (e) {
            next(e)
        }
    }


    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const {id, token} = req.params;
            const {new_password} = req.body;
            await authService.resetPassword(id, token, new_password);

            return res.status(200).json("Password changed");
        }catch (e){
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const activationLink = req.params.link;
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    }

    async googleAuth(req: Record<string, any>, res: Record<string, any>): Promise<any> {
        try {
            const user_id = req.user
            let tokenModel = await Token.findOne({where: {userId: user_id}})
            if (!tokenModel) {
                return
            }
            const refreshToken = tokenModel.refreshToken

            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.redirect("http://localhost:3000")
        } catch (e) {
            console.log(e)
        }
    }



}

module.exports = new AuthController();

