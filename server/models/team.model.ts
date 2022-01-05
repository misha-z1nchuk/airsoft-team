import {UserI} from "../global/types";
import {and} from "sequelize";
import Request from "./request.model";
const User= require('./user.model')
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Team = sequelize.define("team", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{
        freezeTableName: true,
        timestamps: false,
    }
);

Team.hasMany(User)
User.belongsTo(Team)

Team.hasMany(Request)
Request.belongsTo(Team)


export default Team
module.exports = Team;