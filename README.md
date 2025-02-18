```js
const protobuf = require("protobufjs");

async function encodeTestMessage(payload) {
  const root = await protobuf.load("./protobuf/test.proto");
  const testMessage = root.lookupType("testpackage.testMessage");
  const message = testMessage.create(payload);
  return testMessage.encode(message).finish();
}

async function decodeTestMessage(buffer) {
  const root = await protobuf.load("./protobuf/test.proto");
  const testMessage = root.lookupType("testpackage.testMessage");
  const err = testMessage.verify(buffer);
  if (err) {
    throw err;
  }
  const message = testMessage.decode(buffer);
  return testMessage.toObject(message);
}

async function testProtobuf() {
  const payload = {
    timestamp: Math.round(new Date().getTime() / 1000),
    message: "A rose by any other name would smell as sweet",
  };
  console.log("Test message:", payload);

  const buffer = await encodeTestMessage(payload);
  console.log(
    `Encoded message (${buffer.length} bytes): `,
    buffer.toString("hex")
  );

  const decodedMessage = await decodeTestMessage(buffer);
  console.log("Decoded test message:", decodedMessage);
}

testProtobuf();
```

## SERIALIZING AND DESERIALIZATION

```js
const hello = new proto.Hello();

const payload = new proto.TestMessage();
payload.setTimestamp(Math.floor(Date.now() / 1000));
payload.setMessage("Nabin Dhami");

hello.addData(payload);

const message = hello.serializeBinary();
```

> **_When encoding (serializing), you are creating new data, so you must explicitly instantiate objects and set their values._** You need to define what data you are sending. A new message does not exist in memory until you create it.

```js
const user = proto.Hello.deserializeBinary(message);

console.log(user.toObject());
```

> **_When decoding (deserializing), Protocol Buffers already know the structure of the message and automatically construct the instances for you._** The serialized binary format already contains the structure and values. `deserializeBinary()` automatically reconstructs the message by creating instances internally. You don’t need to manually set fields because the data is already encoded in the binary message.

## PROTOBUF JS VS PROTOC

---

```sh
npx pbjs -t static-module -w commonjs -o build/bundle.js protobuf/test.proto

protoc -I=protobuf --js_out=import_style=commonjs,binary:./build protobuf/test.proto
```

| Feature              | `npx pbjs` (protobuf.js)          | `protoc` (official compiler)            |
| -------------------- | --------------------------------- | --------------------------------------- |
| Compiler             | `protobufjs` (pure JS)            | `protoc` (C++)                          |
| Dependencies         | No native dependencies            | Requires `protoc` and `google-protobuf` |
| Output Type          | Self-contained JS file            | Requires `google-protobuf` runtime      |
| Performance          | Slower                            | Faster (optimized binary)               |
| Serialization Format | JSON-like encoding                | Binary encoding (smaller & faster)      |
| Use Case             | Works well in browser and Node.js | Best for performance in Node.js         |

---

> [GOOGLE PROTOBUF](https://www.npmjs.com/package/google-protobuf)  
> [How Protobuf Works—The Art of Data Encoding](https://victoriametrics.com/blog/go-protobuf/)  
> [gRPC - Best Practice](https://kreya.app/blog/grpc-best-practices/)  
> [Language Guide (proto 3)](https://protobuf.dev/programming-guides/proto3/)

##

```sh
+------------------+         Kafka Broker         +------------------+
|  Order Service  |  ----->  Topic: "orders" ---->  Payment Service  |
|  (Producer)     |         (Protobuf Message)    |  (Consumer)      |
+------------------+                              +------------------+
```

##

```js
const proto = require("../build/order_pb");

const payload =
  "10,13,49,55,51,57,55,55,57,54,53,54,51,52,55,18,7,80,69,78,68,73,78,71";
const response = proto.OrderResponse.deserializeBinary(
  Buffer.from(payload, "base64")
);

console.log("Decoded Plain Object:", response.toObject());
```

```js
const response = {
  0: 10,
  1: 13,
  2: 49,
  3: 55,
  4: 51,
  5: 57,
  6: 55,
  7: 56,
  8: 48,
  9: 55,
  10: 48,
  11: 50,
  12: 50,
  13: 52,
  14: 53,
  15: 18,
  16: 7,
  17: 80,
  18: 69,
  19: 78,
  20: 68,
  21: 73,
  22: 78,
  23: 71,
};

// Step 1: Convert to an array of bytes
const byteArray = Object.values(response);

// Step 2: Create a Buffer from the byte array
const buffer = Buffer.from(byteArray);

// Step 3: Deserialize using protobuf (if this is a serialized protobuf response)
const proto = require("../build/order_pb");
const decodedResponse = proto.OrderResponse.deserializeBinary(buffer);

// Step 4: Output the decoded plain object
console.log("Decoded Plain Object:", decodedResponse.toObject());
```

---

```js
app.use(express.raw({ type: "application/octet-stream" }));
```

> **_This middleware tells Express to parse incoming requests with a `Content-Type` of `application/octet-stream` and make the raw binary data available in `req.body` as a `Buffer`. When handling raw binary data, such as files, encrypted payloads, or custom binary protocols, you don't want Express to parse the request into JSON or URL-encoded data._**
