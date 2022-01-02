import {Router} from "express";
const router = Router();
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')


router.get('/get-users', authMiddleware, userController.getUsers)
router.post('/change-img', authMiddleware, userController.changePhoto)

module.exports = router
