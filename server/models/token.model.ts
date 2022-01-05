import {UserI} from "../global/types";
import {and} from "sequelize";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Token = sequelize.define("token", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    refreshToken: {
        type: DataTypes.STRING(500)
    }
    },{
        freezeTableName: true,
        timestamps: false,
    }
);


module.exports = Token;