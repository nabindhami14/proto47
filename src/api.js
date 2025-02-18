const express = require("express");

const { CreateOrder, GetOrders } = require("./controllers/order.controller");

const app = express();

app.use((req, res, next) => {
  const contentType = req.headers["content-type"];
  if (contentType === "application/octet-stream") {
    return express.raw({ type: "application/octet-stream" })(req, res, next);
  }
  return express.json()(req, res, next);
});

app.post("/", CreateOrder);
app.get("/", GetOrders);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
