'use strict';
const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface) => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)
        await queryInterface.bulkInsert('user', [
            {
                first_name: 'ADMIN',
                last_name: "ADMIN",
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                roleId: "3"
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`DELETE FROM "user" where "user"."email"='${process.env.ADMIN_EMAIL}'`);
    }
};