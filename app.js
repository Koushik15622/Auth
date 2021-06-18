require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var morgan = require('morgan');
var auth = require('./routes/auth');
var gauth = require('./routes/g-auth');
var app = express();

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "IDONTKNOW",
    resave: false,
    saveUninitialized: false,
    maxAge: 600,
    cookie: {
      expires: 600,
      secure:false
    },
  })
);

 app.use(passport.initialize());
app.use('/',auth);
app.use('/auth',gauth);
app.use(function (req, res, next) {
  res.status(404).send("Kya chahiye bhai!?");
});
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log('App started on port '+port)
);
