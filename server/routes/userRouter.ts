import {Router} from "express";
const router = Router();
import {UserService} from "../services/user-service";
const userController = require('../controllers/user-controller')
import {body} from "express-validator";
let UserRoles = ['ADMIN', 'MANAGER', 'PLAYER']


router.post('/registration',
    [
        body('first_name').isLength({max: 24}).isString(),
        body('last_name').isLength({max: 24}).isString(),
        body('role').isIn(UserRoles),
        body('email').isEmail(),
        body('password').isLength({min: 6, max: 24})
    ],
    userController.registration)
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate)


module.exports = router
