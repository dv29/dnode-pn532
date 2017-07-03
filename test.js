var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var PythonShell = require('python-shell');
var sleep = require('sleep');

// setup path root
var publicPath = path.resolve(__dirname,'');
app.use(express.static(publicPath));

var pn532 = require('./index')
var PN532 = new pn532()

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/command/:command', function(req, res){
	console.log("command: " + req.params.command)
	res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({'Error': 0}));
    res.end();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
