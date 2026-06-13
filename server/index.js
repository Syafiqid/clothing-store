import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure admin user exists
(async () => {
  const data = db.read();
  const admin = data.users.find(u => u.username === 'admin');
  if (admin && admin.password === '$2a$10$placeholder') {
    admin.password = await bcrypt.hash('admin123', 10);
    db.write(data);
    console.log('🔑 Admin password hashed. Default login: admin / admin123');
  }
})();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`🛒 Clothing Store API running on http://localhost:${PORT}`);
});
