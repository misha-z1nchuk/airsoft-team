require('dotenv').config()
import express, { Application, Request, Response } from "express";
const router = require('./routes/index')
import {sequelize} from "./db";

const PORT = process.env.PORT || 5000
const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)


app.listen(PORT, () => {
    console.log(`App runing at ${PORT} port`)
    sequelize.authenticate().then(async() => {
        console.log("database connected")

        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})