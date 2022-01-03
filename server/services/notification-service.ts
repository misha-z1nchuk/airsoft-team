import Notification from "../models/notification.model";
import User from "../models/user.model";
import {where} from "sequelize";
const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')
import {emitter} from "../index";
import Request from "../models/request.model";

class NotificationService{
    async createNotification(text: string, recipient_role: number){
        await Notification.create({text, recipient_role});
        emitter.emit('newNotification');
    }

    async getAllNotifications(authorizationHeader: string) {
        const accessToken = authorizationHeader.split(' ')[1];
        const user_id = jwt.decode(accessToken).id;
        const candidate: User| null  = await User.findOne({where: {id: user_id}})
        if (!candidate){
            throw ApiError.UnauthorizedError()
        }
        const role: number = candidate.role;
        return await Notification.findAll({where : {recipient_role: role}});
    }

    async deleteNotification(id: number) {
        const notification: Notification | null = await Notification.findOne({where: {id: id}})
        if (!notification) {
            throw ApiError.BadRequest("Such notification does not exists")
        }
        await notification.destroy();
    }
}

module.exports = new NotificationService();