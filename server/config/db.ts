import path from "path";
import {DataTypes} from "sequelize";
import * as fs from "fs";

require('dotenv').config({path: "../.env"})
const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST =  process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

module.exports = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT
});



// declare var process : {
//     env: {
//         DB_NAME: string,
//         DB_USER: string,
//         DB_PASSWORD: string,
//         DB_HOST: string,
//         DB_PORT: string,
//         SECRET_KEY: string,
//         DB_DIALECT: string,
//     }
// }
//
// const DB_NAME = process.env.DB_NAME
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_HOST =  process.env.DB_HOST
//
// export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'postgres',
//     models: []
// });
//
// sequelize.addModels([User, Team, Token, Role, Request, Notification])