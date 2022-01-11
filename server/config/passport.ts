import {DoneFunction, GoogleUserI, UserI} from "../global/types";

const User = require("../models/user.model");
import {ResponseRegLogI} from "../global/responses/reg-log-response";
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const generator = require('generate-password');
const authService = require('../services/auth-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')

passport.serializeUser(function(user:GoogleUserI, done:DoneFunction) {
    done(null, user);
});

passport.deserializeUser(function(user:GoogleUserI, done:DoneFunction) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async function(req: Request, accessToken:string, refreshToken:string, profile:GoogleUserI, done:DoneFunction) {
        try {
            const {familyName, givenName} = profile.name;
            const email = profile.emails[0].value;
            let randPassword = generator.generate({
                length: 10,
                numbers: true
            });

            let candidate: UserI|null = await User.findOne({where: {email}})
            if (!candidate){
                let user: ResponseRegLogI = await authService.registration(familyName, givenName, email, randPassword, "1");
                return done(null , user.user.id)
            }
            const userDto = new UserDto(candidate);
            const tokens = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return done(null, candidate.id)
        }catch (e){
            console.log(e)
        }
    }
));

module.exports = passport

