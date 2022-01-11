import {Router} from "express";
import {body} from "express-validator";
const router = Router();
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const authAdminManagerMiddleware = require('../middleware/auth-manager-admin-middleware')

router.get('/:id', authAdminManagerMiddleware, userController.getUser)
router.post('/change-img', authMiddleware, userController.changePhoto)
router.post('/change-email', [
    body('new_email').isEmail()
    ],
    authMiddleware, userController.changeEmail)

module.exports = router
