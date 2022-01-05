import {Router} from "express";
const router = Router();
const requestController = require('../controllers/request-controller')
const authPlayerMiddleware = require('../middleware/auth-player-middleware')
const authMiddleware = require('../middleware/auth-middleware')
import {body} from "express-validator";


router.get('/', authMiddleware, requestController.getRequestByAuthor)
router.post('/join-team',
    [
        body('team_id').isNumeric()
    ],
    authPlayerMiddleware, requestController.joinTeam)
router.post('/accept/:id', authMiddleware, requestController.accept)
router.post('/decline/:id' /*, Managermiddlevare //TODO: */, requestController.decline)



module.exports = router
