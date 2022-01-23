import {Router} from "express";
const router = Router();
const requestController = require('../controllers/request-controller')
const ensureRole = require('../middleware/auth-role-middleware')
const authMiddleware = require('../middleware/auth-middleware')

const {Roles} = require('../global/enums')
import {body} from "express-validator";


router.get('/', [authMiddleware, ensureRole([Roles.PLAYER])], requestController.getRequestByAuthor)
router.get('/manager', [authMiddleware, ensureRole([Roles.MANAGER, Roles.ADMIN])], requestController.getManagerRequests)

router.post('/join-team',
    [
        body('teamId').isNumeric()
    ],
    [authMiddleware, ensureRole([Roles.PLAYER])], requestController.joinTeam)

router.post('/quit-team', [authMiddleware, ensureRole([Roles.PLAYER])], requestController.quitFromTeam)
router.post('/change-team', [authMiddleware, ensureRole([Roles.PLAYER])], requestController.changeTeam)
router.post('/accept/:id', [authMiddleware, ensureRole([Roles.MANAGER, Roles.ADMIN])], requestController.accept)
router.post('/decline/:id', [authMiddleware, ensureRole([Roles.PLAYER, Roles.MANAGER])], requestController.decline)



module.exports = router
