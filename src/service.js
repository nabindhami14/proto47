const path = require("path");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../protobuf/order.proto")
);

const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

const server = new grpc.Server();

server.addService(orderProto.OrderService.service, {
  CreateOrder: async (call, callback) => {
    callback(null, {
      orderId: call.request.userId,
      status: "PENDING",
    });
  },
  GetOrders: async (call, callback) => {
    callback(null, {
      data: [
        {
          productId: "PRO1",
          quantity: 10,
        },
        {
          productId: "PRO2",
          quantity: 20,
        },
      ],
    });
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("SERVER IS UP 50051");
  }
);
