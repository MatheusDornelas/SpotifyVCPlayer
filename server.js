// Imports
var express = require("express");
var app = express();
var port = 8082;

// App Config
app.use(express.static(__dirname + "/app"));
app.listen(port);
