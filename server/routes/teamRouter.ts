import {Router} from "express";
const router = Router();
const teamController = require('../controllers/team-controller')
const authMiddleware = require('../middleware/auth-middleware')
import {body} from "express-validator";


//TODO: Login middleware for player


module.exports = router
