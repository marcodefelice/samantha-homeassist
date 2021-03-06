'use strict';
var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./config'),
server       = express();
var mongoose     = require('mongoose')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl).then(function(err) {
  if(err) console.error("could not connect")
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./Routes/Routes'); //importing route
routes(server); //register the route
server.listen((process.env.PORT || 8900), function () {
    console.log("Server is up and listening on port" + process.env.PORT);
});
