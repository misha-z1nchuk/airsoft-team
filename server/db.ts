import {Sequelize} from "sequelize-typescript"

export const sequelize = new Sequelize('airsoft-team', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + '/models']
});