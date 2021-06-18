require('dotenv').config();
var express = require("express");
var User = require("../models/User");
var session = require("express-session");
var path = require("path");
var router = express.Router();
//var user;
router.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie("user_sid");
    }
    next();
  });
  
  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  };
  
  router.get("/", sessionChecker, (req, res) => {
    res.redirect("/login");
  });

  router
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/signup.html"));
  })
  .post((req, res) => {

     var user = new User({
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
    });
    user.save((err, docs) => {
      if (err) {
        res.redirect("/signup");
      } else {
          console.log(docs)
        req.session.user = docs;
        res.redirect("/dashboard");
      }
    });
  });

  router
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/login.html"));
  })
  .post(async (req, res) => {
    var username = req.body.username,
      password = req.body.password;

      try {
        var user = await User.findOne({ username: username }).exec();
        req.session.user = user;
        console.log("User found in db"+user);
        if(!user) {
            console.log("went to login frm if");
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
                console.log("passwd error");
              res.redirect("/login");
            }
        });
        // req.session.user = user;
        res.redirect("/dashboard");
    } catch (error) {
      console.log(error)
    }
  });

  router.get("/dashboard", (req, res) => {
    console.log("session = "+req.session.user)
  if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard',{uname:req.session.user.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    req.session.destroy();
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;