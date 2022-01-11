import {Router} from "express";
import {body} from "express-validator";
const  router = Router();

const adminController = require('../controllers/admin-controller')
const authMiddleware = require('../middleware/auth-middleware')
const ensureRole = require('../middleware/auth-role-middleware')
const {Roles} = require('../global/enums')

router.post('/block',
    [
    body('userId').isNumeric(),
    body('reason').isString()
    ],
    [authMiddleware, ensureRole([Roles.ADMIN])], adminController.banUser)
router.post('/unblock',
    [
        body('userId').isNumeric(),
        body('reason').isString()
    ],
    [authMiddleware, ensureRole([Roles.ADMIN])], adminController.unbanUser)

module.exports = router
