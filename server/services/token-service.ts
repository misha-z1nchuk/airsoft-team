import {ResponseTokens} from "../global/responses/reg-log-response";
import {TokenI} from "../global/types";

const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')

require('dotenv').config()


class TokenService{
    generateToken(payload: string) : ResponseTokens{
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    generateForgotPasswordToken(payload: string, secret: string){
        return jwt.sign(payload, secret, {expiresIn: '15m'})
    }


    validateSomeToken(token: string, secret: string): Object|null{
        try {
            return jwt.verify(token, secret)
        }catch (e){
            return null;
        }
    }


    validateAccessToken(token: string): Object|null{
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        }catch (e){
            return null;
        }
    }

    validateRefreshToken(token: string): Object|null{
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        }catch (e){
            return null
        }
    }

    async saveToken(userId: number, refreshToken: string): Promise<TokenI>{
        const tokenData = await Token.findOne({where: {userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }

        return await Token.create({userId: userId, refreshToken});
    }

    async removeToken(refreshToken: string): Promise<number>{
        return await Token.destroy({where: {refreshToken}});
    }

    async findToken(refreshToken: string): Promise<TokenI|null> {
        return await Token.findOne({where: {refreshToken}});
    }
}

module.exports = new TokenService()