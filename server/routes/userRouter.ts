import {Response, Router} from "express";
const router = Router();
import {UserService} from "../services/user-service";
const userController = require('../controllers/user-controller')
import {body} from "express-validator";
import Token from "../models/token.model";
const authMiddleware = require('../middleware/auth-middleware')
const passport = require('../config/passport')
let UserRoles = ['ADMIN', 'MANAGER', 'PLAYER']

declare var process : {
    env: {
        CLIENT_URL:string;
    }
}

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
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate)
router.get('/get-users', authMiddleware, userController.getUsers)

router.get('/auth/google',
    passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] }), (req, res) => {
        res.send("fsfsdfd")
    });

router.get('/auth/google/callback',
     passport.authenticate('google',  {
            failureRedirect: '/auth/google/failure',
            session: false
        }), async (req, res)=> {
        // @ts-ignore
        const user_id = req.user.dataValues.id
        let tokenModel = await Token.findOne({where: {userId: user_id}})
        if (!tokenModel){
            return
        }
        const refreshToken = tokenModel.refreshToken

        res.cookie('refreshToken', refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        res.redirect("http://localhost:3000")

});


module.exports = router
