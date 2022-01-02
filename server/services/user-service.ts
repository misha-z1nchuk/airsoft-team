import User from "../models/user.model";
const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/api-error')

export class UserService{

    async getAllUsers(): Promise<User[]>{
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
