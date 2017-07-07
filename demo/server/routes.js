const path = require('path');
const express = require('express');
const todo = require('./controllers/todoController.js');

module.exports = (app, passport) => {
  app.get('/', isLoggedIn, (req, res) => { //put main page where the app lives. route is protected by isLoggedIn
    //User must be logged in for this to hit
    app.use(express.static(path.join(__dirname, '/../client')));
    res.sendFile(path.join(__dirname, '/../client/index.html'))
  });

  app.post('/api/addTodo', (req, res) => {
    todo.addTodo(req.body.todo, req.user.id, res);
  });

  app.post('/api/removeTodo', (req, res) => {
    console.log(req.user.id)
    todo.removeTodo(req.body.todo, req.user.id, res); // req.user is what is passed to done in the deserialize function in config.js
  });

  app.get('/api/signup',(req, res) => { // will render the signup page for the user to fill out
    res.render('signup.ejs', {message: req.flash('signupMessage')}); // flash message will be '' if nothing has been run through out passport singup config function and fail
  })
  app.post('/api/signup', passport.authenticate('local-signup', { //this route will be hit when submitting the signup form
     //we pass 'local-singup' to passport.authenticate as first parameter
    //again this is telling passport to use the function associated with this name which we set up at the bottom of config.js
    successRedirect: '/', //hits if a successful session in set
    failureRedirect: '/api/signup', // hit if we ever pass false or error to done in config.js
    failureFlash: true // allow for flash messages to be passed
  }))

  app.get('/logout', (req, res) => { //when this route is hit it will end a session with req.logout
    req.logout(); // passport function to delete a session
    res.redirect('/'); //redirect to '/' which is protected by out isLoggedIn function
  });
};

const isLoggedIn = (req, res, next) => { //middleware to check if a user is logged in
  if(req.isAuthenticated()) { //if there is a valid session for the user
    return next(); // continue with the function that follows for that route
  }
  res.redirect('/api/login'); // if theres no active session redirect to the login page
};
