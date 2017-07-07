require('dotenv').config();
require('./db/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
require('./routes.js')(app);
let port = 4000;
app.listen(port,(err) => {
  console.log("Listening on port " + port);
});
module.exports = app;
