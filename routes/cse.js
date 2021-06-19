var express = require("express");
var User = require("../models/User");
var session = require("express-session");
var path = require("path");
var router = express.Router();

router.get("/", (req, res) => {
    if (req.session.user) {
      res.render('cse',{uname:req.session.user.username});
    } else {
      res.redirect("/login");
    }
});

router.get("/rbooks", (req, res) => {
    if (req.session.user) {
      res.render('cseR',{uname:req.session.user.username});
    } else {
      res.redirect("/login");
    }
});

router.get("/sbooks", (req, res) => {
    if (req.session.user) {
      res.render('cseS',{uname:req.session.user.username});
    } else {
      res.redirect("/login");
    }
});

module.exports = router;