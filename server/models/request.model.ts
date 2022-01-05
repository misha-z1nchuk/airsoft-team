import {UserI} from "../global/types";
import {and} from "sequelize";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Request = sequelize.define("request", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        author_id:{
            type: DataTypes.INTEGER
        },
        action: {
            type: DataTypes.STRING
        },
        teamId: {
            type: DataTypes.INTEGER
        }
    },{
        freezeTableName: true,
        timestamps: false,
    }
);


export default Request
module.exports = Request;