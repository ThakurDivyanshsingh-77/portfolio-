# 🚀 Quick Start: Contact Form Setup (5 minutes)

## Backend Setup (Terminal 1)

```bash
cd backend
npm install
cp .env.example .env
```

**Edit `backend/.env`:**
```
EMAIL=your-email@gmail.com
APP_PASSWORD=your-16-char-app-password
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Start backend:**
```bash
npm run dev
```

Output should show:
```
✅ Backend server running on http://localhost:5000
```

---

## Frontend Setup (Terminal 2)

```bash
npm install axios
cp .env.example .env
npm run dev
```

**Edit `.env`:**
```
VITE_API_URL=http://localhost:5000/api/contact
```

---

## ✅ Test It

1. Open http://localhost:5173
2. Go to Contact section
3. Fill form and submit
4. Check your Gmail inbox!

---

## 📧 Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste in `backend/.env` as `APP_PASSWORD`

---

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| "CORS Error" | Check `FRONTEND_URL` in `backend/.env` |
| "Auth failed" | Re-generate Gmail App Password |
| "404 Not found" | Ensure backend is running on port 5000 |
| "Email not received" | Check spam folder, verify credentials |

---

For detailed setup, see [CONTACT_SETUP_GUIDE.md](./CONTACT_SETUP_GUIDE.md)
