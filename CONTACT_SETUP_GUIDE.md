# Complete Setup Guide: React Portfolio with Email Contact Form

## 📋 Table of Contents
1. [Project Structure](#project-structure)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Gmail Configuration](#gmail-configuration)
5. [Local Testing](#local-testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 📁 Project Structure

```
illustration-portfolio/
├── src/
│   ├── components/
│   │   ├── Contact.jsx (Updated with Axios integration)
│   │   └── Toast.jsx (New - Toast notifications)
│   └── ...
├── backend/
│   ├── controllers/
│   │   └── contactController.js (Email logic)
│   ├── routes/
│   │   └── contact.js (API route)
│   ├── server.js (Express server)
│   ├── package.json (Backend dependencies)
│   └── .env.example (Backend env variables template)
├── .env.example (Frontend env variables template)
├── .env (Frontend - Create this locally)
├── backend/.env (Backend - Create this locally)
└── ...
```

---

## 🔧 Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `nodemailer` - Email service
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `email-validator` - Email validation

### Step 2: Create `.env` file in `backend/` folder

Copy from `.env.example`:

```bash
# Copy the template
cp .env.example .env
```

Edit `backend/.env`:

```env
# Gmail Configuration
EMAIL=divyanshthakur.2251@gmail.com
APP_PASSWORD=kfmj hqgh hmbr viot

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or Production mode
npm start
```

Expected output:
```
✅ Backend server running on http://localhost:5000
📧 Frontend URL: http://localhost:5173
🔐 Email: divyanshthakur.2251@gmail.com
```

---

## 🎨 Frontend Setup

### Step 1: Install Frontend Dependencies

```bash
npm install axios
```

### Step 2: Create `.env` file in root folder

```bash
# Copy the template
cp .env.example .env
```

Edit `.env`:

```env
# Frontend API URL
VITE_API_URL=http://localhost:5000/api/contact
```

### Step 3: Start Frontend Dev Server

```bash
npm run dev
```

---

## 📧 Gmail Configuration

### Get Gmail App Password

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password:**
   - Go to [App passwords page](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Copy this password (without spaces)

3. **Update Backend `.env`:**
   ```env
   EMAIL=your-email@gmail.com
   APP_PASSWORD=kfmj hqgh hmbr viot  # Without spaces from Google
   ```

### Important Security Notes

⚠️ **Never commit `.env` files to Git!**
- `.env` files are already in `.gitignore`
- Only commit `.env.example` with placeholder values
- Each developer/deployment needs their own `.env`

---

## 🧪 Local Testing

### Test Backend Endpoint

Use Postman or cURL to test the API:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "website": "https://example.com",
    "message": "This is a test message with enough characters"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### Test Frontend Form

1. Open http://localhost:5173
2. Navigate to Contact section
3. Fill the form with test data
4. Click "Get In Touch"
5. You should see:
   - Loading state (button shows "Sending...")
   - Success toast notification
   - Form reset
   - Email in your inbox

### Validate Email Receipt

Check your Gmail inbox (divyanshthakur.2251@gmail.com) for emails with:
- Subject: `New Portfolio Contact - [Visitor Name]`
- Body: Contact details in formatted HTML

---

## 🚀 Deployment

### Option 1: Deploy Backend on Render

1. **Push code to GitHub**
2. **Create Render account** at [render.com](https://render.com)
3. **Create new Web Service:**
   - Connect GitHub repository
   - Select `backend` as root directory
   - Build command: `npm install`
   - Start command: `npm start`
4. **Set Environment Variables:**
   - `EMAIL`: Your Gmail address
   - `APP_PASSWORD`: Your Gmail App Password
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your frontend deployment URL

5. **Update Frontend `.env` for production:**
   ```env
   VITE_API_URL=https://your-backend-url/api/contact
   ```

### Option 2: Deploy Backend on Railway

1. **Push code to GitHub**
2. **Create Railway account** at [railway.app](https://railway.app)
3. **Deploy backend:**
   - Connect GitHub repository
   - Select root directory: `backend`
4. **Set Environment Variables same as Render**

### Option 3: Deploy Backend on Vercel (Serverless)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --cwd backend
```

### Deploy Frontend on Vercel

```bash
vercel
```

---

## 📡 API Endpoints

### POST /api/contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "website": "https://example.com",  // Optional
  "message": "Your message here"
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

### GET /api/health

Check if backend is running.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ✅ Validation Rules

### Backend Validation

| Field | Rules |
|-------|-------|
| name | Required, 2-100 characters |
| email | Required, valid email format |
| website | Optional, valid URL if provided |
| message | Required, 10-5000 characters |

### Frontend Validation

- All required fields check
- Email format validation
- Message length validation (min 10 chars)
- Trim all inputs
- Show appropriate error messages

---

## 🐛 Troubleshooting

### Issue: "Email service authentication failed"

**Solution:**
- Verify App Password is correct (no spaces)
- Re-generate App Password from Google Account
- Ensure 2FA is enabled on Gmail account
- Check EMAIL variable matches Gmail account

### Issue: "CORS Error" in frontend console

**Solution:**
- Ensure backend `.env` has correct FRONTEND_URL
- Backend FRONTEND_URL should match your frontend URL
- For local: `http://localhost:5173`
- For production: `https://your-frontend-url`

### Issue: "Network error" when submitting form

**Solution:**
- Ensure backend is running: `http://localhost:5000/api/health`
- Check frontend `.env` has correct VITE_API_URL
- Check browser console for exact error
- Verify CORS settings in backend/server.js

### Issue: Email not received

**Solution:**
- Check backend logs for errors
- Verify email body was sent correctly
- Check spam/promotions folder
- Test API manually with cURL/Postman
- Verify Gmail app password credentials

### Issue: Form not working on production

**Solution:**
- Update VITE_API_URL in production `.env`
- Ensure backend environment variables are set
- Check backend health: `https://backend-url/api/health`
- Verify CORS allows your frontend domain
- Check browser console for detailed errors

---

## 📝 Email Template Customization

Edit `backend/controllers/contactController.js` - `formatEmailBody()` function to customize email format.

Current format:
```
----------------------------------
New Portfolio Contact

Name: ...
Email: ...
Website: ...
Message: ...
Date & Time: ...
----------------------------------
```

---

## 🔐 Security Best Practices

✅ **Implemented:**
- Environment variables for sensitive data
- Input validation on backend
- Email format validation
- Message length validation
- CORS protection
- Error messages don't leak sensitive info

✅ **Recommendations:**
- Use HTTPS for all communications
- Implement rate limiting (npm: express-rate-limit)
- Add honeypot field to prevent bots
- Monitor error logs
- Consider adding reCAPTCHA

---

## 📦 File Checklist

- [x] `backend/server.js` - Express server
- [x] `backend/routes/contact.js` - API route
- [x] `backend/controllers/contactController.js` - Email logic
- [x] `backend/package.json` - Backend dependencies
- [x] `backend/.env.example` - Backend env template
- [x] `src/components/Contact.jsx` - Updated form with Axios
- [x] `src/components/Toast.jsx` - Toast notifications
- [x] `.env.example` - Frontend env template
- [x] `package.json` - Updated with axios

---

## 🎯 Next Steps

1. ✅ Setup backend `.env` with Gmail credentials
2. ✅ Start backend server (`npm run dev`)
3. ✅ Install frontend dependencies (`npm install axios`)
4. ✅ Create frontend `.env`
5. ✅ Start frontend (`npm run dev`)
6. ✅ Test form locally
7. ✅ Deploy backend to Render/Railway
8. ✅ Deploy frontend to Vercel
9. ✅ Update production environment variables
10. ✅ Test production deployment

---

## 💡 Tips

- Keep `.env` files out of version control
- Use `.env.example` for documentation
- Test locally before deploying
- Monitor backend logs in production
- Set up email notifications for errors
- Consider adding logging to frontend

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review backend logs: `node server.js`
3. Check browser console (F12)
4. Test API with Postman
5. Verify all environment variables are set

---

## 🎉 Congratulations!

Your portfolio contact form with email functionality is now complete! Visitors can send you messages directly, and you'll receive them in your Gmail inbox.

Happy coding! 🚀
