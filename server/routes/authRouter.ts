import {Router} from "express";
const   router = Router();
const authController = require('../controllers/auth-controller')
import {body} from "express-validator";
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
        body('roleId').custom(async role => {
            let candidate = await Role.findOne({where: {id: role}})
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
router.post('/forgot-password',[
    body('email').isEmail()
], authController.forgotPassword)


router.post('/reset-password/:token', [
    body('new_password').isLength({min: 6, max: 24})
],authController.resetPassword)

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
