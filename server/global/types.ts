import User from "../models/user.model";


export interface UserI{
    id?: number | null
    first_name: string
    last_name: string
    email: string
    password: string
}


export interface TeamI{
    id?: number | null
    team_name: string
    players: User[]
}

