import {Router} from "express";
const router = Router();
const teamController = require('../controllers/team-controller')
const authManagerAdminMiddleware = require('../middleware/auth-manager-admin-middleware')
const authMiddleware = require('../middleware/auth-middleware')
import {body} from "express-validator";


router.get('/:id', authMiddleware, teamController.getTeamUsers)
router.get('/', authMiddleware, teamController.getAllUsersFromTeams)
router.post('/kick', authManagerAdminMiddleware, teamController.kickUser)

module.exports = router
