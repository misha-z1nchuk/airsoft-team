import {UserI} from "../global/types";
import {and} from "sequelize";
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
User.belongsTo(Team, {foreignKey: 'team_id'})

export default Team
module.exports = Team;