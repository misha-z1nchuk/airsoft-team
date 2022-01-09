import BanList from "../models/comment";
import User from "../models/user.model";
import {UserI} from "../global/types";
import Comment from "../models/comment";
const ApiError = require('../exeptions/api-error')
const {Actions} = require('../global/enums')
const {Roles} = require('../global/enums')

class AdminService{

    async banUser(userId: number, reason: string) {
        const candidate: UserI| null = await User.findOne({where: {id: userId}});
        if(!candidate){
            throw ApiError.BadRequest("Such user does not exists");
        }
        if(candidate.isBanned){
            throw ApiError.BadRequest("This user is already banned");
        }
        if(candidate.roleId.toString() == Roles.ADMIN){
            throw ApiError.BadRequest("Admin can not ban admin");
        }

        candidate.isBanned = true;
        await candidate.save();
        const action = Actions.BAN
        await Comment.create({userId, action: action, reason: reason});
    }

    async unBanUser(userId: number, reason: string) {
        const candidate: UserI| null = await User.findOne({where: {id: userId}});
        if(!candidate){
            throw ApiError.BadRequest("Such user does not exists");
        }
        if(!candidate.isBanned){
            throw ApiError.BadRequest("This user is already unbanned");
        }

        candidate.isBanned = false;
        await candidate.save();

        const action = Actions.UNBAN
        await Comment.create({userId, action: action, reason: reason});
    }
}

module.exports = new AdminService();