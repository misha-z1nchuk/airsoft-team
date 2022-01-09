import {Router} from "express";
const  router = Router();

const adminController = require('../controllers/admin-controller')
const authAdminMiddleware = require('../middleware/auth-admin-middleware')

router.post('/block', authAdminMiddleware, adminController.banUser)
router.post('/unblock', authAdminMiddleware, adminController.unbanUser)

module.exports = router
