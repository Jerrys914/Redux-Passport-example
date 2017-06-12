require('dotenv').config();
require('./db/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(session({ //initialize express sessions - passport needs this
  secret:"someSecret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize()); // initialize after express sessions are set up
app.use(passport.session()); //user passport sessions. again express sessions are needed for this to work
app.use(flash()); // for the flash messages


require('./passport/config.js')(passport); //oposite of requireing passport in config. we require the config and pass passport to the module.exports function
require('./routes.js')(app, passport); //same as above but passing both the app and passport

//GO TO PASSPORT/CONFIG.JS NEXT!!

let port = 4000;
app.listen(port,(err) => {
  console.log("Listening on port " + port);
});
module.exports = app;