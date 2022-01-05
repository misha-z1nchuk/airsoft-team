import {NextFunction} from "express";
const User = require("../models/user.model");
import {annotateModelWithIndex} from "sequelize-typescript";
import {UserI} from "../global/types";

const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/token-service')
const jwt = require('jsonwebtoken')

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

        const user_id: number = jwt.decode(accessToken).id
        const candidate: UserI | null = await User.findOne({where: {id: user_id}});
        if (!candidate){
            return next(ApiError.BadRequest("User not found"));
        }

        if(candidate.role !== 1){
            return next(ApiError.BadRequest("This function is only for Players"));
        }


        req.user = userData;
        next();
    }catch (e){
        return next(ApiError.UnauthorizedError());
    }
}