import { Request, Response, NextFunction } from 'express';
import User from "../models/user.model";
import {registrationValidation} from "../middleware/registrationValidation";
const validationReg = new registrationValidation();


export interface UserI{
    id?: number | null
    first_name: string
    last_name: string
    email: string
    password: string
}


const registration = async (req: Request, res: Response, next: NextFunction) => {
    let person;
    try{
        person = await User.create(req.body);
        await person.save()
    }catch (e){
        return res.status(400).json({
            message: "Error Registration! You must specify all the rows"
        });
    }

    return res.status(200).json({
        message: person
    });
};



export default { registration };