import {UserI} from "../global/types";
import {and} from "sequelize";
const Role = require("./role.model");
const Token = require('./token.model')
const Request = require('./request.model')
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        activationLink: {
            type: DataTypes.STRING
        },
        photo:{
            type: DataTypes.STRING
        }

    },{
        freezeTableName: true,
        timestamps: false,
    }
);


User.hasOne(Token)
Token.belongsTo(User, {foreignKey: 'userId'})


User.hasMany(Request)
Request.belongsTo(User, {foreignKey: 'author_id'})

Role.hasMany(User)
User.belongsTo(Role, {foreignKey: 'role_id'})


module.exports = User;