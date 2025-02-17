const { Kafka } = require("kafkajs");
const protobuf = require("protobufjs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "payment-group" });

const root = protobuf.loadSync("../../protobuf/payment.proto");
const PaymentEvent = root.lookupType("payment.PaymentEvent");

async function consumePaymentEvents() {
  await consumer.connect();
  await consumer.subscribe({ topic: "payment-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      // Decode the Protobuf message
      const decodedEvent = PaymentEvent.decode(message.value);
      console.log("📩 Received Payment Event:", decodedEvent);

      // Optionally, convert to JSON for easier access
      const eventAsJSON = decodedEvent.toObject();
      console.log("📌 Payment Event as JSON:", eventAsJSON);
    },
  });
}

consumePaymentEvents();
