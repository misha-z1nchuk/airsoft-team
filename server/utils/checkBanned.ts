import Comment from "../models/comment";
import User from "../models/user.model";
import {CommentI, UserI} from "../global/types";
const {Status} = require("../global/enums");
const {Actions} = require('../global/enums')
const ApiError = require('../exeptions/api-error')

export async function checkBanned(userId: number){
    const candidate: UserI = await User.findOne({where: {id: userId}});
    if (candidate.isBanned){
        let comment: CommentI | null= await Comment.findOne({where: {userId: userId}});
        if (!comment){
            throw ApiError.BadRequest('User is banned, reason is not assigned')
        }
        if(comment.action == Actions.BAN){
            throw ApiError.BadRequest(`User is banned, reason: ${comment.reason}`);
        }
        throw ApiError.BadRequest('User is banned, reason is not assigned')
    }
}