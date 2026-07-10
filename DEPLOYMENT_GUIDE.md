# Deployment Guide

## 🌐 Deploy Backend to Render.com (Free tier)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add contact form backend"
git push origin main
```

### Step 2: Create Render Account

Visit [render.com](https://render.com) and sign up.

### Step 3: Create New Web Service

1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** portfolio-backend
   - **Root Directory:** backend
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 4: Set Environment Variables

In Render dashboard, add to Environment:

```
EMAIL=your-email@gmail.com
APP_PASSWORD=your-16-char-password
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 5: Deploy

Click "Deploy" and wait 2-3 minutes.

Your backend URL will be: `https://portfolio-backend-xxxx.onrender.com`

---

## 🎨 Deploy Frontend to Vercel (Free tier)

### Step 1: Create Vercel Account

Visit [vercel.com](https://vercel.com) and sign up with GitHub.

### Step 2: Import Project

1. Click "Add New"
2. Select "Project"
3. Select your GitHub repository
4. Vercel auto-detects Vite setup

### Step 3: Set Environment Variables

In Vercel dashboard, add to Environment Variables:

```
VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api/contact
```

### Step 4: Deploy

Click "Deploy" and wait.

Your frontend URL will be: `https://your-portfolio.vercel.app`

---

## ⚙️ Update Configuration

After deployment, update `.env` files:

### Frontend `.env` (production)
```env
VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api/contact
```

### Backend `.env` (production in Render)
```
FRONTEND_URL=https://your-portfolio.vercel.app
```

---

## ✅ Verify Deployment

### Test Backend Health
```
https://portfolio-backend-xxxx.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Contact Form

1. Fill form on deployed frontend
2. Submit
3. Check your Gmail inbox

---

## 🔄 Troubleshooting Deployment

### Issue: Backend shows "Error" on Render

**Solution:**
- Check Environment Variables are set
- View Render logs: Dashboard → Logs
- Verify `EMAIL` and `APP_PASSWORD` are correct
- Re-generate Gmail App Password

### Issue: Frontend shows CORS error

**Solution:**
- Update `FRONTEND_URL` in Render environment
- Wait 5 minutes for redeploy
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: "Cannot POST /api/contact"

**Solution:**
- Verify backend URL is correct in frontend `.env`
- Check backend is running: Visit `/api/health`
- Redeploy backend and frontend

---

## 💰 Cost Estimate

| Service | Plan | Cost |
|---------|------|------|
| Render | Starter (backend) | Free (sleep after 15 min inactive) |
| Vercel | Hobby (frontend) | Free |
| Gmail | Gmail SMTP | Free |

**Total: $0/month**

---

## 🚀 Advanced: Custom Domain

### Add Custom Domain on Vercel
1. Go to Project Settings
2. Domains
3. Add your custom domain
4. Follow DNS instructions

### Add Custom Domain on Render
1. Go to Project Settings
2. Custom Domain
3. Add your custom domain
4. Update DNS records

---

## 📊 Monitor Production

### Render Dashboard
- View logs
- Monitor CPU/Memory usage
- Check restart events

### Vercel Analytics
- Monitor deployment history
- Check performance metrics
- View error logs

---

## 🔒 Security Checklist

- [x] Don't commit `.env` files
- [x] Use `.env.example` templates
- [x] Set production environment variables
- [x] Enable HTTPS (automatic on Vercel/Render)
- [x] Gmail App Password (not actual password)
- [x] CORS configured for frontend domain

---

## 📝 After Deployment

1. Test contact form thoroughly
2. Monitor logs for errors
3. Set up email backup (in case Gmail fails)
4. Consider adding error notifications
5. Plan for scaling if needed

---

## 🎯 Next: Keep Backend Awake

Render free tier sleeps after 15 minutes. To keep it running:

### Option 1: Render Standard Plan ($7/month)
- Automatic uptime
- Better performance

### Option 2: Keep-Alive Service
- Use [cron-job.org](https://cron-job.org) to ping `/api/health` every 10 minutes
- Free service to prevent sleeping

### Option 3: Railway.app
- Alternative to Render
- Better free tier pricing
- $5 per month included credits

---

## 🆘 Need Help?

Check troubleshooting in:
- `CONTACT_SETUP_GUIDE.md` (Local issues)
- `QUICK_START.md` (Quick reference)
- Render/Vercel documentation
- Backend server logs
