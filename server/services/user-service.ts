const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const ApiError = require('../exeptions/api-error')
import Request from '../models/request.model'
export class UserService{

    async getAllUsers(): Promise<typeof User[]>{
        return await User.findAll();
    }




    async changeImg(token : string, fileName : string){
        const accessToken = token.split(' ')[1];
        const user_id: number = jwt.decode(accessToken).id

        const candidate =await User.findOne({where : {id: user_id}});
        if (!candidate){
            throw ApiError.BadRequest("User not found")
        }

        candidate.photo = fileName;
        await candidate.save();
        return fileName;
    }

}

module.exports = new UserService();
