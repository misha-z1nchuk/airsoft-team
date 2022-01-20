import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import UserService from "../service/UserService";


export default class UserStore {
    user = {};
    isAuth = false;
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool
    }

    setUser(user){
        this.user = user;
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    async login(email, password){
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }

    async registration(first_name, last_name, email, password, role){
        try {
            const response = await AuthService.registration(first_name, last_name, email, password, role);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }


    async logout(){
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }


    async checkAuth(){
        this.isLoading = true;
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            console.log(e.response?.data?.message)
        }finally {
            this.isLoading = false;
        }
    }

    async googleAuth(){
        window.open('http://localhost:5000/api/auth/google', 'google','width=800,height=600,status=0,toolbar=0');
    }

    async changePhoto(photo){
        try {
            await UserService.changePhoto(photo);
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }

    async forgotPassword(new_email){
        try {
            await AuthService.forgotPassword(new_email)
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }


    async resetPassword(password, token){
        try {
            let res = await AuthService.resetPassword(password, token)
            return res.status
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }

    async changeMail(email){
        try {
            let res = await UserService.changeMail(email)
            return res.status
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }
}