import {Router} from "express";
const router = Router();
const authController = require('../controllers/auth-controller')
import {body} from "express-validator";
import Token from "../models/token.model";
import Role from "../models/role.model";
const passport = require('../config/passport')

declare var process : {
    env: {
        CLIENT_URL:string;
    }
}

router.post('/registration',
    [
        body('first_name').isLength({max: 24}).isString(),
        body('last_name').isLength({max: 24}).isString(),
        body('role').custom(async roleId => {
            let candidate = await Role.findOne({where: {id: roleId}})
            if (!candidate){
                return Promise.reject('Wrong role');
            }
            return true;
        }),
        body('email').isEmail(),
        body('password').isLength({min: 6, max: 24})
    ],
    authController.registration)

router.post('/login',
    [
                body('email').isEmail(),
                body('password').isLength({min: 6, max: 24})
            ] ,authController.login);

router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/activate/:link', authController.activate)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password/:id/:token', authController.resetPassword)

router.get('/google',
    passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] }), (req, res) => {
        res.send("")
    });

router.get('/google/callback',
    passport.authenticate('google',  {
        failureRedirect: '/google/failure',
        session: false
    }), authController.googleAuth);


module.exports = router
