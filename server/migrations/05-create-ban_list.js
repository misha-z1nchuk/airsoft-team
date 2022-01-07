'use strict';
const { INTEGER, STRING, BOOLEAN } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ban_list', {
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
            reason: {
                type: STRING,
                required: true
            }

        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ban_list');
    }
};