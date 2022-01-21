import {UserI} from "../global/types";
import Comment from "../models/comment";
const tokenService = require("./token-service");

const User = require('../models/user.model')
const ApiError = require('../exeptions/api-error')
const mailService = require('../services/mail-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')

const {Actions} = require('../global/enums')
const {Roles} = require('../global/enums')
const jwt = require('jsonwebtoken')

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

        const secret = process.env.JWT_CHANGE_EMAIL_SECRET + candidate.password

        const token = tokenService.generateForgotPasswordToken({id: user.id, email: email}, secret);
        const link = `${process.env.API_URL}/api/user/confirm-mail-changing/${token}`;
        await mailService.sendChangeMailLink(email, link)
    }

    async confirmChangeEmail(token: string) {
        token = token.trim();
        const {id, email} = jwt.decode(token);
        const candidate = await User.findOne({where: {id: id}});
        if(!candidate){
            throw ApiError.BadRequest("User error");
        }
        const secret = process.env.JWT_CHANGE_EMAIL_SECRET + candidate.password;
        const isValid = tokenService.validateSomeToken(token, secret)
        if(!isValid){
            throw ApiError.BadRequest(`Not valid request`);
        }

        candidate.email = email
        await candidate.save();
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

    async changePassword(oldPassword: string, newPassword: string, user: UserI) {
        const candidate: UserI| null = await User.findOne({where: {id: user.id}});
        if(!candidate){
            throw ApiError.BadRequest("Such user does not exists");
        }

        const issPassEquals = await bcrypt.compare(oldPassword, candidate.password)
        if (!issPassEquals){
            throw ApiError.BadRequest(`Password is incorrect`);
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        candidate.password = hashedPassword;
        candidate.save();
    }
}

module.exports = new UserService();
