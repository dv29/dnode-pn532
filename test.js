const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);

// setup path root
const publicPath = path.resolve(__dirname,'');
app.use(express.static(publicPath));

const PN532 = require('./index');
const pn532 = new PN532();

pn532.on('data', (data) => {
  console.log(data);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
