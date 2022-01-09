import {Router} from "express";
import {body} from "express-validator";
const router = Router();
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const authAdminMiddleware = require('../middleware/auth-admin-middleware')

router.get('/:id', authAdminMiddleware, userController.getUser)
router.get('/get-users', authMiddleware, userController.getUsers)
router.post('/change-img', authMiddleware, userController.changePhoto)
router.post('/change-email', [
    body('new_email').isEmail()
    ],
    authMiddleware, userController.changeEmail)

module.exports = router
