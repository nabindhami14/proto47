/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pkg = (function() {

    /**
     * Namespace pkg.
     * @exports pkg
     * @namespace
     */
    var pkg = {};

    pkg.TestMessage = (function() {

        /**
         * Properties of a TestMessage.
         * @memberof pkg
         * @interface ITestMessage
         * @property {number|Long|null} [timestamp] TestMessage timestamp
         * @property {string|null} [message] TestMessage message
         */

        /**
         * Constructs a new TestMessage.
         * @memberof pkg
         * @classdesc Represents a TestMessage.
         * @implements ITestMessage
         * @constructor
         * @param {pkg.ITestMessage=} [properties] Properties to set
         */
        function TestMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TestMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof pkg.TestMessage
         * @instance
         */
        TestMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * TestMessage message.
         * @member {string} message
         * @memberof pkg.TestMessage
         * @instance
         */
        TestMessage.prototype.message = "";

        /**
         * Creates a new TestMessage instance using the specified properties.
         * @function create
         * @memberof pkg.TestMessage
         * @static
         * @param {pkg.ITestMessage=} [properties] Properties to set
         * @returns {pkg.TestMessage} TestMessage instance
         */
        TestMessage.create = function create(properties) {
            return new TestMessage(properties);
        };

        /**
         * Encodes the specified TestMessage message. Does not implicitly {@link pkg.TestMessage.verify|verify} messages.
         * @function encode
         * @memberof pkg.TestMessage
         * @static
         * @param {pkg.ITestMessage} message TestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified TestMessage message, length delimited. Does not implicitly {@link pkg.TestMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pkg.TestMessage
         * @static
         * @param {pkg.ITestMessage} message TestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TestMessage message from the specified reader or buffer.
         * @function decode
         * @memberof pkg.TestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pkg.TestMessage} TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pkg.TestMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TestMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pkg.TestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pkg.TestMessage} TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TestMessage message.
         * @function verify
         * @memberof pkg.TestMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TestMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a TestMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pkg.TestMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pkg.TestMessage} TestMessage
         */
        TestMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.pkg.TestMessage)
                return object;
            var message = new $root.pkg.TestMessage();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a TestMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pkg.TestMessage
         * @static
         * @param {pkg.TestMessage} message TestMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TestMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.message = "";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this TestMessage to JSON.
         * @function toJSON
         * @memberof pkg.TestMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TestMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TestMessage
         * @function getTypeUrl
         * @memberof pkg.TestMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TestMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pkg.TestMessage";
        };

        return TestMessage;
    })();

    return pkg;
})();

module.exports = $root;
