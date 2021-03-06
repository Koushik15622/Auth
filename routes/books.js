var express = require("express");
var User = require("../models/User");
var Trans = require("../models/trans");
var sid = require('shortid');
var session = require("express-session");
var path = require("path");
const { link } = require("fs");
var router = express.Router();

var rate = [840,777,1017,877,199];
var id = [12576,36684,49056,88674,96754];
var bn = ['GATE','GRE','TOEFL','CAT','NCC - Handbook']
var l = ['https://www.indiacon.in/downloads/588b3b4843455.pdf','https://www.ets.org/s/gre/pdf/practice_book_GRE_pb_revised_general_test.pdf','https://examplanet.com/ebooks/OFFICIAL%20GUIDE%20TOEFL%20iBT%20Third%20Edition.pdf','http://www.prep4paper.com/Quant%20aptitude%20Pearson.pdf','http://www.cbseacademic.nic.in/web_material/doc/CADET&%20ANO%20HAND%20BOOK%202017/Trg%20Manuals/Common/Cadet-JD-JW.pdf'];
var data;

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

router.get("/profile", (req, res) => {
  if (req.session.user) {
    Trans.find({email:req.session.user.email},(err,list)=>{
      for(var i=0;i<list.length;i++){
        var index=id.indexOf(list[i].bid);
        list[i].bn=bn[index];
        list[i].bc=rate[index];
      }
      res.render('profile',{uname:req.session.user.username,data:list,email:req.session.user.email,due:req.session.user.due});
    })
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
       var tid = sid.generate();
       var trans = new Trans({
        transID:tid,
        email:u.email,
        bid:id[i]
      });
      trans.save();
       req.session.cost = rate[i];
       req.session.bid = id[i];
       req.session.bn = bn[i];
       req.session.link = l[i];
       req.session.tid = tid;
       req.session.save();
       //console.log(JSON.stringify(req.session))
      return res.send(req.session);
       
   });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;