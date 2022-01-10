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

enum Teams{
    A = 1,
    B = 2,
}

module.exports = {
    Status,
    Roles,
    Actions,
    Teams
}
