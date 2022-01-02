import {Router} from "express";
const router = Router();
const notificationController = require('../controllers/notification-controller')
const authManagerAdminMiddleware = require('../middleware/auth-manager-admin-middleware')
import {body} from "express-validator";
import {emitter} from "../index";



router.get('/', authManagerAdminMiddleware, notificationController.getNotifications)
router.post('/delete/:id', authManagerAdminMiddleware, notificationController.deleteNotification )
module.exports = router
