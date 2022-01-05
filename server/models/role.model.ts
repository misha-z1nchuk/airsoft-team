import {UserI} from "../global/types";
import {and} from "sequelize";
import {Not} from "sequelize-typescript";
import Notification from "./notification.model";
const User = require('./user.model')
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Role = sequelize.define("role", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING
        }

    },{
        freezeTableName: true,
        timestamps: false,
    }
);

Role.hasMany(Notification)
Notification.belongsTo(Role, {as: 'recipientRole'})



export default Role
module.exports = Role;