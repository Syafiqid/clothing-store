# Clothing Store — Web App Catalog

Web app katalog baju dengan admin panel + autentikasi JWT.

## Stack

- **Frontend**: React 18 + Vite + React Router
- **Backend**: Express + JWT + bcrypt
- **Data**: JSON file (server-side)

## Quick Start

```bash
# Install dependencies
cd server && npm install && cd ..
cd client && npm install && cd ..

# Terminal 1 — Backend (port 3001)
cd server && npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

Buka **http://localhost:5173**

## Admin Login

Buka **http://localhost:5173/login** atau klik tombol Admin di header.

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

## Fitur

- Katalog produk responsif (mobile + desktop)
- Search + filter kategori
- Admin panel dengan autentikasi JWT
- CRUD produk via REST API
- Data persist di server-side JSON file

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Login admin |
| GET | `/api/products` | No | List semua produk |
| GET | `/api/products/:id` | No | Detail produk |
| POST | `/api/products` | Yes | Tambah produk |
| PUT | `/api/products/:id` | Yes | Update produk |
| DELETE | `/api/products/:id` | Yes | Hapus produk |
