'use strict';
const { INTEGER, STRING } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('team', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                onDelete: 'cascade'
            },
            team_name: {
                type: STRING,
                allowNull: false
            }

        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('team');
    }
};