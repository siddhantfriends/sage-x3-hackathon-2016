var deviceModule = require("aws-iot-device-sdk").device;
var path = require("path");
var fs = require("fs");

var topic = "sage/iot/workshop/youngexplorers/ultrasound";

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

device.on('connect', function() {
    console.log('connect');

    while (true) {
        var res = {
            stamp: (new Date()).toISOString(),
            distance1: 20,
            distance2: 40
        }
        
        console.log("Publishing", res);
        device.publish(topic, JSON.stringify(res));
    }

});
    
    
    
device.on('close', function() {
    console.log('close');
    clearInterval(interval);
});
    
device.on('reconnect', function() {
    console.log('reconnect');
});
    
device.on('offline', function() {
    console.log('offline');
});
    
device.on('error', function(error) {
    console.log('error', error);
});
    
device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});


