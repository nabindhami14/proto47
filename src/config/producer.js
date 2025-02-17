const { Kafka } = require("kafkajs");
const protobuf = require("protobufjs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

async function publishPaymentEvent(orderId, userId) {
  const root = protobuf.loadSync("../../protobuf/payment.proto");
  const PaymentEvent = root.lookupType("payment.PaymentEvent");

  const event = PaymentEvent.create({
    orderId,
    userId,
    status: "PROCESSING",
  });

  const messageBuffer = PaymentEvent.encode(event).finish();

  await producer.send({
    topic: "payment-events",
    messages: [{ key: orderId, value: messageBuffer }],
  });

  console.log("Published Payment Event:", orderId);
}

module.exports = publishPaymentEvent;
