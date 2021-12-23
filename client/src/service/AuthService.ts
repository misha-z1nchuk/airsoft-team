import $api from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('auth/login', {email, password})
    }

    static async registration(first_name: string, last_name: string, email: string, password: string, role: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('auth/registration', {first_name, last_name, email, password, role})
    }

    static async logout(): Promise<void>{
        return $api.post('auth/logout')
    }

}
