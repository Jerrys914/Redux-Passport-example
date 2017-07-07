const LocalStrategy = require('passport-local').Strategy; // require the passport local strategy
const UserModel = require('../models/userModel.js');
const bcrypt = require('bcrypt-nodejs');
