import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const CATEGORIES = ['atasan', 'bawahan', 'outerwear', 'dress', 'aksesoris'];
const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function Admin({ products, onAdd, onDelete }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', category: 'atasan', price: '', priceStrike: '',
    desc: '', image: '', sizes: ['M', 'L'],
  });

  const toggleSize = (s) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(s)
        ? prev.sizes.filter(x => x !== s)
        : [...prev.sizes, s],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    onAdd({
      ...form,
      price: Number(form.price),
      priceStrike: form.priceStrike ? Number(form.priceStrike) : null,
    });
    setForm({ name: '', category: 'atasan', price: '', priceStrike: '', desc: '', image: '', sizes: ['M', 'L'] });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/" className="btn btn-outline btn-sm">🏠 Katalog</Link>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
      <div className="admin-content">
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
          Login sebagai: <strong>{user?.username}</strong>
        </p>

        <h3 style={{ marginBottom: 16 }}>➕ Tambah Produk</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Produk</label>
            <input type="text" placeholder="Kaos Polos Premium" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Kategori</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Harga (Rp)</label>
              <input type="number" placeholder="150000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} min="0" />
            </div>
            <div className="form-group">
              <label>Harga Coret (opsional)</label>
              <input type="number" placeholder="200000" value={form.priceStrike} onChange={e => setForm({ ...form, priceStrike: e.target.value })} min="0" />
            </div>
          </div>
          <div className="form-group">
            <label>Deskripsi</label>
            <textarea placeholder="Bahan cotton combed 30s..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
          </div>
          <div className="form-group">
            <label>URL Gambar (opsional)</label>
            <input type="text" placeholder="https://..." value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Ukuran</label>
            <div className="size-checkboxes">
              {SIZE_OPTIONS.map(s => (
                <label key={s}>
                  <input type="checkbox" checked={form.sizes.includes(s)} onChange={() => toggleSize(s)} /> {s}
                </label>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
            Tambah Produk
          </button>
        </form>

        <div className="product-list">
          <h3 style={{ marginBottom: 12 }}>📦 Daftar Produk ({products.length})</h3>
          {products.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>Belum ada produk.</p>
          ) : (
            products.map(p => (
              <div className="product-item" key={p.id}>
                <div className="info">
                  <div className="name">{p.name}</div>
                  <div className="meta">{p.category} · Rp {p.price.toLocaleString('id-ID')} · {p.sizes.join(', ')}</div>
                </div>
                <div className="actions">
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(p.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
