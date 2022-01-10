import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

const ApiError = require('../exeptions/api-error')
const adminService = require('../services/admin-service')

class AdminController{
    async banUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {userId, reason} = req.body;
            await adminService.banUser(userId, reason);
            res.status(200).send();
        }catch (e){
            next(e)
        }
    }

    async unbanUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {userId, reason} = req.body;
            await adminService.unBanUser(userId,reason);
            res.status(200).send();
        }catch (e){
            next(e);
        }

    }

}

module.exports = new AdminController();