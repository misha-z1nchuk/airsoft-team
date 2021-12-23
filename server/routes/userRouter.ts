import {Router} from "express";
const router = Router();
const userController = require('../controllers/user-controller')
import {body} from "express-validator";
import Token from "../models/token.model";
import Role from "../models/role.model";
const authMiddleware = require('../middleware/auth-middleware')
const passport = require('../config/passport')


router.get('/get-users', authMiddleware, userController.getUsers)

module.exports = router
