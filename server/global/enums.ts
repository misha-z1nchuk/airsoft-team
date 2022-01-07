enum Status{
    BANED = "BANNED",
    UNBANED = "UNBANNED",
}

enum Roles{
    PLAYER = "1",
    MANAGER = "2",
    ADMIN = "3"
}

module.exports = {
    Status,
    Roles
}