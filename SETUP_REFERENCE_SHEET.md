# 📋 Installation & Setup Reference Sheet

## Quick Copy-Paste Commands

### Backend Installation

```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Frontend Installation

```bash
# Install Axios (in root directory)
npm install axios

# Copy environment template
cp .env.example .env
```

---

## Configuration Files

### Create `backend/.env`

Replace with your actual values:

```env
# Gmail Configuration
EMAIL=your-email@gmail.com
APP_PASSWORD=your-16-character-password

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Create `.env` (root directory)

```env
# Frontend API URL
VITE_API_URL=http://localhost:5000/api/contact
```

---

## Start Commands

### Terminal 1 (Backend)

```bash
cd backend
npm run dev
```

### Terminal 2 (Frontend)

```bash
npm run dev
```

---

## Gmail Setup - Step by Step

### 1. Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Look for "2-Step Verification"
3. Click "Enable"
4. Follow Google's prompts to verify

### 2. Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. You should now see "App passwords" option
3. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or your device type)
4. Click "Generate"
5. Google will show a 16-character password
6. **Copy this password** (don't include spaces)
7. Paste in `backend/.env` as `APP_PASSWORD`

### Example

```
APP_PASSWORD: kfmj hqgh hmbr viot
↓
Remove spaces
↓
APP_PASSWORD=kfmjhqghhmbrviot
```

---

## Testing Locally

### Test 1: Backend Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test 2: Submit Contact Form via cURL

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "website": "https://example.com",
    "message": "This is a test message with at least 10 characters"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### Test 3: Frontend Form

1. Open http://localhost:5173
2. Scroll to Contact section
3. Fill out the form:
   - Name: "Your Name"
   - Email: "your@email.com"
   - Website: Leave blank or enter URL
   - Message: "At least 10 characters here"
4. Click "Get In Touch"
5. Look for:
   - ✓ Button shows "Sending..."
   - ✓ Success toast appears
   - ✓ Form clears
   - ✓ Email in your inbox

---

## Common Issues & Quick Fixes

### Issue: "Cannot find module 'nodemailer'"

**Solution:**
```bash
cd backend
npm install
```

### Issue: "CORS Error" in browser console

**Solution:**
1. Check `backend/.env` has correct `FRONTEND_URL`
2. For local: `FRONTEND_URL=http://localhost:5173`
3. Restart backend server

### Issue: "EAUTH" error in backend

**Solution:**
1. Verify Gmail 2FA is enabled
2. Re-generate App Password from [Google](https://myaccount.google.com/apppasswords)
3. Copy WITHOUT spaces
4. Update `backend/.env`
5. Restart backend

### Issue: "Email not received"

**Solution:**
1. Check spam/promotions folder
2. Verify email address in `backend/.env`
3. Test with cURL first
4. Check backend logs for errors

### Issue: Form not submitting

**Solution:**
1. Check both servers running
   - Backend: ✓ http://localhost:5000/api/health
   - Frontend: ✓ http://localhost:5173
2. Check browser console (F12) for errors
3. Check `VITE_API_URL` in frontend `.env`
4. No typos in environment variables

---

## Deployment Checklist

### Before Deploying Backend (Render.com)

- [ ] `backend/.env` created locally
- [ ] Backend runs without errors: `npm run dev`
- [ ] Health check works: `curl http://localhost:5000/api/health`
- [ ] Test email sends successfully
- [ ] Code pushed to GitHub
- [ ] `.env` NOT in git (check .gitignore)

### Before Deploying Frontend (Vercel)

- [ ] `.env` created with correct API URL
- [ ] Frontend runs: `npm run dev`
- [ ] Form works locally
- [ ] `VITE_API_URL` points to production backend URL
- [ ] Code pushed to GitHub

---

## Production Environment Variables

### Backend (Set in Render/Railway Dashboard)

```
EMAIL=your-email@gmail.com
APP_PASSWORD=your-app-password
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-domain.vercel.app
```

### Frontend (Set in Vercel)

```
VITE_API_URL=https://your-backend.onrender.com/api/contact
```

---

## File Locations Quick Reference

```
Root (.env location)
├── backend/
│   ├── .env ← Backend env (CREATE THIS)
│   ├── .env.example ← Template
│   ├── server.js
│   ├── package.json
│   │
│   ├── routes/
│   │   └── contact.js
│   │
│   ├── controllers/
│   │   └── contactController.js
│   │
│   └── node_modules/ ← After npm install
│
├── .env ← Frontend env (CREATE THIS)
├── .env.example ← Template
├── package.json
│
├── src/
│   └── components/
│       ├── Contact.jsx ← Updated
│       └── Toast.jsx ← New
│
└── node_modules/ ← After npm install
```

---

## Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend Dev | 5173 | http://localhost:5173 |
| Backend | 5000 | http://localhost:5000 |
| Gmail SMTP | 587 | gmail (automatic) |

---

## Dependencies Installed

### Backend (in `backend/package.json`)

```json
{
  "express": "^4.18.2",
  "nodemailer": "^6.9.7",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "email-validator": "^2.1.1"
}
```

### Frontend (in root `package.json`)

```json
{
  "axios": "^1.6.2",
  ...
}
```

---

## Validation Rules Cheat Sheet

| Field | Min | Max | Format |
|-------|-----|-----|--------|
| name | 2 | 100 | Any text |
| email | - | - | user@domain.com |
| website | - | - | https://... |
| message | 10 | 5000 | Any text |

---

## Key Files to Remember

- **Contact Form UI:** `src/components/Contact.jsx`
- **Toast Component:** `src/components/Toast.jsx`
- **Main Backend:** `backend/server.js`
- **Email Logic:** `backend/controllers/contactController.js`
- **API Route:** `backend/routes/contact.js`
- **Backend Config:** `backend/.env` (CREATE)
- **Frontend Config:** `.env` (CREATE)

---

## API Endpoint Quick Reference

### POST /api/contact

**URL:** `http://localhost:5000/api/contact`

**Method:** POST

**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "name": "string (2-100 chars)",
  "email": "string (valid email)",
  "website": "string (optional, valid URL)",
  "message": "string (10-5000 chars)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Git Commands

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Add contact form with email integration"

# Push to GitHub
git push origin main
```

---

## Troubleshooting Decision Tree

```
Does form submit? → YES
  │
  ├─ Email received? → YES
  │   └─ ✓ WORKING!
  │
  └─ Email NOT received?
      ├─ Check spam folder
      ├─ Check EMAIL in backend/.env
      ├─ Re-generate App Password
      └─ Restart backend

Does form NOT submit? → Backend not running?
  │
  ├─ YES → Start: cd backend && npm run dev
  ├─ NO → API URL correct?
  │       ├─ YES → Check browser console (F12)
  │       └─ NO → Update VITE_API_URL in .env
  │
  └─ Still not working?
      ├─ Check .env files exist
      ├─ Check no typos
      ├─ Restart both servers
      └─ Read troubleshooting docs
```

---

## Essential Commands Summary

```bash
# Setup
npm install                    # Frontend dependencies
cd backend && npm install     # Backend dependencies

# Development
npm run dev                    # Frontend (root directory)
cd backend && npm run dev     # Backend (in backend folder)

# Testing
curl http://localhost:5000/api/health           # Backend test
curl -X POST http://localhost:5000/api/contact \ # Contact test
  -H "Content-Type: application/json" \
  -d '{...}'

# Deployment
npm run build                  # Build frontend
```

---

## Next Steps Checklist

- [ ] Read `QUICK_START.md` (5 min)
- [ ] Set up Gmail 2FA (2 min)
- [ ] Generate App Password (1 min)
- [ ] Create `.env` files (1 min)
- [ ] Run `npm install` commands (5 min)
- [ ] Start both servers (1 min)
- [ ] Test contact form (2 min)
- [ ] Check email (1 min)
- [ ] Read deployment guide (15 min)
- [ ] Deploy to production (20 min)

**Total Setup: ~40 minutes to production** ⏱️

---

## Resources

- **Gmail Setup:** https://support.google.com/accounts/answer/185833
- **Nodemailer Docs:** https://nodemailer.com/
- **Express Guide:** https://expressjs.com/
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

## Quick Support

**Backend won't start?**
```bash
cd backend
npm install  # Reinstall deps
npm run dev  # Try again
```

**Email not sending?**
```bash
# Check credentials in backend/.env
# Re-generate Gmail App Password
# Restart backend server
```

**Form not connecting?**
```bash
# Verify VITE_API_URL in .env
# Check backend health: curl http://localhost:5000/api/health
# Check browser console (F12) for errors
```

---

**Need detailed help?**
- Start: `README_CONTACT_FORM.md`
- Setup: `CONTACT_SETUP_GUIDE.md`
- API: `API_DOCUMENTATION.md`
- Deploy: `DEPLOYMENT_GUIDE.md`
- Diagrams: `ARCHITECTURE_DIAGRAMS.md`

🚀 **Happy coding!**
