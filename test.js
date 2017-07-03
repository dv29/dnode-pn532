var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);

// setup path root
var publicPath = path.resolve(__dirname,'');
app.use(express.static(publicPath));

var pn532 = require('./index')
var PN532 = new pn532()
PN532.begin();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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
