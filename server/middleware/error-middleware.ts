import {NextFunction} from "express";

const ApiError = require("../exeptions/api-error")

module.exports = function (err: any, req: Request, res: Response, next: NextFunction){
    console.log(err)
    if (err instanceof ApiError){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
}