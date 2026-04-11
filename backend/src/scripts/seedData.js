require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Admin = require('../models/Admin');
const Client = require('../models/Client');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample Projects Data with comprehensive galleries
const projects = [
  {
    title: "Achhadam - Digital Farming Platform",
    description: "Revolutionary full-stack AgriTech platform connecting farmers, buyers, and transporters across India. Features real-time market pricing, secure payments, GPS logistics, and multi-language support. Serving farmers nationwide with 127+ commits on main platform.",
    detailedDescription: "Achhadam is a comprehensive agriculture technology platform that revolutionizes how farmers, buyers, and transporters interact in the agricultural supply chain. Built with modern web technologies, it provides real-time market data, secure transaction processing, and efficient logistics management. The platform features farmer profiles, buyer dashboards, transporter tracking, secure payment gateways, real-time price updates, multi-language support for regional languages, and GPS-enabled logistics management.",
    image: "/Assets/Achhadamproject3/Screenshot (756).png",
    gallery: [
      "/Assets/Achhadamproject3/Screenshot (756).png",
      "/Assets/Achhadamproject3/Screenshot (757).png",
      "/Assets/Achhadamproject3/Screenshot (758).png",
      "/Assets/Achhadamproject3/Screenshot (759).png",
      "/Assets/Achhadamproject3/Screenshot (760).png",
      "/Assets/Achhadamproject3/Screenshot (761).png",
      "/Assets/Achhadamproject3/Screenshot (762).png",
      "/Assets/Achhadamproject3/Screenshot (763).png",
      "/Assets/Achhadamproject3/Screenshot (764).png",
      "/Assets/Achhadamproject3/Screenshot (765).png",
      "/Assets/Achhadamproject3/Screenshot (766).png",
      "/Assets/Achhadamproject3/Screenshot (767).png",
      "/Assets/Achhadamproject3/Screenshot (768).png",
      "/Assets/Achhadamproject3/Screenshot (769).png",
      "/Assets/Achhadamproject3/Screenshot (770).png",
      "/Assets/Achhadamproject3/Screenshot (771).png",
      "/Assets/Achhadamproject3/Screenshot (772).png",
      "/Assets/Achhadamproject3/Screenshot (773).png",
      "/Assets/Achhadamproject3/Screenshot (774).png"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "REST API", "Socket.io", "JWT", "Razorpay"],
    githubUrl: "https://github.com/AIconsciousness/acchadam1",
    liveUrl: "https://achhadam.com",
    category: "web",
    featured: true,
    stats: { commits: "127+", users: "1000+", status: "Live", impact: "Nationwide" },
    order: 1
  },
  {
    title: "Ramsethu Construction - Engineering Solutions",
    description: "Professional construction company website for electrical, mechanical, and solar energy solutions. Features dynamic project portfolio showcasing ₹3.49Cr+ completed projects for clients like GE T&D India Ltd. and Gram Oorja. 95+ Lighthouse score with modern animations.",
    detailedDescription: "A high-performance construction company website showcasing engineering excellence. Features include interactive project galleries, client testimonials, service catalogs, and contact management. The website highlights electrical infrastructure projects, mechanical installations, solar energy solutions, and comprehensive engineering services. Built with performance optimization achieving 95+ Lighthouse score, featuring smooth animations, SEO optimization, and mobile-first responsive design.",
    image: "/Assets/ramsetuconstructionproject1/Screenshot (801).png",
    gallery: [
      "/Assets/ramsetuconstructionproject1/Screenshot (801).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (802).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (803).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (804).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (805).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (806).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (807).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (808).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (809).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (810).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (811).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (812).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (813).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (814).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (815).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (816).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (817).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (818).png",
      "/Assets/ramsetuconstructionproject1/Screenshot (819).png"
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Vercel", "SEO Optimization"],
    githubUrl: "https://github.com/AIconsciousness/Ramsethu-Construction",
    liveUrl: "https://ramsethu1-construction.onrender.com",
    category: "web",
    featured: true,
    stats: { commits: "83+", projects: "15+", status: "Live", performance: "95+ Score" },
    order: 2
  },
  {
    title: "ACEBITS - Civil Engineers Community Hub",
    description: "Official platform for Association of Civil Engineers at BIT Sindri. Comprehensive networking hub with team profiles, event management, resource sharing, and student collaboration tools. Serving 500+ active civil engineering students.",
    detailedDescription: "ACEBITS is the digital hub for civil engineering students at BIT Sindri, providing tools for collaboration, event management, and knowledge sharing. The platform includes member directories, resource libraries, event calendars, technical workshops, project showcases, alumni networking, placement assistance, and academic resources. Features include user authentication, role-based access, event registration, resource uploads, discussion forums, and notification systems.",
    image: "/Assets/aceproject2/Screenshot (780).png",
    gallery: [
      "/Assets/aceproject2/Screenshot (780).png",
      "/Assets/aceproject2/Screenshot (781).png",
      "/Assets/aceproject2/Screenshot (782).png",
      "/Assets/aceproject2/Screenshot (783).png",
      "/Assets/aceproject2/Screenshot (784).png",
      "/Assets/aceproject2/Screenshot (785).png",
      "/Assets/aceproject2/Screenshot (786).png",
      "/Assets/aceproject2/Screenshot (787).png",
      "/Assets/aceproject2/Screenshot (788).png",
      "/Assets/aceproject2/Screenshot (789).png",
      "/Assets/aceproject2/Screenshot (790).png",
      "/Assets/aceproject2/Screenshot (791).png",
      "/Assets/aceproject2/Screenshot (792).png",
      "/Assets/aceproject2/Screenshot (793).png",
      "/Assets/aceproject2/Screenshot (794).png",
      "/Assets/aceproject2/Screenshot (795).png",
      "/Assets/aceproject2/Screenshot (796).png",
      "/Assets/aceproject2/Screenshot (797).png",
      "/Assets/aceproject2/Screenshot (798).png"
    ],
    technologies: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "JWT", "Socket.io", "Redux"],
    githubUrl: "https://github.com/AIconsciousness/acebit",
    liveUrl: "https://acebits.in",
    category: "web",
    featured: true,
    stats: { members: "500+", events: "50+", status: "Live", community: "Active" },
    order: 3
  },
  {
    title: "DesiDine - Food Delivery Platform",
    description: "Full-featured food delivery application with restaurant browsing, real-time order tracking, multiple payment options, and ratings system. Built with React and Express.js featuring responsive mobile design and smooth user experience.",
    image: "/Assets/ChatGPT Image Apr 21, 2025, 12_47_14 PM.png",
    technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Stripe", "JWT", "Node.js"],
    githubUrl: "https://github.com/kamleshthink/DesiDine-food",
    liveUrl: "https://desidine-demo.vercel.app",
    category: "web",
    stats: { commits: "18+", restaurants: "50+", status: "Completed" },
    order: 4
  },
  {
    title: "Professional Job Portal",
    description: "Comprehensive job portal with advanced search, filtering, and application management. Features employer dashboard, candidate profiles, resume uploads, job alerts, and application tracking system.",
    image: "/Assets/jobportal-free-template.jpg.avif",
    technologies: ["TypeScript", "React", "Node.js", "MongoDB", "Express", "JWT", "Redux"],
    githubUrl: "https://github.com/kamleshthink/Jobportalprof",
    liveUrl: "https://job-portal-demo.vercel.app",
    category: "web",
    stats: { commits: "10+", jobs: "200+", status: "Live" },
    order: 5
  },
  {
    title: "Bluetooth Wireless Car",
    description: "IoT-based wireless car with Bluetooth 4.0 connectivity and custom Android app control. Features real-time command processing, intuitive joystick interface, low latency control (<50ms), 10+ meter range, and advanced power management system.",
    image: "/Assets/bluetooth controlled car.jpg",
    technologies: ["Arduino", "Bluetooth HC-05", "Kotlin", "Android Studio", "C++", "IoT"],
    githubUrl: "https://github.com/kamleshthink/Bluetooth-wireless-car",
    category: "other",
    stats: { range: "10m+", latency: "<50ms", battery: "2hrs+" },
    order: 6
  }
];

// Sample Testimonials
const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    company: "TechStart India",
    rating: 5,
    feedback: "Kamlesh delivered an exceptional AgriTech platform that exceeded our expectations. His expertise in MERN stack and attention to detail resulted in a robust, scalable solution. The Achhadam platform now serves 1000+ users successfully. Highly recommended for complex full-stack projects!",
    platform: "upwork",
    projectType: "Web Development",
    featured: true,
    order: 1
  },
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "ConstructTech Solutions",
    rating: 5,
    feedback: "Working with Kamlesh on the Ramsethu Construction website was a pleasure. He created a stunning, high-performance website with excellent UI/UX. The project was delivered on time with a 95+ Lighthouse score. Professional communication throughout!",
    platform: "fiverr",
    projectType: "Website Design",
    featured: true,
    order: 2
  },
  {
    name: "Dr. Amit Sharma",
    role: "HOD, Civil Engineering",
    company: "BIT Sindri",
    rating: 5,
    feedback: "The ACEBITS platform has transformed how our students collaborate and learn. Kamlesh built a comprehensive community platform that now serves 500+ students. His technical skills and understanding of our requirements were outstanding.",
    platform: "direct",
    projectType: "Community Platform",
    featured: true,
    order: 3
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "FoodTech Ventures",
    rating: 5,
    feedback: "Kamlesh developed our food delivery platform with impressive features including real-time tracking and payment integration. The code quality is excellent and the app performs smoothly. Great developer to work with!",
    platform: "upwork",
    projectType: "Mobile App Development",
    featured: false,
    order: 4
  },
  {
    name: "Priya Patel",
    role: "HR Director",
    company: "HireRight Solutions",
    rating: 5,
    feedback: "Our job portal built by Kamlesh has streamlined our hiring process significantly. The advanced search and filtering features are exactly what we needed. Professional work with great communication!",
    platform: "freelancer",
    projectType: "Job Portal",
    featured: false,
    order: 5
  }
];

// Sample Clients Data
const clients = [
  {
    name: "Achhadam",
    logo: "/Assets/logo/achhadam-logo.png",
    category: "AgriTech",
    description: "Revolutionary agriculture technology platform",
    website: "https://achhadam.com",
    featured: true,
    metrics: {
      projectsCompleted: 1,
      successRate: 100,
      avgRating: 5
    },
    tags: ["agriculture", "startup", "tech"]
  },
  {
    name: "Ramsethu Construction",
    logo: "/Assets/logo/",
    category: "Construction Engineering",
    description: "Professional engineering solutions provider",
    featured: true,
    metrics: {
      projectsCompleted: 1,
      successRate: 100,
      avgRating: 5
    },
    tags: ["construction", "engineering", "enterprise"]
  },
  {
    name: "ACEBITS - BIT Sindri",
    logo: "/Assets/logo/",
    category: "Professional Community",
    description: "Association of Civil Engineers community platform",
    website: "https://acebits.in",
    featured: true,
    metrics: {
      projectsCompleted: 1,
      successRate: 100,
      avgRating: 5
    },
    tags: ["community", "education", "networking"]
  },
  {
    name: "Alumniconnect ACEBITS",
    logo: "/Assets/Alumniconnect acebit sindri/alumniconnect logo.png",
    category: "Community Platform",
    description: "Alumni and student networking hub for BIT Sindri",
    website: "https://alumniconnect.acebits.in",
    featured: true,
    metrics: {
      projectsCompleted: 1,
      successRate: 100,
      avgRating: 5
    },
    tags: ["alumni", "networking", "education"]
  },
  {
    name: "Avlokan",
    logo: "/Assets/Avlokan ace bit sindri/avlokan logo.jpg",
    category: "Digital Agency",
    description: "Digital solutions and web development services",
    featured: true,
    metrics: {
      projectsCompleted: 1,
      successRate: 98,
      avgRating: 4.8
    },
    tags: ["agency", "web-development", "digital"]
  },
  {
    name: "Axiomrise IT Consulting",
    logo: "/Assets/Axiomrise it consulting company/axiom logo.webp",
    category: "IT Consulting",
    description: "Enterprise IT solutions and digital transformation",
    featured: true,
    metrics: {
      projectsCompleted: 1,
      successRate: 99,
      avgRating: 4.9
    },
    tags: ["consulting", "enterprise", "it"]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Client.deleteMany({});

    console.log('📝 Seeding projects...');
    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ ${createdProjects.length} projects seeded successfully`);

    console.log('💬 Seeding testimonials...');
    const createdTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`✅ ${createdTestimonials.length} testimonials seeded successfully`);

    console.log('🏢 Seeding clients...');
    const createdClients = await Client.insertMany(clients);
    console.log(`✅ ${createdClients.length} clients seeded successfully`);

    // Create default admin if doesn't exist
    console.log('👤 Checking for admin user...');
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExists) {
      const admin = await Admin.create({
        name: 'Kamlesh Sharma',
        email: process.env.ADMIN_EMAIL || 'admin@kamleshsharma.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'super-admin'
      });
      console.log(`✅ Admin user created: ${admin.email}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('\n✨ Database seeding completed successfully!\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
