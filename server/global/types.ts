import {Mode} from "fs";
const {Actions} = require('./enums')
const User = require("../models/user.model");
import { Model } from "sequelize";

export interface UserI extends Model{
    id?: number | null,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    roleId: number,
    teamId: number | null,
    isActivated: boolean,
    activationLink: string,
    photo: string,
    isBanned : boolean
}


export interface TokenI extends Model{
    id?: number | null
    userId: number,
    isActivated: boolean,
    refreshToken: string
}


export interface RequestI extends Model{
    id?: number | null
    userId: number,
    action: string,
    teamId: number
}
export interface TeamI extends Model{
    id?: number | null
    team_name: string
    players: UserI[]

}

export interface NotificationI extends Model{
    id?: number | null
    text: string
    recipient_role: number
}

export interface CommentI extends Model{
    id?: number | null;
    userId: number;
    action: Actions;
    reason: string;
}


