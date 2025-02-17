const proto = require("../build/test_pb");

const hello = new proto.Hello();

const payload = new proto.TestMessage();
payload.setTimestamp(Math.floor(Date.now() / 1000));
payload.setMessage("Nabin Dhami");

hello.addData(payload);

const message = hello.serializeBinary();

const user = proto.Hello.deserializeBinary(message);

const plainObject = user.toObject();

console.log("Decoded Plain Object:", plainObject.dataList);
