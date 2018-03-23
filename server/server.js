// server/server.js

var express = require('express');
var router = require('./routes/routes.js');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({ limit : '50mb', extended : false }));

mongoose.connect(process.env.DB_URL);
app.use('/', router);

PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
    console.log("Running @ localhost : " + PORT)
});

module.exports = app;