require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var Ms = require("connect-mongo");
var passport = require("passport");
var morgan = require('morgan');
var auth = require('./routes/auth');
var gauth = require('./routes/g-auth');
var books = require('./routes/books');
var app = express();

//app.use(morgan('dev'));
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

console.log(process.env.MSC)

app.use(session({
    key: "user_sid",
    secret: "IDONTKNOW",
    resave: false,
    saveUninitialized: false,
    store: Ms.create({
      mongoUrl: process.env.MSC,
      ttl: 600,
      autoRemove: 'native'
    }),
  })
);

app.use(passport.initialize());
app.use('/',auth);
app.use('/auth',gauth);
app.use('/books',books);
app.use(function (req, res, next) {
  res.status(404).send("Not found!!");
});
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log('App started on port '+port)
);
