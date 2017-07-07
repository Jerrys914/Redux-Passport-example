const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true }
  password: { type: String, required: true }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
