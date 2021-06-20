require('dotenv').config();
var express = require("express");
var User = require("../models/User");
var path = require("path");
var router = express.Router();

  var sessionChecker = (req, res, next) => {
    if (req.session.user) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  };
  
  router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/html/index.html"));
  });

  router
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/html/signup.html"));
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
        req.session.save();
        res.redirect("/dashboard");
      }
    });
  });

  router
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
  })
  .post(async (req, res) => {
    var username = req.body.username,
      password = req.body.password;

      try {
        var user = await User.findOne({ username: username }).exec();
        //console.log("User found in db"+user);
         if(!user) {
             //console.log("went to login frm if");
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect("/login");
            }
        });
        req.session.user = user;
        req.session.save();
        res.redirect("/dashboard");
    } catch (error) {
      console.log(error)
    }
  });

  router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render('dashboard',{uname:req.session.user.username,due:req.session.user.due});
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    req.session.destroy();
    res.redirect("/");
    } 
  else {
    res.redirect("/login");
    }
});

module.exports = router;