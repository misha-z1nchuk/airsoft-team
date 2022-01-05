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
            recipientRoleId: {
                type: INTEGER,
                references: {
                    model: 'role',
                    key: 'id'
                }
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('notification');
    }
};