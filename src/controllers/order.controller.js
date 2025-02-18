const { CreateOrderRequest, OrderResponse } = require("../../build/order_pb");

const orderClient = require("../clients/order.client");

const CreateOrder = async (req, res) => {
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
};

module.exports = { CreateOrder };
