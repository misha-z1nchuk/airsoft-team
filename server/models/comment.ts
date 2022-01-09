import User from "./user.model";


const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const Comment = sequelize.define("comment", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        action: {
          type: DataTypes.STRING
        },
        reason: {
            type: DataTypes.STRING,
            required: true
            },


    },{
        freezeTableName: true,
        timestamps: false,
    }
);

User.hasMany(Comment);
Comment.belongsTo(User);

export default Comment;
module.exports = Comment;