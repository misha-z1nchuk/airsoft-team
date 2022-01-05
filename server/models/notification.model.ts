import {UserI} from "../global/types";
import {and} from "sequelize";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Notification = sequelize.define("notification", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING
        },
        recipient_role: {
            type: DataTypes.INTEGER
        },

    },{
        freezeTableName: true,
        timestamps: false,
    }
);


export default Notification
module.exports = Notification;