import {NextFunction, Request, Response} from "express";
const adminService = require('../services/admin-service')

class AdminController{
    async banUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const {userId, reason} = req.body;
        await adminService.banUser(userId, reason);
        res.status(200).send();
    }



}