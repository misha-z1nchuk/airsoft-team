import User from "../models/user.model";

module.exports = class UserDto{
    email: string;
    id: number;
    isActivated: boolean;
    photo: string;
    role: number
    constructor(model: any) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.photo = model.photo;
        this.role = model.role;
    }
}