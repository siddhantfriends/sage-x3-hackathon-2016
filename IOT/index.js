//var i2c_htu21d = require('htu21d-i2c');
var deviceModule = require("aws-iot-device-sdk").device;
var path = require("path");
var fs = require("fs");

// If using a Raspberry Pi, do not specify the i2c device name.
// The correct name will be used based on the board revision.
// Older boards use /dev/i2c-0, newer ones use /dev/i2c-1.
// If using any other board, specify the device name.
// For example: i2c_htu21d({device: '/dev/i2c-1/'});
//var htu21df = new i2c_htu21d();

//var rpio = require("rpio");

var topic = "sage/iot/workshop/youngexplorers/test";
//var topicBtn = "sage/iot/workshop/button/id_1";
//var rpio_btn_pin = 11;

var interval;
// setup aws device
const device = deviceModule({
	privateKey: fs.readFileSync(path.join(__dirname, "certs", "private.pem.key")),
	clientCert: fs.readFileSync(path.join(__dirname, "certs", "certificate.pem.crt")),
	caCert: fs.readFileSync(path.join(__dirname, "certs", "root-CA.crt")),
	region: "eu-west-1",
	debug: false,
	protocol: "wss",
	accessKeyId: "AKIAJB6RDL2OIFMCHOZQ",
	secretKey: "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"

});
// setup gpio
var debounce = false;
function onpress(cbpin)
{
	// debounce
	if (debounce) return;
	//
	var state = !rpio.read(cbpin);
	//
	console.log('Button event on P%d (button currently %s)', cbpin, state ? 'pressed' : 'released');
	//
	if (state) {
		// only debounce pressed
		debounce = true;
		setTimeout(function() {
			debounce = false;
		}, 500);
		device.publish(topicBtn, JSON.stringify({
			stamp: (new Date()).toISOString()
		}));
	}
}
//rpio.open(rpio_btn_pin, rpio.INPUT, rpio.PULL_UP);
//rpio.poll(rpio_btn_pin, onpress);

   device
      .on('connect', function() {
         console.log('connect');

	interval = setInterval(function() {
		var res = {
			stamp: (new Date()).toISOString(),
            sensorNumber: "s2",
            distance: 40
		};
//		htu21df.readTemperature(function (temp) {
//			console.log('Temperature, C:', temp);
//			res.temperature = Number(temp);
//		
//		    	htu21df.readHumidity(function (humidity) {
//		        	console.log('Humidity, RH %:', humidity);
//				res.humidity = Number(humidity);
//				//
//				//console.log("Topic: "+topic+" : " +JSON.stringify(res));
//				device.publish(topic, JSON.stringify(res));
//		    	});
//		})
        
        console.log("Publishing", res);
        device.publish(topic, JSON.stringify(res));
       
	}, 10000);


      });
   device
      .on('close', function() {
         console.log('close');
	clearInterval(interval);
      });
   device
      .on('reconnect', function() {
         console.log('reconnect');
      });
   device
      .on('offline', function() {
         console.log('offline');
      });
   device
      .on('error', function(error) {
         console.log('error', error);
      });
   device
      .on('message', function(topic, payload) {
         console.log('message', topic, payload.toString());
      });


