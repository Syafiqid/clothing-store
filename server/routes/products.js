import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// GET all products (public)
router.get('/', (_req, res) => {
  const data = db.read();
  res.json(data.products);
});

// GET single product (public)
router.get('/:id', (req, res) => {
  const data = db.read();
  const product = data.products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Produk tidak ditemukan' });
  res.json(product);
});

// CREATE product (admin only)
router.post('/', authenticate, (req, res) => {
  const { name, category, price, priceStrike, desc, image, sizes } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Nama, kategori, dan harga wajib diisi' });
  }
  const data = db.read();
  const product = {
    id: uuid(),
    name, category, price: Number(price),
    priceStrike: priceStrike ? Number(priceStrike) : null,
    desc: desc || '',
    image: image || '',
    sizes: sizes || [],
  };
  data.products.push(product);
  db.write(data);
  res.status(201).json(product);
});

// UPDATE product (admin only)
router.put('/:id', authenticate, (req, res) => {
  const data = db.read();
  const idx = data.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Produk tidak ditemukan' });

  const { name, category, price, priceStrike, desc, image, sizes } = req.body;
  data.products[idx] = {
    ...data.products[idx],
    name: name ?? data.products[idx].name,
    category: category ?? data.products[idx].category,
    price: price != null ? Number(price) : data.products[idx].price,
    priceStrike: priceStrike !== undefined ? (priceStrike ? Number(priceStrike) : null) : data.products[idx].priceStrike,
    desc: desc ?? data.products[idx].desc,
    image: image ?? data.products[idx].image,
    sizes: sizes ?? data.products[idx].sizes,
  };
  db.write(data);
  res.json(data.products[idx]);
});

// DELETE product (admin only)
router.delete('/:id', authenticate, (req, res) => {
  const data = db.read();
  const idx = data.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Produk tidak ditemukan' });
  data.products.splice(idx, 1);
  db.write(data);
  res.json({ success: true });
});

export default router;
