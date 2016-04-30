var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://demo:test123@ds045882.mongolab.com:45882/astro-events');

var Planet = require('./models/planetModel');
var Event = require('./models/eventModel');
var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var eventRouter = require('./routes/eventRoutes');
var planetRouter = require('./routes/planetRoutes');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', eventRouter(Event));
app.use('/api', planetRouter(Planet));

app.get("/", function(req,res){
  res.send('welcome to my API!');
});

app.listen(port, function(){
  console.log("Running on port:" + port);
});
