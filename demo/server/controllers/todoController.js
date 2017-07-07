const todoModel = require('../models/todoModel.js')

module.exports = {
  addTodo(todo, userId, res) {
    if(todo === 'default'){
      todoModel.find({userId:userId}).then((todos) => {
          let arr = todos.map((todo)=>{
            return todo.todo
          });
          res.send(arr);
        });
    } else {
      let newTodo = new todoModel({userId:userId, todo: todo});
      newTodo.save((err, newTodo) => {
        if(err){
          console.log('ERROR: ', err);
        }
        else {
          todoModel.find({userId:userId}).then((todos) => {
            let arr = todos.map((todo)=>{
              return todo.todo
            });
            res.send(arr);
          });
        }
      });
    }
  },

  removeTodo(todo, userId, res) {
    todoModel.remove({userId:userId,todo:todo}).then(() =>{
      todoModel.find({userId:userId}).then((todos)=>{
        if(todos.length === 0){
          res.send(todos);
        } else {
          let arr = todos.map((todo)=>{
            return todo.todo
          });
          res.send(arr);
        }
      });
    });
  } 
};