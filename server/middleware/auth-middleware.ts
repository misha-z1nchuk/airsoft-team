import {NextFunction} from "express";
import {UserI} from "../global/types";

const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/token-service')
const User = require('../models/user.model')
const UserDto = require('../dtos/user-dto')

declare namespace Express {
    interface Request {
        user: {};
    }
}
module.exports = async function (req :any, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData){
            return next(ApiError.UnauthorizedError());
        }

        const user: UserI| null = await User.findOne({where: {id: userData.id}});
        if(!user){
            return next(ApiError.UnauthorizedError());
        }

        req.user = new UserDto(user);
        next();
    }catch (e){
        return next(ApiError.UnauthorizedError());
    }
}