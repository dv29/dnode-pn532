var PythonShell = require("python-shell");
function pn532(bar) {
  this.pyshell = new PythonShell("./lib/pn532.py");
  this.pyshell.on("message", function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log("receive: " + message);
  });
}

pn532.prototype.begin = function begin() {
  payload = {
    command: "init",
    CS: 18,
    MOSI: 23,
    MISO: 24,
    SCLK: 25,
  };
  this.pyshell.send(JSON.stringify(payload));
};

module.exports = pn532;
