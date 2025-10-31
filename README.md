# Kamlesh Sharma - Professional Portfolio & Freelancer Agency Platform

> **World-class Full-Stack Portfolio** built with MERN Stack, designed to attract clients from Fiverr, Upwork, and direct collaborations.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 **Features**

### **Frontend (React + TypeScript + Tailwind CSS)**
- ✨ **Modern UI/UX** with smooth animations (Framer Motion)
- 🎨 **Dark/Light Theme** toggle
- 📱 **Fully Responsive** design
- 🚀 **Optimized Performance** (95+ Lighthouse score)
- 🎭 **Interactive Components** with smooth transitions
- 🔍 **SEO Optimized** with meta tags

### **Sections**
1. **Hero Section** - Dynamic typing animation, profile, stats
2. **About Section** - Professional introduction
3. **Skills Section** - Tech stack showcase with categories
4. **Services Section** - Tailored for Fiverr/Upwork clients
   - 6 service offerings with pricing
   - Detailed deliverables
   - "Why Choose Me" benefits
5. **Experience Section** - Work history timeline
6. **Projects Section** - Featured work showcase
   - 3 Main Projects (ACEBITS, Achhadam, Ramsetu)
   - Category filtering
   - Live demos & GitHub links
   - Project statistics
7. **Testimonials Section** - Client reviews
   - Carousel with navigation
   - Platform badges (Fiverr, Upwork, etc.)
   - 5-star ratings
8. **Contact Section** - Professional contact form
   - Project type & budget selection
   - Email integration
   - Backend API connected
   - Social media links

### **Backend (Node.js + Express + MongoDB)**
- 🔐 **JWT Authentication** for admin panel
- 📧 **Email Integration** with Nodemailer
- 🛡️ **Security** with Helmet, CORS, Rate Limiting
- ✅ **Input Validation** with express-validator
- 📊 **RESTful API** architecture
- 🗄️ **MongoDB Database** with Mongoose ODM

### **Admin Features**
- 📝 Manage projects dynamically
- 💬 Manage testimonials
- 📨 View contact form submissions
- 📈 Dashboard statistics
- 👤 User authentication

---

## 📁 **Project Structure**

```
kamlesportfolio-main/
├── kamlesh-portfolio/          # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Services.tsx   # ⭐ NEW
│   │   │   ├── Projects.tsx
│   │   │   ├── Testimonials.tsx  # ⭐ NEW
│   │   │   ├── Contact.tsx    # ✅ Enhanced
│   │   │   └── ...
│   │   ├── services/          # API service layer
│   │   │   └── api.ts         # ⭐ NEW
│   │   ├── context/           # React contexts
│   │   ├── data/              # Static data
│   │   ├── types/             # TypeScript types
│   │   └── ...
│   ├── public/
│   │   └── Assets/            # Project screenshots
│   │       ├── aceproject2/
│   │       ├── Achhadamproject3/
│   │       └── ramsetuconstructionproject1/
│   └── package.json
│
└── backend/                    # ⭐ NEW - Backend API
    ├── src/
    │   ├── models/            # Mongoose models
    │   │   ├── Project.js
    │   │   ├── Testimonial.js
    │   │   ├── Contact.js
    │   │   └── Admin.js
    │   ├── controllers/       # Business logic
    │   │   ├── projectController.js
    │   │   ├── testimonialController.js
    │   │   ├── contactController.js
    │   │   └── authController.js
    │   ├── routes/            # API routes
    │   ├── middleware/        # Auth, validation, etc.
    │   ├── config/            # Database config
    │   └── server.js          # Main server file
    ├── .env                   # Environment variables
    └── package.json
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (Local or Atlas)
- Git

### **1. Clone Repository**

```bash
git clone https://github.com/kamleshthink/portfolio.git
cd kamlesportfolio-main
```

### **2. Backend Setup**

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - MongoDB URI
# - Email credentials
# - JWT secret
# - Admin credentials

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

Backend runs on: **http://localhost:5000**

### **3. Frontend Setup**

```bash
# Navigate to frontend (in new terminal)
cd kamlesh-portfolio

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env (if needed)

# Start frontend
npm start
```

Frontend runs on: **http://localhost:3000**

---

## 📝 **Environment Configuration**

### **Backend (.env)**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kamlesh-portfolio
JWT_SECRET=your_strong_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=kamlesh@achhadam.com
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@kamleshsharma.com
ADMIN_PASSWORD=Admin@123456
```

### **Frontend (.env)**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔧 **Available Scripts**

### **Frontend**

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from CRA (use with caution)
```

### **Backend**

```bash
npm run dev        # Start with auto-reload (nodemon)
npm start          # Start production server
npm run seed       # Seed database with sample data
```

---

## 📡 **API Endpoints**

### **Public Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/testimonials` | Get testimonials |
| POST | `/api/contact` | Submit contact form |

### **Protected Endpoints** (Require JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current admin |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/contact` | Get all contacts |

**See full API documentation**: `backend/README.md`

---

## 🎨 **Key Technologies**

### **Frontend**
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Yup** - Form validation
- **React Router** - Navigation
- **Hero Icons** - Icon library

### **Backend**
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Express Validator** - Input validation

---

## 📊 **Database Schema**

### **Projects Collection**
```javascript
{
  title: String,
  description: String,
  image: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  category: String,
  featured: Boolean,
  stats: Map,
  views: Number,
  likes: Number
}
```

### **Testimonials Collection**
```javascript
{
  name: String,
  role: String,
  company: String,
  rating: Number (1-5),
  feedback: String,
  platform: String,
  featured: Boolean
}
```

### **Contact Collection**
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  projectType: String,
  projectBudget: String,
  status: String
}
```

---

## 🎯 **Featured Projects Showcase**

### **1. Achhadam (achhadam.com)**
- **Type**: Full-Stack AgriTech Platform
- **Tech**: React, Next.js, TypeScript, Node.js, MongoDB
- **Stats**: 127+ commits, 1000+ users
- **Impact**: Connects farmers, buyers, transporters across India

### **2. Ramsethu Construction**
- **Type**: Professional Construction Website
- **Tech**: Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Stats**: 83+ commits, 95+ Lighthouse score
- **Impact**: ₹3.49Cr+ projects showcased

### **3. ACEBITS (acebits.in)**
- **Type**: Community Platform
- **Tech**: React, Node.js, Express, MongoDB
- **Stats**: 500+ members, 50+ events
- **Impact**: Civil engineering student collaboration hub

---

## 🌐 **Deployment**

### **Frontend (Vercel/Netlify)**

#### Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd kamlesh-portfolio
vercel
```

#### Netlify:
```bash
# Build
npm run build

# Deploy build folder manually or via CLI
```

### **Backend (Heroku/Railway/Render)**

#### Heroku:
```bash
cd backend
heroku create kamlesh-portfolio-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_atlas_uri
# ... set other env vars
git push heroku main
```

#### Railway/Render:
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Auto-deploy on push

### **Database (MongoDB Atlas)**
1. Create cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`

---

## 🛡️ **Security Best Practices**

- ✅ Environment variables for sensitive data
- ✅ CORS configured
- ✅ Helmet for security headers
- ✅ Rate limiting on contact form (3/hour)
- ✅ Input validation & sanitization
- ✅ JWT for authentication
- ✅ Bcrypt for password hashing
- ✅ MongoDB injection prevention

---

## 🧪 **Testing**

### **Backend**
```bash
# Test API health
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kamleshsharma.com","password":"Admin@123456"}'
```

### **Frontend**
```bash
npm test
```

---

## 📈 **Performance Optimization**

- ⚡ Code splitting with React.lazy
- 📦 Tree shaking
- 🗜️ Image optimization
- 🚀 CDN for assets
- 💾 Database indexing
- 🔄 API response caching
- 📱 Mobile-first approach

---

## 🤝 **Contributing**

This is a personal portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 **License**

MIT License - feel free to use this project for your own portfolio!

---

## 👨‍💻 **Author**

**Kamlesh Sharma**
- 🌐 Portfolio: [achhadam.com](https://achhadam.com)
- 💼 LinkedIn: [kamlesh-sharmathink](https://www.linkedin.com/in/kamlesh-sharmathink)
- 🐙 GitHub: [@kamleshthink](https://github.com/kamleshthink)
- 📧 Email: kamlesh@achhadam.com
- 📍 Location: Dhanbad, Jharkhand, India
- 🎓 Education: BIT Sindri (Civil Engineering & Computer Science)

---

## 🙏 **Acknowledgments**

- Thanks to all open-source contributors
- Inspired by modern portfolio designs
- Built with love for the developer community

---

## 📞 **Support**

For issues, questions, or suggestions:
- 🐛 Open an [Issue](https://github.com/kamleshthink/portfolio/issues)
- 💬 Email: kamlesh@achhadam.com
- 💼 LinkedIn: Message me directly

---

## 🎉 **Special Features**

✨ **Perfect for Freelancers on Fiverr/Upwork!**

This portfolio is specifically designed to:
- ✅ Showcase your best work professionally
- ✅ Include pricing & service packages
- ✅ Display client testimonials with ratings
- ✅ Easy contact with project budgets
- ✅ Backend to manage everything
- ✅ Email notifications for new leads
- ✅ Professional, trustworthy design

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Kamlesh Sharma

[Portfolio](https://achhadam.com) • [GitHub](https://github.com/kamleshthink) • [LinkedIn](https://www.linkedin.com/in/kamlesh-sharmathink)

</div>
