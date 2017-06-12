const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  userId: {type:String},
  todo: {type:String, index: { unique: true }}
});

let Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;