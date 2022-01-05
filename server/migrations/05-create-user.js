'use strict';
const { INTEGER, STRING, BOOLEAN } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                onDelete: 'cascade'
            },
            first_name:{
                type: STRING,
                allowNull: false
            },
            last_name:{
                type: STRING,
                allowNull: false
            },
            email: {
                type: STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: STRING,
                allowNull: false
            },
            role_id: {
                type: INTEGER,
                allowNull: false
            },
            isActivated: {
                type: BOOLEAN,
                defaultValue: false
            },
            activationLink: {
                type: STRING
            },
            photo:{
                type: STRING
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user');
    }
};