const User = require("../models/user.model");
import { Model } from "sequelize";

export interface UserI extends Model{
    id?: number | null,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: number,
    teamId: number,
    isActivated: boolean,
    activationLink: string,
    photo: string
}


export interface TokenI extends Model{
    id?: number | null
    userId: number,
    isActivated: boolean,
    refreshToken: string
}

export interface RequestI extends Model{
    id?: number | null
    author_id: number,
    action: string,
    team_id: number
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



