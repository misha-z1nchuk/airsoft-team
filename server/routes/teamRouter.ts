import {Router} from "express";
const router = Router();
const teamController = require('../controllers/team-controller')
const authMiddleware = require('../middleware/auth-middleware')
import {body} from "express-validator";
const ensureRole = require('../middleware/auth-role-middleware')
const {Roles} = require('../global/enums')


router.get('/:id', authMiddleware, teamController.getTeamUsers)
router.get('/', authMiddleware, teamController.getAllUsersFromTeams)
router.post('/kick', [
    body('userId').isNumeric(),
    body('reason').isString()
],  ensureRole([Roles.MANAGER, Roles.ADMIN]), teamController.kickUser)

module.exports = router
