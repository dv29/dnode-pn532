var PythonShell = require("python-shell");
function pn532(config) {
  this.pyshell = new PythonShell("./lib/pn532.py");
  // TODO: begin according to config provided
  this.pyshell.on("message", function(message) {
    console.log("receive: " + message);
  });
  this.pyshell.on("error", function(err) {
    console.error("err: " + err);
  });
  this.pyshell.on("close", function(close) {
    console.log("close: " + close);
  });
}

pn532.prototype.begin = function begin() {
  payload = {
    command: "init",
    CS: 16,
    MOSI: 20,
    MISO: 19,
    SCLK: 21
  };
  this.pyshell.send(JSON.stringify(payload));
};

module.exports = pn532;
