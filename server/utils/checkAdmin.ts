import {UserI} from "../global/types";
import {Roles} from "../global/roles";
const ApiError = require('../exeptions/api-error')

const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
export async function checkAdmin(authorizationHeader: string, role: string){
    const accessToken = authorizationHeader.split(' ')[1];
    const user_id: number = jwt.decode(accessToken).id

    const candidate : UserI|null = await User.findOne({where : {id: user_id}});
    if (!candidate){
        throw ApiError.BadRequest('User not found')
    }
    if (candidate.roleId.toString() !== role){
        throw ApiError.UnauthorizedError('Forbidden');
    }
 }