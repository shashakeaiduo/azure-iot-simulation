'use strict';

// The device connection string to authenticate the device with your IoT hub.
//
// NOTE:
// For simplicity, this sample sets the connection string in code.
// In a production environment, the recommended approach is to use
// an environment variable to make it available to your application
// or use an HSM or an x509 certificate.
// https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security
//
// Using the Azure CLI:
// az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
var connectionString = 'HostName=MyIoTHubDemo.azure-devices.cn;DeviceId=MySimulatedIoTDevice;SharedAccessKey=su2by5Vx9zd65BI1QBqdiNyuv9HVkXdKZYc3NKPHySQ=';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var client = clientFromConnectionString(connectionString);

var connectCallback = function (err) {
  if (err) {
    console.error('Could not connect: ' + err);
  } else {
    console.log('Client connected');
    var message = new Message('some data from my device');
    client.sendEvent(message, function (err) {
      if (err) console.log(err.toString());
    });

    client.on('message', function (msg) {
      // console.log(msg);
      console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);

      client.complete(msg, function () {
        console.log('completed');
      });
    });

    // // Create a message and send it to the IoT hub every second
    // setInterval(function () {
    //   // Simulate telemetry.
    //   var temperature = 20 + (Math.random() * 15);
    //   var message = new Message(JSON.stringify({
    //     temperature: temperature,
    //     humidity: 60 + (Math.random() * 20)
    //   }));

    //   // Add a custom application property to the message.
    //   // An IoT hub can filter on these properties without access to the message body.
    //   message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');

    //   console.log('Sending message: ' + message.getData());

    //   // Send the message.
    //   client.sendEvent(message, function (err) {
    //     if (err) {
    //       console.error('send error: ' + err.toString());
    //     } else {
    //       console.log('message sent');
    //     }
    //   });
    // }, 1000);
  }
};

client.open(connectCallback)

