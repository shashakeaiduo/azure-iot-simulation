const { EventHubConsumerClient } = require("@azure/event-hubs");
const moment = require("moment");

async function main() {
  const client = new EventHubConsumerClient(
    "$Default",
    "Endpoint=sb://ihsumcprodbjres014dednamespace.servicebus.chinacloudapi.cn/;SharedAccessKeyName=iothubowner;SharedAccessKey=L+51EWtk9c/kcvoSy3kWVpgJ8uXCTDXxMN1etdnmfYo=;EntityPath=iothub-ehub-myiothubde-371035-ce689ef6d4"
  );
  await client.getEventHubProperties();
  // retrieve partitionIds from client.getEventHubProperties() or client.getPartitionIds()
  const partitionId = "0";
  await client.getPartitionProperties(partitionId);

  const subscription = client.subscribe({
    processEvents: (events, context) => {
      // console.log(context);

      for (const event of events) {
        enqueuedTime = event.systemProperties["iothub-enqueuedtime"];
        deviceId = event.systemProperties["iothub-connection-device-id"];
        // msgSource = event.systemProperties["iothub-message-source"];
        console.log(
          moment(enqueuedTime).format("YYYY-MM-DD HH:mm:ss"),
          deviceId
        );

        // console.log(event.systemProperties["iothub-connection-device-id"]);
      }

      //   console.log(events.systemProperties.iothub);

      //   console.log(JSON.stringify(events, null, 4));
      // event processing code goes here
    },
    processError: (err, context) => {
      console.log(err);

      // error reporting/handling code here
    }
  });

  //   await subscription.close();

  //   await client.close();
}

main();
