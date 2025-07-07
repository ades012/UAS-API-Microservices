# 📦 Inventory Management API

Sistem manajemen inventaris perangkat jaringan, CCTV, dan telepon

---

## ✨ Fitur

- CRUD (Create, Read, Update, Delete) untuk:
  - Item
  - Kategori
  - Lokasi
  - Supplier
- Update stok barang
- Query data secara fleksibel menggunakan GraphQL
- Database ringan menggunakan SQLite

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Express.js
- GraphQL
- better-sqlite3 (SQLite driver)
- dotenv

---

## 📁 Struktur Folder

```
inventory-api/
├── app-service/                # Service utama (GraphQL + SOAP)
│   ├── app.js
│   ├── .env
│   ├── db/
│   │   └── database.js
│   ├── schema/
│   │   ├── resolvers.js
│   │   └── typeDefs.js
│   └── SOAP/
│       ├── serviceLogic.js
│       ├── wsdl/
│       │   └── inventory.wsdl
│       └── server.js
├── grpc-service/              # Service gRPC
│   ├── server.js
│   ├── proto/
│   │   └── inventory.proto
│   └── db/
│       └── database.js
├── shared-data/               # Volume shared SQLite DB
├── docker-compose.yml
└── README.md
```

## ERD

![ERD](assets/ERD.jpg)

---

## 🚀 Instalasi dan Menjalankan Project

1. **Clone repository ini:**

```bash
git clone https://github.com/ades012/UAS-API-Microservices.git
cd UAS-API-Microservices
```

2. **Buat file **.env** di folder app/ dan isi:**

```env
PORT=3000
DB_PATH=inventory.db
```

3. **Jalankan Docker Compose::**

```bash
docker-compose up --build
```



Server akan berjalan di:

> GraphQL: http://localhost:3000/graphql

> SOAP WSDL: http://localhost:3000/wsdl

> gRPC: localhost:5000

---

## 🧪 Contoh Query GraphQL

### 🔹 Menambah Kategori Barang

```graphql
mutation {
  addCategory(name: "Router") {
    id
    name
  }
}
```

### 🔹 Menambah Lokasi

```graphql
mutation {
  addLocation(name: "Gudang 1") {
    id
    name
  }
}
```

### 🔹 Menambah Supplier / Vendor

```graphql
mutation {
  addSupplier(name: "PT Comtronics Systems", contact: "08123456789") {
    id
    name
    contact
  }
}
```


### 🔹 Menambah Item

```graphql
mutation {
  addItem(
    name: "Mikrotik RB450",
    category_id: 1,
    location_id: 1,
    supplier_id: 1,
    condition: "Baru"
  ) {
    id
    name
    condition
  }
}
```

### 🔹 Mengambil Semua Item

```graphql
query {
  items {
    id
    name
    condition
    category {
      name
    }
    location {
      name
    }
    supplier {
      name
    }
  }
}
```

### 🔹 Update Stok Barang

```graphql
mutation {
  updateStock(item_id: 1, quantity: 5) {
    id
    quantity
    updated_at
  }
}
```

### 🔹 Hapus Item

```graphql
mutation {
  deleteItem(id: 1)
}
```

## 🧪 Contoh Permintaan SOAP

### 🔹  Mendapatkan Item Berdasarkan ID

```<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/inventory">
  <soap:Body>
    <tns:getItemById>
      <tns:id>1</tns:id>
    </tns:getItemById>
  </soap:Body>
</soap:Envelope>
```

### 🔹  Menambahkan Item via SOAP

``<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/inventory">
  <soap:Body>
    <tns:addItem>
      <tns:name>Ubiquiti EdgeRouter</tns:name>
    </tns:addItem>
  </soap:Body>
</soap:Envelope>
```

---

## 📜 Lisensi

Proyek ini dikembangkan untuk keperluan pembelajaran dan tugas akademik.\
Hak cipta © 2025 Agung Deli Septian.

---

