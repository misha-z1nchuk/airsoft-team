import {Router} from "express";
const router = Router();
const requestController = require('../controllers/request-controller')
const ensureRole = require('../middleware/auth-role-middleware')
const {Roles} = require('../global/enums')
import {body} from "express-validator";


router.get('/', ensureRole([Roles.PLAYER]), requestController.getRequestByAuthor)
router.post('/join-team',
    [
        body('teamId').isNumeric()
    ],
    ensureRole([Roles.PLAYER]), requestController.joinTeam)

router.post('/quit-team', ensureRole([Roles.PLAYER]), requestController.quitFromTeam)
router.post('/change-team', ensureRole([Roles.PLAYER]), requestController.changeTeam)
router.post('/accept/:id', ensureRole([Roles.MANAGER, Roles.ADMIN]), requestController.accept)
router.post('/decline/:id', ensureRole([Roles.PLAYER, Roles.MANAGER]), requestController.decline)



module.exports = router
