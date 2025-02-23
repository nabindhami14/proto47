const axios = require("axios");

const {
  CreateOrderRequest,
  OrderItem,
  OrderResponse,
  GetOrdersResponse,
} = require("../build/order_pb");

const createOrderRequest = new CreateOrderRequest();
createOrderRequest.setUserid(Math.floor(Date.now() / 10000));

[1, 2].map(() => {
  const orderItem = new OrderItem();

  orderItem.setProductid(new Date().toISOString());
  orderItem.setQuantity(Math.floor(Date.now() / 10000));
  createOrderRequest.addItems(orderItem);
});

const payload = createOrderRequest.serializeBinary();

axios
  .post("http://localhost:3000", payload, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  })
  .then((response) => {
    const buffer = Buffer.from(response.data);
    const decoded = OrderResponse.deserializeBinary(buffer);

    console.log(decoded.toObject());
  })
  .catch((error) => {
    console.error("Error fetching data:", error.message);
  });

// axios
//   .get("http://localhost:3000", {
//     headers: {
//       "Content-Type": "application/octet-stream",
//     },
//   })
//   .then((response) => {
//     const buffer = Buffer.from(response.data);
//     const decoded = GetOrdersResponse.deserializeBinary(buffer);

//     console.log(decoded.toObject().dataList);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error.message);
//   });
