import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'data.json');

const defaultData = {
  users: [{ id: 'admin-1', username: 'admin', password: '$2a$10$placeholder', role: 'admin' }],
  products: [
    { id: '1', name: 'Kaos Polos Premium', category: 'atasan', price: 150000, priceStrike: 200000, desc: 'Cotton combed 30s, nyaman dipakai sehari-hari.', image: '', sizes: ['S','M','L','XL'] },
    { id: '2', name: 'Kemeja Linen Santai', category: 'atasan', price: 280000, priceStrike: null, desc: 'Bahan linen breathable, cocok untuk casual.', image: '', sizes: ['M','L','XL'] },
    { id: '3', name: 'Celana Chino Slim', category: 'bawahan', price: 320000, priceStrike: 400000, desc: 'Potongan slim fit, material stretch nyaman.', image: '', sizes: ['28','30','32','34'] },
    { id: '4', name: 'Blazer Oversized', category: 'outerwear', price: 550000, priceStrike: null, desc: 'Blazer oversized cutting modern.', image: '', sizes: ['M','L'] },
    { id: '5', name: 'Dress Batik Modern', category: 'dress', price: 420000, priceStrike: 500000, desc: 'Batik tulis kontemporer.', image: '', sizes: ['S','M','L'] },
    { id: '6', name: 'Bucket Hat', category: 'aksesoris', price: 85000, priceStrike: null, desc: 'Topi bucket dengan tali adjustable.', image: '', sizes: ['One Size'] },
  ],
};

function read() {
  if (!existsSync(DB_PATH)) {
    writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function write(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export default { read, write };
