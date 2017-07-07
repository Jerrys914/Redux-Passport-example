const path = require('path');
const express = require('express');
const todo = require('./controllers/todoController.js');

module.exports = (app) => {
  app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '/../client')));
    res.sendFile(path.join(__dirname, '/../client/index.html'))
  });

  app.post('/api/addTodo', (req, res) => {
    todo.addTodo(req.body.todo, 'default', res);
  });

  app.post('/api/removeTodo', (req, res) => {
    todo.removeTodo(req.body.todo, 'default', res);
  });
};
