var i2c = require('i2c');
var address = 0x18;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

wire.scan(function(err, data) {
  // result contains an array of addresses
	console.log(data);
});
/*
var i2c_htu21d = require('htu21d-i2c');

// If using a Raspberry Pi, do not specify the i2c device name.
// The correct name will be used based on the board revision.
// Older boards use /dev/i2c-0, newer ones use /dev/i2c-1.
// If using any other board, specify the device name.
// For example: i2c_htu21d({device: '/dev/i2c-1/'});
var htu21df = new i2c_htu21d({device: '/dev/i2c-1/'});

htu21df.readTemperature(function (temp) {
    console.log('Temperature, C:', temp);

    htu21df.readHumidity(function (humidity) {
        console.log('Humidity, RH %:', humidity);
    });
});
*/