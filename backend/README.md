# Kamlesh Portfolio Backend API

Professional portfolio backend API built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for admin panel
- **Email Integration** with Nodemailer
- **Rate Limiting** for contact form
- **Input Validation** with express-validator
- **Security** with Helmet and CORS
- **Error Handling** middleware
- **Database Seeding** script

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── projectController.js # Project CRUD operations
│   │   ├── testimonialController.js
│   │   └── contactController.js # Contact form & email
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validators.js        # Input validation
│   ├── models/
│   │   ├── Project.js           # Project schema
│   │   ├── Testimonial.js       # Testimonial schema
│   │   ├── Contact.js           # Contact form schema
│   │   └── Admin.js             # Admin user schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── testimonialRoutes.js
│   │   └── contactRoutes.js
│   ├── scripts/
│   │   └── seedData.js          # Database seeding
│   └── server.js                # Main server file
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the backend root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kamlesh-portfolio
JWT_SECRET=your_strong_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=kamlesh@achhadam.com
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@kamleshsharma.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service:
  ```bash
  mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string and update `MONGODB_URI` in `.env`

### 4. Seed Database

```bash
npm run seed
```

This will:
- Clear existing data
- Insert all projects
- Insert sample testimonials
- Create admin user

### 5. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Public Endpoints

#### Projects
- `GET /api/projects` - Get all active projects
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/stats` - Get project statistics

#### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `GET /api/testimonials/stats` - Get testimonial statistics

#### Contact
- `POST /api/contact` - Submit contact form

#### Health Check
- `GET /api/health` - Server health status

### Protected Endpoints (Require JWT Token)

#### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `PUT /api/auth/password` - Update password
- `POST /api/auth/register` - Register new admin (super-admin only)

#### Projects (Admin)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Testimonials (Admin)
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

#### Contact (Admin)
- `GET /api/contact` - Get all contact submissions
- `PUT /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

## 🔐 Authentication

### Admin Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "admin@kamleshsharma.com",
  "password": "YourPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "name": "Kamlesh Sharma",
    "email": "admin@kamleshsharma.com",
    "role": "super-admin"
  }
}
```

### Using Protected Routes

Add the JWT token to request headers:

```
Authorization: Bearer your_jwt_token_here
```

## 📧 Email Configuration

For Gmail (recommended for development):

1. Enable 2-Factor Authentication
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use App Password in `EMAIL_PASS` environment variable

## 🧪 Testing API

### Using Postman

1. Import the API endpoints
2. For login: `POST http://localhost:5000/api/auth/login`
3. Copy the token from response
4. For protected routes, add header: `Authorization: Bearer <token>`

### Using cURL

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Get Projects:**
```bash
curl http://localhost:5000/api/projects
```

**Admin Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kamleshsharma.com","password":"YourPassword123!"}'
```

## 🔧 Maintenance

### Backup Database

```bash
mongodump --uri="mongodb://localhost:27017/kamlesh-portfolio" --out=./backup
```

### Restore Database

```bash
mongorestore --uri="mongodb://localhost:27017/kamlesh-portfolio" ./backup/kamlesh-portfolio
```

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/portfolio` |
| `JWT_SECRET` | Secret key for JWT | Random strong string |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Email address | `your-email@gmail.com` |
| `EMAIL_PASS` | Email password/app password | Your app password |
| `CONTACT_EMAIL` | Email to receive contact forms | `kamlesh@achhadam.com` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `ADMIN_EMAIL` | Default admin email | `admin@kamleshsharma.com` |
| `ADMIN_PASSWORD` | Default admin password | Strong password |

## 🚀 Deployment

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set KEY=VALUE`
5. Deploy: `git push heroku main`

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add MongoDB plugin
4. Set environment variables
5. Deploy automatically

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Kamlesh Sharma**
- Portfolio: [achhadam.com](https://achhadam.com)
- GitHub: [@kamleshthink](https://github.com/kamleshthink)
- LinkedIn: [kamlesh-sharmathink](https://www.linkedin.com/in/kamlesh-sharmathink)
- Email: kamlesh@achhadam.com
