import {UserI} from "../global/types";
const ApiError = require('../exeptions/api-error')

export async function checkRole(user: UserI, role: string){
    if (user.roleId.toString() !== role){
        throw ApiError.UnauthorizedError('Forbidden');
    }
 }