'use strict';
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('team', [
            {
                team_name: 'A'
            },
            {
                team_name: 'B'
            }
        ]);
    },


    down: async (queryInterface) => {
        await queryInterface.sequelize.query('DELETE FROM "team"');
    }
};

