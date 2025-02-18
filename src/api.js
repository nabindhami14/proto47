const express = require("express");

const { CreateOrderRequest, OrderResponse } = require("../build/order_pb");

const orderClient = require("./clients/order.client");

const app = express();

app.use((req, res, next) => {
  const contentType = req.headers["content-type"];
  if (contentType === "application/octet-stream") {
    return express.raw({ type: "application/octet-stream" })(req, res, next);
  }
  return express.json()(req, res, next);
});

app.post("/", async (req, res) => {
  const contentType = req.headers["content-type"];
  let payload;

  try {
    if (contentType === "application/octet-stream") {
      const deserializedPayload = CreateOrderRequest.deserializeBinary(
        req.body
      ).toObject();

      payload = {
        userId: deserializedPayload.userid,
        items: deserializedPayload.itemsList.map((item) => ({
          productId: item.productid,
          quantity: item.quantity,
        })),
      };
    } else {
      payload = req.body;
    }

    const response = await orderClient.createOrder(payload);

    if (contentType === "application/octet-stream") {
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

      return res.send(buffer);
    }

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
