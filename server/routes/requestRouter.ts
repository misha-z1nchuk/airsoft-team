import {Router} from "express";
const router = Router();
const requestController = require('../controllers/request-controller')
const authPlayerMiddleware = require('../middleware/auth-player-middleware')
const authMiddleware = require('../middleware/auth-middleware')
const authPlayerManagerMiddleware = require('../middleware/auth-player-manager-middleware')
import {body} from "express-validator";
const authManagerMiddleware = require('../middleware/auth-manager-middleware')
const authManagerAdminMiddleware = require('../middleware/auth-manager-admin-middleware')

router.get('/', authMiddleware, requestController.getRequestByAuthor)
router.post('/join-team',
    [
        body('teamId').isNumeric()
    ],
    authPlayerMiddleware, requestController.joinTeam)

router.post('/quit-team', authPlayerMiddleware, requestController.quitFromTeam)
router.post('/accept/:id', authManagerAdminMiddleware, requestController.accept)
router.post('/decline/:id', authPlayerManagerMiddleware, requestController.decline)



module.exports = router
