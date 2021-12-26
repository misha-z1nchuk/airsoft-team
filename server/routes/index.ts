import {Router} from "express";
const router =  Router()

const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const teamRouter = require('./teamRouter')
const requestRouter = require('./requestRouter')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/team', teamRouter)
router.use('/request', requestRouter)



module.exports = router