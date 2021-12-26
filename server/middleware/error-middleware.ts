import {NextFunction, Response} from "express";
import {log} from "util";

const ApiError = require("../exeptions/api-error")

module.exports = function (err: any, req: Request, res: Response, next: NextFunction){
    if (err instanceof ApiError){
        console.log(err)
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log(err)
    return res.status(500).json({message: "Unexpected error"})
}