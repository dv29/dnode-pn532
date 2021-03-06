const PythonShell = require('python-shell');
const EventEmitter = require('events');
const util = require('util');

function PN532(config) {
	const self = this;

	const options = Object.assign({
			INTERFACE: '/dev/ttyS2',
			SCAN_TIMEOUT: 1.5,
		},
		config
	);

	this.pyshell = new PythonShell('pn532.py', {
		scriptPath: __dirname + '/lib',
		args: [options.SCAN_TIMEOUT, options.INTERFACE]
	}, (err) => {
		if (err) {
			self.emit('error', err);
		}
	});

	// TODO: begin according to config provided
	this.pyshell.on('message', function(message) {
		try {
			const payload = JSON.parse(message);
			switch (payload.code) {
				case 1:
					self.emit('initialized', payload.data);
					break;
				case 3:
					self.emit('firmware_version', payload.data);
					break;
				case 4:
					self.emit('card_found', payload.data);
					break;
				default:
					self.emit('invalid_code', payload.data);
					break;
			}
		} catch (e) {
				console.log(message);
		}
	});

	this.pyshell.on('error', function(err) {
		self.emit('error', err);
		console.error('err: ' + err);
	});

	this.pyshell.on('close', function(close) {
		self.emit('close', close);
		console.log('Connection to script closed : ' + close);
	});
}
util.inherits(PN532, EventEmitter);

module.exports = PN532;
