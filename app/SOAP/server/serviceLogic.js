const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load proto
const PROTO_PATH = path.join(__dirname, '../../gRPC/inventory.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const InventoryService = grpcObject.inventory.InventoryService;

// Buat koneksi gRPC client
const client = new InventoryService('grpc-service:5000', grpc.credentials.createInsecure());

module.exports = {
  InventoryService: {
    InventoryPort: {
      getItemById: ({ id }) => {
        return new Promise((resolve) => {
          client.GetItemById({ id: parseInt(id) }, (err, response) => {
            if (err) {
              console.error('[SOAP?gRPC] getItemById error:', err.message);
              return resolve({ id: 0, name: 'Not Found' });
            }
            console.log('[SOAP?gRPC] getItemById ?', response);
            resolve(response);
          });
        });
      },

      getAllItems: () => {
        // Belum ada method gRPC-nya, bisa di-extend nanti
        return Promise.resolve({ items: [] });
      },

      addItem: ({ name }) => {
        // Belum ada method gRPC-nya, dummy response
        return Promise.resolve({ id: 999, name });
      },

      deleteItem: ({ id }) => {
        // Belum ada method gRPC-nya, dummy response
        return Promise.resolve({ success: true });
      }
    }
  }
};

