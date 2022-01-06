import {UserI} from "../global/types";
import {and} from "sequelize";
import {Not} from "sequelize-typescript";
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





export default Role
module.exports = Role;