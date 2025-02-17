mkdir -p build && protoc -I=protobuf --js_out=import_style=commonjs,binary:./build protobuf/*.proto
