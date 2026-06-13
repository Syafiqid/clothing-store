import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Catalog from './components/Catalog.jsx';
import Admin from './components/Admin.jsx';
import Login from './components/Login.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { api } from './api.js';

export default function App() {
  const { token, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchProducts = async () => {
    try {
      const data = await api('/products');
      setProducts(data);
    } catch (e) {
      console.error('Failed to fetch products:', e);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async (product) => {
    try {
      await api('/products', {
        method: 'POST',
        body: JSON.stringify(product),
      });
      await fetchProducts();
      showToast('✅ Produk ditambahkan');
    } catch (e) {
      showToast('❌ Gagal menambah produk');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api(`/products/${id}`, { method: 'DELETE' });
      await fetchProducts();
      showToast('🗑️ Produk dihapus');
    } catch (e) {
      showToast('❌ Gagal menghapus produk');
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/admin" element={token ? <Admin products={products} onAdd={handleAdd} onDelete={handleDelete} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Catalog products={products} onRefresh={fetchProducts} />} />
      </Routes>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
