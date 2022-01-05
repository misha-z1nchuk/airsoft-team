'use strict';
const { INTEGER, STRING } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('role', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                onDelete: 'cascade'
            },
            name: {
                type: STRING
            }

        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('role');
    }
};