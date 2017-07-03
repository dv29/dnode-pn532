var PythonShell = require("python-shell");
function pn532(config) {
  this.pyshell = new PythonShell("./lib/pn532.py");
  // TODO: begin according to config provided
  this.pyshell.on("message", function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log("receive: " + message);
  });
  this.pyshell.on("error", function(err) {
    // received a err sent from the Python script (a simple "print" statement)
    console.log("err: " + err);
  });
  this.pyshell.on("close", function(close) {
    // received a close sent from the Python script (a simple "print" statement)
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
