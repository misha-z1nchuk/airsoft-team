import BanList from "../models/ban_list.model";
const {Status} = require("../global/enums");

const ApiError = require('../exeptions/api-error')

export async function checkBanned(userId: number){
    const isBanned = await BanList.findOne({where: {userId: userId}});
    if (isBanned && isBanned?.status == Status.BANED){
        throw ApiError.BadRequest('User is banned');
    }

}