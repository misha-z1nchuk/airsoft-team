require('dotenv').config()
import express, { Application, Request, Response } from "express";
const router = require('./routes/index')
import db from './models/user.model'
import {sequelize} from "./config/db";
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')

const PORT = process.env.PORT || 5000
const app: Application = express();



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)
app.use(errorMiddleware)


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