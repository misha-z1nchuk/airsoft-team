'use strict';
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('role', [
            {
                name: 'PLAYER'
            },
            {
                name: 'MANAGER'
            },
            {
                name: 'ADMIN'
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.query('DELETE FROM "role"');
    }
};