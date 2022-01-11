import {NextFunction} from "express";
const User = require("../models/user.model");
import {UserI} from "../global/types";

const ApiError = require('../exeptions/api-error');
const {Roles} = require('../global/enums')

declare namespace Express {
    interface Request {
        user: {};
    }
}

module.exports = function ensureRole(roles: Array<typeof Roles>) {
    return async (req: any, res: Response, next: NextFunction) => {
        try {
            console.log(req.user)
            const candidate: UserI | null = await User.findOne({where: {id: req.user.id}});
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
            next();
        } catch (e) {
            console.log(e)
            return next(ApiError.UnauthorizedError());
        }
    }
}
