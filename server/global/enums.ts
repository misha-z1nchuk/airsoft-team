enum Status{
    BANED = "BANNED",
    UNBANED = "UNBANNED",
}

enum Roles{
    PLAYER = "1",
    MANAGER = "2",
    ADMIN = "3"
}

enum Actions {
    BAN = "BAN",
    UNBAN = "UNBAN",
    KICK = "KICK"
}

module.exports = {
    Status,
    Roles,
    Actions,
}
