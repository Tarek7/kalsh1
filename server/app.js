var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var app = express();

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // TODO set it correctly on production

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({
  secret: 'f29a0fa9g49s095gas0csa1g08',
  resave: true,
  saveUninitialized:true })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var routes = require("./routes/routes.js");
var models = require("./models");
routes(app, passport);

require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

var server = app.listen(4000, function () {
    console.log("app running on port.", server.address().port);
});
