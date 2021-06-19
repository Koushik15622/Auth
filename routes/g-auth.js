require('dotenv').config();
var express = require("express");
var passport = require("passport");
var User = require("../models/User");
var google = require("passport-google-oauth").OAuth2Strategy;
var app = express();
var router = express.Router();

app.use(passport.initialize());
app.use(passport.session());
var userProfile,us;

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const G_ID = process.env.GID;
const G_PS = process.env.GPS;
passport.use(new google({
  clientID: G_ID,
  clientSecret: G_PS,
  callbackURL: process.env.CBURL
},
async function(token,refreshToken,profile,done){
         us = profile.displayName;
         user = await User.findOne({ username : profile.id}).exec();
            if(user) {
                userProfile=user;
                return done(null, userProfile);
            } 
            else {
                //console.log("profile = "+profile);
                userProfile = new User({
                    username : profile.id,
                    password : profile.id,
                    email : profile.emails[0].value,
                    due : 0
                });
                userProfile.save(function(err){
                    if(err)
                        throw err;
                    return done(null, userProfile);
                });
            }
    
}));

router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/google/cb', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    req.session.user=userProfile;
    req.session.user.username = us;
    req.session.save();
    res.redirect("/dashboard");
  });

  module.exports = router