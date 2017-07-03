var PythonShell = require("python-shell");
const EventEmitter = require('events');
const util = require('util');

function PN532(config) {
  const self = this;
  console.log('instance created');
  this.pyshell = new PythonShell("./lib/pn532.py");
  // TODO: begin according to config provided
  this.pyshell.on("message", function(message) {
    console.log("receive: " + message);
    const payload = JSON.parse(message);
    switch (payload.code) {
      case 1:
        console.log("begning");
        break;
      case 4:
        self.emit('data', message.data);
        break;
      default:
        console.log(payload);
        console.error("no code found");
    }
  });

  this.pyshell.on("error", function(err) {
    console.error("err: " + err);
  });

  this.pyshell.on("close", function(close) {
    console.log("close: " + close);
  });

  this.begin = function() {
    payload = {
      command: "init",
      CS: 16,
      MOSI: 20,
      MISO: 19,
      SCLK: 21
    };
    console.log('this.begin');
    this.pyshell.send(JSON.stringify(payload));
  };
}
util.inherits(PN532, EventEmitter)

module.exports = PN532;
