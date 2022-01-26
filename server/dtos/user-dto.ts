import {UserI} from "../global/types";



module.exports = class UserDto{
    email: string;
    id: number | undefined;
    isActivated: boolean;
    photo: string;
    roleId: number;
    teamId: number | null
    isBanned: boolean
    constructor(model: UserI) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.photo = model.photo;
        this.roleId = model.roleId;
        this.teamId = model.teamId;
        this.isBanned = model.isBanned;
    }
}