import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model'
import { body, validationResult } from 'express-validator';
const userService = require('../services/user-service')

declare var process : {
    env: {
        CLIENT_URL:string
    }
}

class UserController{
    async registration(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const {first_name, last_name, email, password, role} = req.body;
            const userData = await userService.registration(first_name, last_name, email, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

        }catch (e){

        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

        }catch (e){

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

        }catch (e){

        }
    }



    async activate(req: Request, res: Response, next: any) {
        try {
            const activationLink= req.params.link;
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e){
            console.log(e)
        }
    }
}

module.exports = new UserController();


// const registration = async (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const {first_name, last_name, email, password, role} = req.body;
//
//     let result = await UserService.register(first_name, last_name, email, password, role)
//     if (result instanceof ApiError){
//         return next(result)
//     }
//
//     return res.status(200).json({
//         message: result
//     });
// };
//

