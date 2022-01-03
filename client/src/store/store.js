import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import UserService from "../service/UserService";


export default class Store{
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
            console.log(e)
        }
    }

    async registration(first_name, last_name, email, password, role){
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
            this.setUser({});
        }catch (e){
            console.log(e)
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
            console.log(e)
        }finally {
            this.isLoading = false;
        }
    }

    async googleAuth(){
        window.open('http://localhost:5000/api/auth/google', 'google','width=800,height=600,status=0,toolbar=0');
    }

    async changePhoto(photo){
        try {
            const response = await UserService.changePhoto(photo);
        }catch (e){
            console.log(e)
        }
    }




}