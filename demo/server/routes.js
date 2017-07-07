const path = require('path');
const express = require('express');
const todo = require('./controllers/todoController.js');

module.exports = (app) => {
  app.get('/', (req, res) => { //put main page where the app lives. route is protected by isLoggedIn
    //User must be logged in for this to hit
    app.use(express.static(path.join(__dirname, '/../client')));
    res.sendFile(path.join(__dirname, '/../client/index.html'))
  });

  app.post('/api/addTodo', (req, res) => {
    todo.addTodo(req.body.todo, 'default', res);
  });

  app.post('/api/removeTodo', (req, res) => {
    todo.removeTodo(req.body.todo, 'default', res); // req.user is what is passed to done in the deserialize function in config.js
  });
};
