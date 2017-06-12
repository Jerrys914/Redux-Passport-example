const LocalStrategy = require('passport-local').Strategy; // require the passport local strategy
const UserModel = require('../models/userModel.js');
const bcrypt = require('bcrypt-nodejs');

let LocalLogin = new LocalStrategy({ //create local strategy for logging in and set to variable "LocalLogin"
  usernameField: 'username', //default - can be changed if request has something else other than username
  passwordField: 'password', // same as above but for password
  passReqToCallback: true // pass the request object the the callback below incase other things leed to be picked off
  // - if passReqToCallback is false req is still in the callback parameters but is null/undefined
},
(req, username, password, done) => { // the callback
  process.nextTick(() => { // process.next tic will account wait a bit to account for asyncronisity
  UserModel.findOne({ username:username }).exec((err,user) => { //check if user is in DB
    if(err){ return done(err)} //if error occured pass err to done. Failure redirect for passport.authenticate login in routes.js is hit
    if(!user){ // if no user exists
      return done(null, false, req.flash('loginMessage', 'Wrong Username or Password')); // no user, false is second parameter and failureRedirect is hit passing a flash message
    }
    if(!bcrypt.compareSync(password, user.password)){ // there is a user - compare passwords
      return done(null, false, req.flash('loginMessage', 'Wrong Username or Password'));// passwords dont match, false is second parameter and failureRedirect is hit passing a flash message
    }
    return done(null, user); // user was found and passwords matched. Second argument passed to done is not false. user passed to serialize
  })
})});

let LocalSignup = new LocalStrategy({ //create local strategy for signing-up and set to variable "LocalSignup"
  usernameFeild: 'username', // same as local login
  passwordField: 'password', // same as local login
  passReqToCallback: true // pass request object - if false req is still in the callback parameters but is null
}, 
(req, username, password, done) => {
  UserModel.findOne({username: username}, (err,user) => { // check if user exists in DB
    if(err){ return done(err) } //if error occured pass err to done. Failure redirect for passport.authenticate singup in routes.js is hit
    if(user){ //if user exists
      return done(null, false, req.flash('signupMessage', 'Username Already Exists')); //username was taken , false is second parameter and failureRedirect is hit passing a flash message
    } else { // if the username isn't taken
      let newUser = new UserModel(); //create a new user - this is mongoDB syntax not passport
      newUser.username = username;
      newUser.password = bcrypt.hashSync(password);

      newUser.save((err) => { //save the user in the DB
        if(err){throw err}
        return done(null,newUser); //pass the newly saved user to done, newUser passed to serialize
      })
    }
  })
})

module.exports = (passport) => { //passport being passed in from server.js anthing that requires us to access passport need to be inside here
  passport.serializeUser((user, done) => { //user is whatever was passed into successful done function above
    if (Array.isArray(user)) { //not passport - just making sure the data comes in the correct form
      var id = user[0];
      user = {
        id: id
      };
    }
    done(null, user.id); //passing something to this done is creating a session containing whatever was passed in - in this case the user id
  });
  passport.deserializeUser((id, done) => { //oposite of serialize. will pickout and decrypt whatever was stored in the users session
    UserModel.findOne({_id:id}).then((data) => { //in this case only the user id was stored. we then check the DB to get that users info
      let user = {
        id: data.id,
        username: data.username
      };
      done(null, user); //when we get the user data we want we pass to done. This is then passing that info(user) to req.user on all requests
    });
  });
  passport.use('local-login',LocalLogin); // we tell passport to associate our LocalLogin function with the name "local-login"
  passport.use('local-signup', LocalSignup);// we tell passport to associate our LocalSignup function with the name "local-singup"
  //These two line of code come into play for our passport.authenticate in our routes.js
};

//GO TO ROUTES.JS!!


