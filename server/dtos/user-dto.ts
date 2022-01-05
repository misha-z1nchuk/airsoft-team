const User = require("../models/user.model");


module.exports = class UserDto{
    email: string;
    id: number;
    isActivated: boolean;
    photo: string;
    role_id: number;
    team: number
    constructor(model: any) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.photo = model.photo;
        this.role_id = model.role_id;
        this.team = model.team_id;
    }
}