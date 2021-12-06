import User from "../models/user.model";
import {equal} from "assert";
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

export class UserService{
    async registration(first_name: string, last_name: string, email: string, password: string, role: string){
        let candidate = await User.findOne({where: {email}});
        if (candidate){
            throw new Error(`User with such email ${email} exists`);
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const activationLink = uuid.v4()

        const user = await User.create({first_name, last_name, email,password: hashedPassword, role, activationLink})
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();
