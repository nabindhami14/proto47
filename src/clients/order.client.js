const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

class OrderClient {
  constructor() {
    this.client = null;
    this.init();
  }

  init() {
    const packageDefinition = protoLoader.loadSync(
      path.resolve(__dirname, "../../protobuf/order.proto"),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        arrays: true,
      }
    );

    const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

    this.client = new orderProto.OrderService(
      "localhost:50051",
      grpc.credentials.createInsecure()
    );
  }

  createOrder(payload) {
    return new Promise((resolve, reject) => {
      this.client.CreateOrder(payload, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  close() {
    if (this.client) {
      grpc.closeClient(this.client);
    }
  }
}

module.exports = new OrderClient();
