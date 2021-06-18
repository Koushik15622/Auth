require('dotenv').config();
var express = require("express");
var passport = require("passport");
var User = require("../models/User");
var google = require("passport-google-oauth").OAuth2Strategy;
var app = express();
var router = express.Router();

app.use(passport.initialize());
app.use(passport.session());
var userProfile;

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
        userProfile = profile;
        var user = await User.findOne({ username : profile.id}).exec();
            if(user) {
                //console.log("user = "+user);
                return done(null, user);
            } 
            else {
                //console.log("profile = "+profile);
                var newUser = new User({
                    username : profile.id,
                    password : profile.id,
                    email : profile.emails[0].value
                });
                newUser.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newUser);
                });
            }
    
}));

router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/google/cb', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    req.session.user=userProfile;
    req.session.user.username = userProfile.displayName;
    req.session.save();
    res.redirect("/dashboard");
  });

  module.exports = router