import {ResponseTokens} from "../global/responses/reg-log-response";

const jwt = require('jsonwebtoken')
import Token from '../models/token.model'

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

    validateAccessToken(token: any): Object|null{
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        }catch (e){
            return null;
        }
    }

    validateRefreshToken(token: any): Object|null{
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        }catch (e){
            return null
        }
    }

    async saveToken(userId: number, refreshToken: string): Promise<Token>{
        const tokenData = await Token.findOne({where: {userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }

        const token = await Token.create({userId : userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken: any): Promise<number>{
        return await Token.destroy({where: {refreshToken}});
    }

    async findToken(refreshToken: any): Promise<Token|null> {
        return await Token.findOne({where: {refreshToken}});
    }
}

module.exports = new TokenService()