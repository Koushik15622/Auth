require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var User = require("./models/User");
var passport = require("passport");
var morgan = require('morgan');
var google = require("passport-google-oauth").OAuth2Strategy;
var app = express();
//app.use(morgan('dev'));
app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600,
    },
  })
);
//=================================GOOGLE-AUTH CODE==========================================================================
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
  callbackURL: "http://auth-bzp4.herokuapp.com/auth/google/cb"
},
function(accessToken,refreshToken,profile,done){
    userProfile=profile;
    return done(null,userProfile);
}
));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/cb', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.sendFile(__dirname+"/public/dashboard.html");
  });

//===================================GOOGLE-AUTH CODE ENDS HERE=======================================================================


app.use((req, res, next) => {
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

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

app
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
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

  app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  })
  .post(async (req, res) => {
    var username = req.body.username,
      password = req.body.password;

      try {
        var user = await User.findOne({ username: username }).exec();
        if(!user) {
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect("/login");
            }
        });
        req.session.user = user;
        res.redirect("/dashboard");
    } catch (error) {
      console.log(error)
    }
  });

  app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log('App started on port '+port)
);
