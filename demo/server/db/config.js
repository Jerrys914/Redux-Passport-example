const mongoose = require('mongoose');

const url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds157539.mlab.com:57539/passportdemo';
mongoose.connect(url);
mongoose.Promise = global.Promise;

module.exports = mongoose.conn;