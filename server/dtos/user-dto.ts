const User = require("../models/user.model");


module.exports = class UserDto{
    email: string;
    id: number;
    isActivated: boolean;
    photo: string;
    roleId: number;
    teamId: number
    constructor(model: any) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.photo = model.photo;
        this.roleId = model.roleId;
        this.teamId = model.teamId;
    }
}