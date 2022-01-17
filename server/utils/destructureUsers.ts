import {UserI} from "../global/types";
const extendUserDto = require('../dtos/user-dto-info')

export function destructureUsers(usersArray: UserI[]){
    let users: UserI[] = [];

    usersArray.map((user: UserI) => {
        let userToAdd = new extendUserDto(user);
        users.push(userToAdd);
    })
    return users;
}