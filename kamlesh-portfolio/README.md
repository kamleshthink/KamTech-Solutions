# Kamlesh Sharma Portfolio

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean and professional UI with smooth animations
- **Responsive**: Works perfectly on all devices
- **Dark/Light Mode**: Toggle between themes
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Interactive project gallery
- **Skills Section**: Animated skills display
- **Experience Timeline**: Professional experience showcase

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Heroicons, React Icons
- **Forms**: React Hook Form, Yup validation
- **Build Tool**: Create React App

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/kamleshthink/kamleshportfolioreact.git

# Navigate to project directory
cd kamleshportfolioreact

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Deployment on Render

### Method 1: Using Render Dashboard

1. **Sign up/Login** to [Render](https://render.com)
2. **Click "New +"** and select **"Static Site"**
3. **Connect your GitHub repository**:
   - Select `kamleshportfolioreact` repository
   - Choose `main` branch
4. **Configure deployment settings**:
   - **Name**: `kamlesh-portfolio`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**:
     - `NODE_VERSION`: `18.0.0`
5. **Click "Create Static Site"**

### Method 2: Using render.yaml (Recommended)

The project includes a `render.yaml` file for automatic deployment configuration.

1. **Sign up/Login** to [Render](https://render.com)
2. **Click "New +"** and select **"Blueprint"**
3. **Connect your GitHub repository** and select `kamleshportfolioreact`
4. **Render will automatically detect** the `render.yaml` file
5. **Click "Apply"** to deploy

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_NAME=Kamlesh Sharma Portfolio
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills showcase
│   ├── Experience.tsx  # Work experience
│   ├── Projects.tsx    # Project gallery
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── context/            # React context
│   └── ThemeContext.tsx
├── data/               # Static data
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
├── types/              # TypeScript types
│   └── index.ts
└── App.tsx             # Main app component
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... customize primary colors
  },
  secondary: {
    50: '#f8fafc',
    // ... customize secondary colors
  }
}
```

### Content
Update the data files in `src/data/` to customize:
- Projects (`projects.ts`)
- Skills (`skills.ts`)
- Experience (`experience.ts`)

### Images
Replace images in `public/Assets/`:
- Profile photo: `kamlesh photo1.jpg`
- Resume: `kamli res.pdf`
- Project images: Update paths in `projects.ts`

## �� Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

The portfolio includes a dark/light mode toggle with:
- Automatic theme detection
- Smooth transitions
- Persistent theme preference

## 📞 Contact

For any questions or suggestions, feel free to reach out:
- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Kamlesh Sharma**
