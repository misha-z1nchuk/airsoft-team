'use strict';

module.exports = {
    up: async (queryInterface) => {
        let res = await queryInterface.bulkInsert('user', [
            {
                first_name: 'ADMIN',
                last_name: "ADMIN",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                roleId: "3"
            }
        ]);
        console.log(res)
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`DELETE FROM "user" where "user"."email"='${process.env.ADMIN_EMAIL}'`);
    }
};