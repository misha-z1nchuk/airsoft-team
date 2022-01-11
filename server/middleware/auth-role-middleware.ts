import {NextFunction} from "express";
const User = require("../models/user.model");
import {UserI} from "../global/types";

const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/token-service')
const jwt = require('jsonwebtoken')
const {Roles} = require('../global/enums')

declare namespace Express {
    interface Request {
        user: {};
    }
}

module.exports = function ensureRole(roles: Array<typeof Roles>) {
    return async (req: any, res: Response, next: NextFunction) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError());
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.UnauthorizedError());
            }

            const userData = tokenService.validateAccessToken(accessToken);
            if (!userData) {
                return next(ApiError.UnauthorizedError());
            }

            const user_id: number = jwt.decode(accessToken).id
            const candidate: UserI | null = await User.findOne({where: {id: user_id}});
            if (!candidate) {
                return next(ApiError.BadRequest("User not found"));
            }
            let isAuthorized = false
            roles.map(role => {
                if (candidate.roleId.toString() === role){
                    isAuthorized = true;
                }
            })
            if (!isAuthorized){
                return next(ApiError.BadRequest("Forbidden"));
            }



            req.user = userData;
            next();
        } catch (e) {
            console.log(e)
            return next(ApiError.UnauthorizedError());
        }
    }
}
