import BanList from "../models/ban_list.model";
import User from "../models/user.model";
import {UserI} from "../global/types";
const ApiError = require('../exeptions/api-error')

class AdminService{

    async banUser(userId: number, reason: string) {
        const candidate: UserI| null = await User.findOne({where: {id: userId}});
        if(!candidate){
            throw ApiError.BadRequest("Such user does not exists");
        }
        const banItem = BanList.findOne({where: {userId: userId}});
        if(banItem){
            throw ApiError.BadRequest("This user is already banned");
        }

        const newBan = BanList.create({userId, reason});
        await newBan.save();
    }
}

module.exports = new AdminService();