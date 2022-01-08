import {Router} from "express";
import {emitter} from "../index";
const router =  Router()

const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const teamRouter = require('./teamRouter')
const requestRouter = require('./requestRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/team', teamRouter)
router.use('/request', requestRouter)
router.use('/admin', adminRouter)

module.exports = router