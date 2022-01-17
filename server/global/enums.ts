
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

enum RequestActions {
    JOIN = "JOIN",
    QUIT = "QUIT",
    REGISTRATION_MANAGER = "REGISTRATION MANAGER",
    SWITCH = "SWITCH"
}

module.exports = {
    Roles,
    Actions,
    Teams,
    RequestActions
}
