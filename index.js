var PythonShell = require("python-shell");
function pn532(config) {
  console.log('instance created');
  this.pyshell = PythonShell.run("./lib/pn532.py", (err, result) => {
    console.error(err);
    if(!err){
      console.log(result);
    }
  });
  // TODO: begin according to config provided
  this.pyshell.on("message", function(message) {
    console.log("receive: " + message);
    const payload = JSON.parse(message);
    switch (payload.code) {
      case 1:
        console.log("begning");
        setTimeout(() => {
          this.begin();
        }, 5000);
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

  this.begin = function begin() {
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


module.exports = pn532;
