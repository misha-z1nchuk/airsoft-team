require('dotenv').config({path: "../.env"})
const { Sequelize } = require('sequelize');

let DB_NAME = process.env.DB_NAME
if (process.env.NODE_ENV == 'test'){
    DB_NAME = process.env.TEST_DB_NAME
}
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST =  process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

module.exports = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT
});
