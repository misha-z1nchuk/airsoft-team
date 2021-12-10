const jwt = require('jsonwebtoken')
import Token from '../models/token.model'
require('dotenv').config()


class TokenService{
    generateToken(payload: string){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string){
        const tokenData = await Token.findOne({where: {userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }

        const token = await Token.create({userId : userId, refreshToken})
        return token;
    }
}

module.exports = new TokenService()