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
            userId:{
                type: INTEGER,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            action: {
                type: STRING
            },
            teamId: {
                type: INTEGER,
                references: {
                    model: 'team',
                    key: 'id'
                }
            }

        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('request');
    }
};