import { NextFunction, Request, Response } from 'express';
import {errorMongo} from "../index";
const error_logs = require('../models/error_logs.model')
const ApiError = require("../exeptions/api-error")

module.exports = function (err: any, req: Request, res: Response, next: NextFunction){
    try {
        if (err instanceof ApiError){
            if (!errorMongo){
                console.log("eeeeeeeeeeeeeeeeeeeeeeeeee")
                const errorInstance = error_logs.create({
                    path: req.path,
                    params: { ...req.body },
                    errorDescription: err.message,
                    status : err.status,
                });
            }
            return res.status(err.status).json({message: err.message, errors: err.errors})
        }
        if (!errorMongo){
            const errorInstance = error_logs.create({
                path: req.path,
                params: { ...req.body },
                errorDescription: "Unexpected error",
                status : err.status,
            });
        }
        console.log(err)
        return res.status(500).json({message: "Unexpected error"})
    }catch (e){
        next();
    }
}