import {errorMongo} from "../index";

const request_logs = require('../models/request_logs.model')
import { NextFunction, Request, Response } from "express";
const ApiError = require('../exeptions/api-error')

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        if (!errorMongo){
            const request = request_logs.create({
                path: req.path,
                params: {...req.body},
            });
        }
        next();
    } catch (e) {
        console.log(e)
        if (e instanceof ApiError)
            next(e);
        else
            next(new ApiError(500, "Logger error"));
    }
}