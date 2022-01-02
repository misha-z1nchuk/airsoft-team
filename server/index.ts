import path from "path";

require('dotenv').config()
import express, { Application, Request, Response } from "express";
const router = require('./routes/index')
import {sequelize} from "./config/db";
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')
const passport = require('./config/passport')
const events = require('events')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000
const app: Application = express();

export const emitter = new events.EventEmitter();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(fileUpload({}))
app.use('/api', router)
app.use(passport.initialize());
app.use(errorMiddleware)

app.get('/connect', (req: Request, res:Response) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    emitter.on('newMessage', () => {
        res.write(`data: \n`)
    })
})

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