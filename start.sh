#!/bin/bash
set -e

echo "🔧 Installing server dependencies..."
cd server && npm install && cd ..

echo "🔧 Installing client dependencies..."
cd client && npm install && cd ..

echo ""
echo "✅ Done! Jalankan dua terminal:"
echo ""
echo "  Terminal 1 (backend):  cd server && npm run dev"
echo "  Terminal 2 (frontend): cd client && npm run dev"
echo ""
echo "Lalu buka http://localhost:5173"
echo "Admin login: admin / admin123"
