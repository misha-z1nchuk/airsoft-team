'use strict';
const { INTEGER, STRING } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('notification', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                onDelete: 'cascade'
            },
            text: {
                type: STRING
            },
            recipient_role: {
                type: INTEGER
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('notification');
    }
};