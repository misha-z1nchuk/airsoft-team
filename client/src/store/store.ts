import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import Redirect  from "react-router-dom";
// @ts-ignore
import { useNavigate } from 'react-router-dom';

export default class Store{
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean){
        this.isAuth = bool
    }

    setUser(user: IUser){
        this.user = user;
    }

    setLoading(bool: boolean){
        this.isLoading = bool;
    }

    async login(email: string, password: string){
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            console.log(e)
        }
    }

    async registration(first_name: string, last_name: string, email: string, password: string, role: string){
        try {
            const response = await AuthService.registration(first_name, last_name, email, password, role);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            console.log(e)
        }
    }


    async logout(){
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }catch (e){
            console.log(e)
        }
    }


    async checkAuth(){
        this.isLoading = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            console.log(e)
        }finally {
            this.isLoading = false;
        }
    }

    async googleAuth(){
        this.isLoading = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            if (response){
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
            }
        }catch (e){
            console.log(e)
        }
    }




}