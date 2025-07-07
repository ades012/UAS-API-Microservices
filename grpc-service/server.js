const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const sqlite3 = require('better-sqlite3');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'protos', 'inventory.proto');
const db = new sqlite3('/data/inventory.db');

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const inventory = grpcObj.inventory;

function GetItemById(call, callback) {
  const id = call.request.id;
  console.log(`[gRPC SERVER] Permintaan getItemById(${id}) diterima`);

  const row = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  if (row) {
    callback(null, { id: row.id, name: row.name });
  } else {
    callback(null, { id: 0, name: 'Not Found' });
  }
}

const server = new grpc.Server();
server.addService(inventory.InventoryService.service, { GetItemById });
server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running at port 5000');
  server.start();
});
