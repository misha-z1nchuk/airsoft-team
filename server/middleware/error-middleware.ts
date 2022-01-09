import { NextFunction, Request, Response } from 'express';
const error_logs = require('../models/error_logs.model')
const ApiError = require("../exeptions/api-error")

module.exports = function (err: any, req: Request, res: Response, next: NextFunction){
    if (err instanceof ApiError){
        console.log(err)
        const errorInstance = error_logs.create({
            path: req.path,
            params: { ...req.body },
            errorDescription: err.message,
            status : err.status,
        });

        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log(err)
    const errorInstance = error_logs.create({
        path: req.path,
        params: { ...req.body },
        errorDescription: "Unexpected error",
        status : err.status,
    });
    return res.status(500).json({message: "Unexpected error"})


}