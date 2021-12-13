import {UserI} from "../types";

export interface ResponseRegLogI{
    accessToken: string;
    refreshToken: string;
    user: UserI;
}

export interface ResponseTokens{
    accessToken: string;
    refreshToken: string;
}