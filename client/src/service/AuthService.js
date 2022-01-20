import $api from "../http";

export default class AuthService{
    static async login(email, password){
        return $api.post('auth/login', {email, password})
    }

    static async registration(first_name, last_name, email, password, roleId) {
        return $api.post('auth/registration', {first_name, last_name, email, password, roleId})
    }

    static async logout(){
        return $api.post('auth/logout')
    }

    static async forgotPassword(new_email){
        return $api.post('auth/forgot-password', {email: new_email})
    }

    static async resetPassword(password, token){
        return $api.post(`auth/reset-password/${token}`, {new_password: password})
    }
}
