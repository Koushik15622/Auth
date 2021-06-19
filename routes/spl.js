require('dotenv').config();
var express = require("express");
var User = require("../models/User");
var path = require("path");
var router = express.Router();
var rate = [150,200,400,650,1299];

router.get("/", (req, res) => {
    if (req.session.user) {
      res.render('spl',{uname:req.session.user.username});
    } else {
      res.redirect("/login");
    }
  });

router.get("/:c", (req, res) => {
    if (req.session.user) {
     var i = req.params.c;
     //console.log(req.session.user);
     var user = req.session.user;
     var fp = user.due + rate[i];
     //console.log(req.session.user);
     //console.log(fp);
       User.updateOne({username:user.username},{$set:{due:fp}}).then(async(r,err)=>{
         var u = await User.findOne({username:user.username}).exec();
         req.session.user = u;
         req.session.save();
         return res.send(req.session.user);
         
     });
     //res.send(req.session.user);
    } else {
      res.redirect("/login");
    }
  });
  module.exports = router;