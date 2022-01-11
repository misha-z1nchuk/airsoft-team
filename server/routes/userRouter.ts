import {Router} from "express";
import {body} from "express-validator";
const router = Router();
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const ensureRole = require('../middleware/auth-role-middleware')
const {Roles} = require('../global/enums')



router.get('/:id', ensureRole([Roles.ADMIN, Roles.MANAGER]), userController.getUser)
router.post('/change-img', authMiddleware, userController.changePhoto)
router.post('/change-email', [
    body('new_email').isEmail()
    ],
    authMiddleware, userController.changeEmail)

module.exports = router
