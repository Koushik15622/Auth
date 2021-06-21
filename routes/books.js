var express = require("express");
var User = require("../models/User");
var sid = require('shortid');
var session = require("express-session");
var path = require("path");
var router = express.Router();

var rate = [549,799,930,699,760];
var id = [12576,36684,49056,88674,96754];
var bn = ['GATE','GRE','TOEFL']
var l = ['https://www.indiacon.in/downloads/588b3b4843455.pdf','https://www.indiacon.in/downloads/588b3b4843455.pdf','https://www.indiacon.in/downloads/588b3b4843455.pdf'];


router.get("/cse", (req, res) => {
    if (req.session.user) {
      res.render('cse',{uname:req.session.user.username});
    } else {
      res.redirect("/login");
    }
});

router.get("/ece", (req, res) => {
  if (req.session.user) {
    res.render('ece',{uname:req.session.user.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/eee", (req, res) => {
  if (req.session.user) {
    res.render('eee',{uname:req.session.user.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/mech", (req, res) => {
  if (req.session.user) {
    res.render('mech',{uname:req.session.user.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/civ", (req, res) => {
  if (req.session.user) {
    res.render('civ',{uname:req.session.user.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/spl", (req, res) => {
  if (req.session.user) {
    res.render('spl',{uname:req.session.user.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/spl/:c", (req, res) => {
  if (req.session.user) {
   var i = req.params.c;
   //console.log(req.session.user);
   var user = req.session.user;
   var n = req.session.user.username;
   var fp = user.due + rate[i];
   //console.log(req.session.user);
   //console.log(fp);
     User.updateOne({email:user.email},{$set:{due:fp}}).then(async(r,err)=>{
       var u = await User.findOne({email:user.email}).exec();
       req.session.user = u;
       req.session.user.username = n;
       req.session.cost = rate[i];
       req.session.bid = id[i];
       req.session.bn = bn[i];
       req.session.link = l[i];
       req.session.tid = sid.generate();
       req.session.save();
       return res.send(req.session);
       
   });
   //res.send(req.session.user);
  } else {
    res.redirect("/login");
  }
});

module.exports = router;