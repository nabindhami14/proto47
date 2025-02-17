const path = require("path");
const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { CreateOrderRequest, OrderResponse } = require("../build/order_pb");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../protobuf/order.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
  }
);

const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

const orderClient = new orderProto.OrderService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = express();
// app.use(express.json());
app.use(express.raw({ type: "application/octet-stream" }));

app.post("/", (req, res) => {
  const deserializedPayload = CreateOrderRequest.deserializeBinary(
    req.body
  ).toObject();

  const payload = {
    userId: deserializedPayload.userid,
    items: deserializedPayload.itemsList.map((item) => ({
      productId: item.productid,
      quantity: item.quantity,
    })),
  };

  orderClient.CreateOrder(payload, (error, response) => {
    if (error) {
      return res.status(500).json({ error });
    }

    try {
      const orderResponse = new OrderResponse();

      orderResponse.setOrderid(response.orderId);
      orderResponse.setStatus(response.status);

      const binaryData = orderResponse.serializeBinary();
      const buffer = Buffer.from(binaryData);

      res.set({
        "Content-Type": "application/octet-stream",
        "Content-Length": buffer.length,
        "Cache-Control": "no-cache",
      });

      res.end(buffer);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

app.listen(3000, () => console.log("http://localhost:3000"));
