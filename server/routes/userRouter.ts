import {Router} from "express";
import {body} from "express-validator";
const router = Router();
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const ensureRole = require('../middleware/auth-role-middleware')
const {Roles} = require('../global/enums')



router.get('/:id', [authMiddleware, ensureRole([Roles.ADMIN, Roles.MANAGER])], userController.getUser)
router.get('/', [authMiddleware, ensureRole([Roles.ADMIN])], userController.getUsers)
router.post('/change-img', authMiddleware, userController.changePhoto)
router.post('/change-email', [
    body('new_email').isEmail()
    ],
    authMiddleware, userController.changeEmail)
router.post('/change-password', [
    body('password').isLength({min: 6, max: 24})
    ],authMiddleware, userController.changePassword)
router.get('/confirm-mail-changing/:token', userController.confirmChangeEmail)
router.post('/block-unblock',
    [
        body('userId').isNumeric(),
        body('reason').isString()
    ],
    [authMiddleware, ensureRole([Roles.ADMIN])], userController.banUnbanUser)
module.exports = router
