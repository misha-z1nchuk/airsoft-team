import Token from "../models/token.model";

require('dotenv').config({path: "../.env"})
import {Sequelize} from "sequelize-typescript"
import User from "../models/user.model";
import Team from "../models/team.model";
import Role from "../models/role.model";
import Request from "../models/request.model";



declare var process : {
    env: {
        DB_NAME: string,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_HOST: string,
        DB_PORT: string,
        SECRET_KEY: string,
        DB_DIALECT: string,
    }
}

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST =  process.env.DB_HOST

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    models: []
});

sequelize.addModels([User, Team, Token, Role, Request])