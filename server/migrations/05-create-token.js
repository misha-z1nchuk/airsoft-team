'use strict';
const { INTEGER, STRING, BOOLEAN } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('token', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                onDelete: 'cascade'
            },
            userId: {
                type: INTEGER,
                references:{
                    model: 'user',
                    key: 'id',
                }
            },
            isActivated: {
                type: BOOLEAN,
                defaultValue: false
            },
            refreshToken: {
                type: STRING(500)
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('token');
    }
};