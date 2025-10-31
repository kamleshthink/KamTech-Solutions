# KamTech Solutions - Render Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/kamleshthink/KamTech-Solutions
- Render account (Free tier works)
- MongoDB Atlas account (for database)
- Gmail account (for email notifications)
- Cloudinary account (for file uploads)

---

## Backend Deployment on Render

### Step 1: Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `kamleshthink/KamTech-Solutions`

### Step 2: Configure Service
```
Name: kamtech-backend
Region: Singapore (or closest to you)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### Step 3: Environment Variables
Add these in Render Dashboard → Environment:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here_change_this_to_random_string
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=noreply@kamleshsharma.com
CONTACT_EMAIL=kamleshsharma@gmail.com
FRONTEND_URL=https://kamtech-solutions.onrender.com
ADMIN_EMAIL=admin@kamleshsharma.com
ADMIN_PASSWORD=YourSecurePassword123!
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Note your backend URL: `https://kamtech-backend.onrender.com`

---

## Frontend Deployment on Render

### Step 1: Create New Static Site
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository: `kamleshthink/KamTech-Solutions`

### Step 2: Configure Service
```
Name: kamtech-frontend
Branch: main
Root Directory: kamlesh-portfolio
Build Command: npm install && npm run build
Publish Directory: build
```

### Step 3: Environment Variables
Add these in Render Dashboard → Environment:

```env
NODE_VERSION=18.17.0
REACT_APP_API_URL=https://kamtech-backend.onrender.com
```

### Step 4: Deploy
1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. Your site will be live at: `https://kamtech-solutions.onrender.com`

---

## MongoDB Atlas Setup

### Step 1: Create Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **Free Cluster** (M0)
3. Choose **Singapore** region (or closest)
4. Create a database user with username and password

### Step 2: Get Connection String
1. Click **"Connect"** → **"Connect your application"**
2. Copy connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kamleshportfolio?retryWrites=true&w=majority
   ```
3. Replace `<username>` and `<password>` with your credentials
4. Add this to Render Backend → `MONGODB_URI`

### Step 3: Whitelist IP
1. Go to **Network Access** in MongoDB Atlas
2. Click **"Add IP Address"**
3. Choose **"Allow access from anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

---

## Gmail App Password Setup

### For Email Notifications

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select **"Mail"** and **"Other (Custom name)"**
5. Enter: "KamTech Solutions"
6. Click **"Generate"**
7. Copy the 16-character password
8. Add to Render Backend → `EMAIL_PASS`

---

## Cloudinary Setup

### For File Uploads

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a **free account**
3. Go to **Dashboard**
4. Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
5. Add these to Render Backend environment variables

---

## Custom Domain Setup (Optional)

### Backend Domain
1. Go to Render Backend Service → **Settings**
2. Click **"Add Custom Domain"**
3. Add: `api.kamtechsolutions.com`
4. Add CNAME record in your DNS:
   ```
   CNAME: api → kamtech-backend.onrender.com
   ```

### Frontend Domain
1. Go to Render Static Site → **Settings**
2. Click **"Add Custom Domain"**
3. Add: `kamtechsolutions.com` or `www.kamtechsolutions.com`
4. Add A/CNAME records as shown by Render

---

## Important Notes

### Free Tier Limitations
- **Spin down after 15 minutes of inactivity**
- First request after spin down takes 30-50 seconds
- 750 hours/month (enough for 1 service running 24/7)

### Solution for Spin Down
Add a cron job to ping your backend every 14 minutes:
- Use [cron-job.org](https://cron-job.org)
- URL to ping: `https://kamtech-backend.onrender.com/`
- Schedule: Every 14 minutes

### Security Checklist
- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET (random 32+ character string)
- [ ] Enable CORS only for your frontend domain
- [ ] Keep .env files in .gitignore
- [ ] Use environment variables, never hardcode secrets
- [ ] Enable MongoDB IP whitelist
- [ ] Use Gmail App Password (not actual password)

---

## Testing After Deployment

### Backend Health Check
Visit: `https://kamtech-backend.onrender.com/`
Should return: Server status or API info

### Frontend Check
Visit: `https://kamtech-solutions.onrender.com/`
Should load: KamTech Solutions homepage

### Booking Form Test
1. Click **"Hire Us Now"** button
2. Fill the booking form
3. Submit
4. Check email for confirmation

---

## Troubleshooting

### Backend not starting
- Check logs in Render Dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend not loading
- Check build logs
- Verify `REACT_APP_API_URL` points to backend
- Clear browser cache

### Email not sending
- Verify Gmail App Password (not regular password)
- Check EMAIL_USER and EMAIL_PASS in environment variables
- Ensure 2-Step Verification is enabled on Gmail

### File upload not working
- Verify Cloudinary credentials
- Check Cloudinary dashboard for upload logs
- Ensure API key and secret are correct

---

## Deployment URLs

After successful deployment:

- **Frontend:** https://kamtech-solutions.onrender.com
- **Backend:** https://kamtech-backend.onrender.com
- **GitHub:** https://github.com/kamleshthink/KamTech-Solutions

---

## Support

For deployment issues:
- Check Render logs in Dashboard
- Review MongoDB Atlas logs
- Contact: kamleshsharma@gmail.com

---

## Next Steps

1. ✅ Deploy Backend
2. ✅ Deploy Frontend
3. ✅ Setup MongoDB Atlas
4. ✅ Configure Email
5. ✅ Setup Cloudinary
6. ✅ Test all features
7. 🎯 Add custom domain (optional)
8. 🎯 Setup monitoring (optional)

**Happy Deploying! 🚀**
