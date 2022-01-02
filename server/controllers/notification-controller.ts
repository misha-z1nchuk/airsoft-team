import {NextFunction, Request, Response} from "express";
import Notification from "../models/notification.model";
import {isNumber} from "util";
const notificationService = require('../services/notification-service')

class NotificationController{
    async getNotifications(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const authorizationHeader = req.headers.authorization;
            let notifications = await notificationService.getAllNotifications(authorizationHeader);
            return res.status(200).json(notifications);
        }catch (e){
            next(e)
        }
    }

    async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const {id} = req.params;
            await notificationService.deleteNotification(id);
            return res.status(200).send();
        }catch (e){
            next(e);
        }

    }
}

module.exports = new NotificationController();