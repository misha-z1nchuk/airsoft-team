import Request from "../models/request.model";

const User = require("../models/user.model");
import {ResponseRegLogI} from "../global/responses/reg-log-response";
import {checkBanned} from "../utils/checkBanned";
import {RequestResponse} from "../global/types";
const {Roles} = require("../global/enums");
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exeptions/api-error')


export class AuthService{
    async registration(first_name: string, last_name: string, email: string, password: string, role: string): Promise<ResponseRegLogI|RequestResponse> {
        let candidate = await User.findOne({where: {email: email}});
        if (candidate){
            throw ApiError.BadRequest(`User with such email ${email} exists`);
        }


        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const activationLink = uuid.v4()
        const user = await User.create({first_name, last_name, email,password: hashedPassword, roleId: role, activationLink})

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

        const userDto = new UserDto(user);

        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        if (role == '2'){
            let request =  await Request.create({userId: user.id, action: "REGISTRATION MANAGER"})
            return {message: "Admin will review your registration", request}
        }
        return{
            ...tokens,
            user: userDto
        }
    }


    async activate(activationLink: string) : Promise<void>{
        let user = await User.findOne({where: {activationLink}})
        if (!user){
            throw ApiError.BadRequest("Incorrect link of activation")
        }
        user.isActivated = true;
        await user.save();
    }


    async login(email: any, password: any): Promise<ResponseRegLogI> {
        let user: any = await User.findOne({where: {email}});
        if (!user){
            throw ApiError.BadRequest(`User with such email ${email} not found`);
        }
        if (user.roleId == Roles.MANAGER){
            let request = await Request.findOne({where: {userId: user.id}})
            if (request){
                throw ApiError.BadRequest(`Your registration is not confirmed yet`);
            }
        }
        await checkBanned(user.id);

        const issPassEquals = await bcrypt.compare(password, user.password)
        if (!issPassEquals){
            throw ApiError.BadRequest(`Password is incorrect`);
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }
    }


    async logout(refreshToken: any){
        return await tokenService.removeToken(refreshToken);
    }

    async forgotPassword(email: string) {
        const candidate = await User.findOne({where: {email}})
        if (!candidate){
            throw ApiError.BadRequest(`User with such email ${email} not found`);
        }
        const secret = process.env.JWT_FORGOT_PASSWORD_SECRET + candidate.password
        const userDto = new UserDto(candidate);

        const token = tokenService.generateForgotPasswordToken({...userDto}, secret);
        const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
        await mailService.sendForgotPasswordLink(email, link)

        return token
    }

    async resetPassword(token: string, new_password: string) {

        const user_id: number = jwt.decode(token).id

        const candidate = await User.findOne({where: {id: user_id}})
        if (!candidate){
            throw ApiError.BadRequest(`User not found`);
        }

        const secret = process.env.JWT_FORGOT_PASSWORD_SECRET + candidate.password
        const isValid = tokenService.validateSomeToken(token, secret)
        if(!isValid){
            throw ApiError.BadRequest(`Not valid request`);
        }


        const salt = await bcrypt.genSalt();
        candidate.password = await bcrypt.hash(new_password, salt)
        await candidate.save();
        return 1
    }


    async refresh(refreshToken: any): Promise<ResponseRegLogI> {
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb  = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);

        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{...tokens, user: userDto}
    }



}

module.exports = new AuthService();
