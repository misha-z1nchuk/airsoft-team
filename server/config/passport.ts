import User from "../models/user.model";
import {Response} from "express";
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const tokenService = require('../services/token-service')
const generator = require('generate-password');
const userService = require('../services/user-service')


passport.serializeUser(function(user:any, done:any) {
    done(null, user);
});

passport.deserializeUser(function(user:any, done:any) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        //TODO: ENV
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/user/auth/google/callback",
    },
    async function(req: Request, accessToken:string, refreshToken:string, profile:any, done:any) {
        try {
            const {familyName, givenName} = profile.name;
            const email = profile.emails[0].value;
            const verified = profile.emails[0].verified;

            let randPassword = generator.generate({
                length: 10,
                numbers: true
            });

            let candidate = await User.findOne({where: {email}})
            let user = candidate;
            if (!candidate){
                user = await userService.registration(familyName, givenName, email, randPassword, "Player");
            }
            req.headers.authorization
            return done(null , user)
        }catch (e){

        }
    }
));

module.exports = passport

