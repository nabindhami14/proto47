# BUFFERS IN NODEJS

**_Buffers in Node.js are a fundamental data structure used to handle binary data directly. They are instances of the Buffer class, which provides a way to work with raw binary data in a way that is similar to working with arrays of integers, but with a focus on performance and low-level manipulation._**

- **Binary Data:** Buffers are used to represent sequences of bytes, which are useful for handling data from files, network streams, or other sources that deal with binary data.
- **Fixed Size:** A Buffer has a fixed size, which is determined when it is created. This size cannot be changed after creation.
- **Encoding/Decoding:** Buffers can be used to convert between different character encodings (e.g., UTF-8, ASCII, Base64) and binary data.
- **Serialization/Deserialization:** Buffers are often used in the process of serializing (converting data to a format suitable for storage or transmission) and deserializing (converting data back to its original form).

```js
// Create a buffer of size 10 bytes
const buf1 = Buffer.alloc(10);

// Create a buffer from an array of bytes
const buf2 = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

// Create a buffer from a string
const buf3 = Buffer.from("Hello World", "utf8");
```

## ENCODING | DECODING

**_Buffers can be used to encode and decode data between different formats. For example, you can convert a string to a Buffer and then back to a string:_**

```sh
CHARACTER ENCODING
    - ASCII
    - UTF-8
    - UTF-16
    - UTF-32
BINARY ENCODING
    - RAW BINARY
    - BASE 64
    - HEX ENCODING
```

```js
const buf = Buffer.from("Hello World", "utf8");

// Encoding: Convert string to buffer
console.log(buf); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>

// Decoding: Convert buffer to string
const str = buf.toString("utf8");
console.log(str); // Hello World

// Base64 Encoding
const base64 = buf.toString("base64");
console.log(base64); // SGVsbG8gV29ybGQ=

// Hex Encoding
const hex = buf.toString("hex");
console.log(hex); // 48656c6c6f20576f726c64

// Decoding from Base64
const bufFromBase64 = Buffer.from(base64, "base64");
console.log(bufFromBase64.toString("utf8")); // Hello World

// Decoding from Hex
const bufFromHex = Buffer.from(hex, "hex");
console.log(bufFromHex.toString("utf8")); // Hello World
```

## SERIALIZATION AND DESERIALIZATION

**_Buffers are often used in serialization and deserialization processes, especially when dealing with binary protocols or file formats._**

**_Serialization is the process of converting an object or data structure into a format that can be stored or transmitted. In the context of Buffers, this often means converting data into a binary format._**

```js
const obj = { name: "Alice", age: 25 };
const jsonString = JSON.stringify(obj);

const buf = Buffer.from(jsonString, "utf8");
```

**_Deserialization is the reverse process, where you convert the serialized data back into its original form._**

```js
const jsonString = buf.toString("utf8");
const obj = JSON.parse(jsonString);

console.log(obj);
```

> [Do you want a better understanding of Buffer in Node.js? Check this out.](https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/)

## HELPER FUNCTION

```js
function populateProtobufMessage(protoInstance, data) {
  for (const key in data) {
    const methodName = `set${key[0].toUpperCase()}${key
      .slice(1)
      .toLowerCase()}`;

    if (methodName in protoInstance) {
      protoInstance[methodName](data[key]);
    }
  }
  return protoInstance;
}
```

```js
class ExampleClass {
  setSymbol(value) {
    this.symbol = value;
  }
  setFiscalyear(value) {
    this.fiscalYear = value;
  }
  setCash(value) {
    this.cash = value;
  }
  setBonus(value) {
    this.bonus = value;
  }
  setBookclosingdate(value) {
    this.bookClosingDate = value;
  }
  setTotal(value) {
    this.total = value;
  }
  setAnnouncementdate(value) {
    this.announcementDate = value;
  }
}
```

```js
const data = {
  symbol: "AAPL",
  fiscalYear: "2023",
  cash: 5.0,
  bonus: 2.0,
  bookClosingDate: "2023-02-01",
  total: 7.0,
  announcementDate: "2023-01-15",
};

const exampleObject = new ExampleClass();
populateProtobufMessage(exampleObject, data);

console.log(exampleObject);
```
