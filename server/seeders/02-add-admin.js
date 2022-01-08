'use strict';
const authService = require('./../../server/services/auth-service');

module.exports = {
    up: async (queryInterface) => {


        await authService.registration(
            "ADMIN",
            "ADMIN",
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASSWORD,
            "3");
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`DELETE FROM "user" where "user"."email"='${process.env.ADMIN_EMAIL}'`);
    }
};