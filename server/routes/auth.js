import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib' });
  }

  const data = db.read();
  const user = data.users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Username atau password salah' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Username atau password salah' });
  }

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

router.get('/me', (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token diperlukan' });
  }
  try {
    const jwt = await import('jsonwebtoken');
    const token = header.split(' ')[1];
    const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'clothing-store-secret-change-me');
    res.json({ id: decoded.id, username: decoded.username, role: decoded.role });
  } catch {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
});

export default router;
