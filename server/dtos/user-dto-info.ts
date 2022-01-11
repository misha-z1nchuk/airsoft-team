import {UserI} from "../global/types";

const UserDto = require('./user-dto')

module.exports = class UserInfoDto extends UserDto{
    first_name: string;
    last_name: string;
    constructor(model: UserI) {
        super(model);
        this.first_name = model.first_name;
        this.last_name = model.last_name;
    }

}