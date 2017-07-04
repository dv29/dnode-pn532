const PythonShell = require("python-shell");
const EventEmitter = require("events");
const util = require("util");

function PN532(config) {
  const self = this;
  console.log("instance created");

  const options = Object.assign(
    {
      CS: 16,
      MOSI: 20,
      MISO: 19,
      SCLK: 21
    },
    config
  );

  this.pyshell = new PythonShell("./lib/pn532.py", {
    args: [options.CS, options.MOSI, options.MISO, options.SCLK]
  });

  // TODO: begin according to config provided
  this.pyshell.on("message", function(message) {
    console.log("receive: " + message);
    const payload = JSON.parse(message);
    switch (payload.code) {
      case 1:
        console.log("begning");
        break;
      case 3:
        self.emit("data", payload.data);
        break;
      case 4:
        self.emit("data", payload.data);
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
}
util.inherits(PN532, EventEmitter);

module.exports = PN532;
