import Request from "./request.model";
const {Status} = require("../global/enums");


const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const BanList = sequelize.define("ban_list", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reason: {
            type: DataTypes.STRING,
            required: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: Status.BANED
        }

    },{
        freezeTableName: true,
        timestamps: false,
    }
);

export default BanList;
module.exports = BanList;