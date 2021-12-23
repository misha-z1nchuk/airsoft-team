import User from "../models/user.model";


export class UserService{

    async getAllUsers(): Promise<User[]>{
        return await User.findAll();
    }

}

module.exports = new UserService();
