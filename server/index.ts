import path from "path";
require('dotenv').config()
import express, { Application} from "express";
import {Socket} from "socket.io";
const http = require("http");
const router = require('./routes/index')
const sequelize = require('./config/db')
const userModel = require('./models/user.model')
const tokenModel =require('./models/token.model')
const teamModel =require('./models/team.model')
const requestModel =require('./models/request.model')
const roleModel =require('./models/role.model')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')
const passport = require('./config/passport')
const events = require('events')
const fileUpload = require('express-fileupload')
const socketIo = require('socket.io')
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
const server = http.Server(app);
server.listen(PORT, () => {
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

export const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
})
io.sockets.on('connection', function(socket: Socket) {
    socket.on('role', function(role: string) {
        socket.join(role);
    });
});



