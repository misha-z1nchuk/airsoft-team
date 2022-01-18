import {UserI} from "../global/types";
import Comment from "../models/comment";

const User = require('../models/user.model')
const ApiError = require('../exeptions/api-error')
const uuid = require('uuid')
const mailService = require('../services/mail-service')
const UserDto = require('../dtos/user-dto')

const {Actions} = require('../global/enums')
const {Roles} = require('../global/enums')

export class UserService{

    async changeImg(user : UserI, fileName : string){
        const candidate =await User.findOne({where : {id: user.id}});
        if (!candidate){
            throw ApiError.BadRequest("User not found")
        }

        candidate.photo = fileName;
        await candidate.save();
        return fileName;
    }


    async changeEmail(email: string, user: UserI) {
        const userDuplicate: UserI| null = await User.findOne({where : {email: email}});
        if (userDuplicate){
            throw ApiError.BadRequest("User with such email already exists")
        }

        const candidate: UserI| null = await User.findOne({where : {id: user.id}});
        if (!candidate){
            throw ApiError.BadRequest("User not found")
        }

        candidate.email = email;
        const activationLink = uuid.v4();
        candidate.activationLink = activationLink;
        candidate.isActivated = false;
        await candidate.save();
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
    }

    async getUser(id: string) {
        const candidate: UserI| null = await User.findOne({where : {id: id}});
        if (!candidate){
            throw ApiError.BadRequest("User not found")
        }
        return new UserDto(candidate);
    }

    async banUnbanUser(userId: number, reason: string) {
        const candidate: UserI| null = await User.findOne({where: {id: userId}});
        if(!candidate){
            throw ApiError.BadRequest("Such user does not exists");
        }
        if(candidate.roleId.toString() == Roles.ADMIN){
            throw ApiError.BadRequest("Admin can not ban admin");
        }

        candidate.isBanned = !candidate.isBanned;
        await candidate.save();
        let action = candidate.isBanned ? Actions.BAN : Actions.UNBAN;

        await Comment.create({userId, action: action, reason: reason});
    }

}

module.exports = new UserService();
