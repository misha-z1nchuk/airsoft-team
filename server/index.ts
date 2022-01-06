import path from "path";
require('dotenv').config()
import express, { Application, Request, Response } from "express";
import {log} from "util";
import {Socket} from "net";
const router = require('./routes/index')
const sequelize = require('./config/db')
const userModel = require('./models/user.model')
const tokenModel =require('./models/token.model')
const teamModel =require('./models/team.model')
const requestModel =require('./models/request.model')
const roleModel =require('./models/role.model')
const notificationModel =require('./models/notification.model')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')
const passport = require('./config/passport')
const events = require('events')
const fileUpload = require('express-fileupload')
const ws = require('ws')

const PORT = process.env.PORT || 5000
const app: Application = express();

export const emitter = new events.EventEmitter();
const http = require('http').Server(app);
export const io = require('socket.io')(http);

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


io.sockets.on('connection', function(socket:any) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room:any) {
        socket.join(room);
    });
});

let room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');

// app.get('/connect', (req: Request, res:Response) => {
//     res.writeHead(200, {
//         'Connection': 'keep-alive',
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//     })
//     emitter.on('NewNotification', (message: any) => {
//         res.write(`data: ${JSON.stringify(message)} \n\n`)
//     })
// })

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