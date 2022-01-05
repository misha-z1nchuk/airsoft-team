'use strict';
const { INTEGER, STRING } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('request', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                onDelete: 'cascade'
            },
            author_id:{
                type: INTEGER
            },
            action: {
                type: STRING
            },
            team_id: {
                type: INTEGER
            }

        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('request');
    }
};