import path from "path";
require('dotenv').config()
import express, { Application} from "express";
import {Socket} from "socket.io";
import mongoose from "mongoose";
import {loggerMiddleware} from "./middleware/logger-middleware";
const http = require("http");
const router = require('./routes/index')


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
export let errorMongo = false;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(loggerMiddleware)
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(fileUpload({}))
app.use('/api', router)
app.use(passport.initialize());
app.use(errorMiddleware)





const server = http.Server(app);
server.listen(PORT, async () => {
    console.log(`App runing at ${PORT} port`)
    try {

        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.raz8v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        // console.log(mongoose.connection.readyState)
    }catch (e){
        console.log(e)
        errorMongo = true;
    }
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


module.exports = server
