# mkdir -p build && protoc -I=protobuf --js_out=import_style=commonjs,binary:./build protobuf/*.proto
mkdir -p build && protoc --proto_path=protobuf --dart_out=build/gen protobuf/*.proto 
