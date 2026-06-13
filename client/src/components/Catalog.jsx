import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const CATEGORIES = [
  { value: '', label: 'Semua Kategori' },
  { value: 'atasan', label: 'Atasan' },
  { value: 'bawahan', label: 'Bawahan' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'dress', label: 'Dress' },
  { value: 'aksesoris', label: 'Aksesoris' },
];

export default function Catalog({ products }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { token, logout } = useAuth();

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <div className="header">
        <h1>👕 Katalog Baju</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {token ? (
            <>
              <Link to="/admin" className="btn btn-outline btn-sm">⚙️ Admin</Link>
              <button className="btn btn-outline btn-sm" onClick={() => { logout(); }}>🚪 Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm">🔐 Admin</Link>
          )}
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Cari baju..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="category-select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">👔</div>
          <p>Produk tidak ditemukan.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filtered.map(p => (
            <div className="card" key={p.id}>
              {p.image ? (
                <img className="card-img" src={p.image} alt={p.name} loading="lazy" />
              ) : (
                <div className="card-img">👕</div>
              )}
              <div className="card-body">
                <div className="card-category">{p.category}</div>
                <div className="card-title">{p.name}</div>
                <div className="card-desc">{p.desc}</div>
                <div className="card-price">
                  Rp {p.price.toLocaleString('id-ID')}
                  {p.priceStrike && (
                    <span style={{ textDecoration: 'line-through', color: '#999', fontWeight: 400, fontSize: 13, marginLeft: 6 }}>
                      Rp {p.priceStrike.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
                <div className="card-sizes">
                  {p.sizes.map(s => <span className="size-tag" key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
