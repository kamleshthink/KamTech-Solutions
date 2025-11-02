import { Project } from '../types';

export const projects: Project[] = [
  // TOP 3 FLAGSHIP PROJECTS
  {
    id: 1,
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
    stats: { commits: "127+", users: "1000+", status: "Live", impact: "Nationwide" }
  },
  {
    id: 2,
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
    stats: { commits: "83+", projects: "15+", status: "Live", performance: "95+ Score" }
  },
  {
    id: 3,
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
    stats: { members: "500+", events: "50+", status: "Live", community: "Active" }
  },

  // MACHINE LEARNING & AI PROJECTS
  {
    id: 4,
    title: "Cancer Detection AI System",
    description: "Advanced deep learning model for early cancer detection using medical imaging. Implements CNN architecture with TensorFlow and Keras for high-accuracy diagnosis. Features image preprocessing, model training, and real-time prediction capabilities.",
    image: "/Assets/cancer detection model/AI Chatbot – Smart Virtual Assistant.jpg",
    technologies: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "OpenCV", "Scikit-learn"],
    githubUrl: "https://github.com/kamleshthink/cancer-detection-ml",
    category: "ml",
    stats: { accuracy: "94%", model: "CNN", dataset: "10k+ images" }
  },
  {
    id: 5,
    title: "AI Chat Assistant",
    description: "Intelligent conversational AI assistant powered by OpenAI GPT models. Features context-aware responses, natural language understanding, conversation history, and multi-turn dialogue capabilities with modern chat interface.",
    image: "/Assets/Aichatbot/AI Chatbot – Smart Virtual Assistant.jpg",
    technologies: ["Python", "OpenAI API", "React", "FastAPI", "PostgreSQL", "WebSockets"],
    githubUrl: "https://github.com/kamleshthink/ai-chat-assistant",
    liveUrl: "https://ai-chat-demo.vercel.app",
    category: "ml"
  },

  // WEB APPLICATIONS
  {
    id: 6,
    title: "DesiDine - Food Delivery Platform",
    description: "Full-featured food delivery application with restaurant browsing, real-time order tracking, multiple payment options, and ratings system. Built with React and Express.js featuring responsive mobile design and smooth user experience.",
    image: "/Assets/desidine food delivery  mobile platform/Foodota - Online Food Delivery WordPress Theme.jpg",
    technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Stripe", "JWT", "Node.js"],
    githubUrl: "https://github.com/kamleshthink/DesiDine-food",
    liveUrl: "https://desidine-demo.vercel.app",
    category: "web",
    stats: { commits: "18+", restaurants: "50+", status: "Completed" }
  },
  {
    id: 7,
    title: "Professional Job Portal",
    description: "Comprehensive job portal with advanced search, filtering, and application management. Features employer dashboard, candidate profiles, resume uploads, job alerts, and application tracking system. Built for seamless hiring experience.",
    image: "/Assets/jobportal-free-template.jpg.avif",
    technologies: ["TypeScript", "React", "Node.js", "MongoDB", "Express", "JWT", "Redux"],
    githubUrl: "https://github.com/kamleshthink/Jobportalprof",
    liveUrl: "https://job-portal-demo.vercel.app",
    category: "web",
    stats: { commits: "10+", jobs: "200+", status: "Live" }
  },
  {
    id: 8,
    title: "GIG - Freelancer Marketplace",
    description: "Advanced freelancer marketplace platform connecting clients with talented professionals. Features project posting, freelancer profiles, secure escrow payments, rating system, real-time messaging, and AI-powered job matching.",
    image: "/Assets/freelancer platform ui/Screenshot (822).png",
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Stripe", "WebSockets", "Prisma"],
    githubUrl: "https://github.com/AIconsciousness/gig",
    category: "web",
    stats: { status: "In Development", features: "50+", commits: "7+" }
  },
  {
    id: 9,
    title: "News Portal Platform",
    description: "Dynamic news aggregation and publishing platform with categorized news sections, search functionality, bookmarking, and user comments. Features real-time updates, responsive design, and optimized performance.",
    image: "/Assets/satyanews/Screenshot (821).png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "News API", "Redux", "Socket.io"],
    githubUrl: "https://github.com/kamleshthink/news-portal",
    liveUrl: "https://news-portal-demo.vercel.app",
    category: "web"
  },
  {
    id: 10,
    title: "Cryptocurrency Tracker",
    description: "Real-time cryptocurrency tracking application with live price updates, portfolio management, price alerts, and detailed analytics. Features interactive charts, market data, and support for 100+ cryptocurrencies.",
    image: "/Assets/crypto.png",
    technologies: ["React", "TypeScript", "Chart.js", "CoinGecko API", "Tailwind CSS", "Redux"],
    githubUrl: "https://github.com/kamleshthink/crypto-tracker",
    liveUrl: "https://crypto-tracker-demo.vercel.app",
    category: "web"
  },

  // IoT & HARDWARE PROJECTS
  {
    id: 11,
    title: "Bluetooth Wireless Car",
    description: "IoT-based wireless car with Bluetooth 4.0 connectivity and custom Android app control. Features real-time command processing, intuitive joystick interface, low latency control (<50ms), 10+ meter range, and advanced power management system.",
    image: "/Assets/bluetooth controlled car.jpg",
    technologies: ["Arduino", "Bluetooth HC-05", "Kotlin", "Android Studio", "C++", "IoT"],
    githubUrl: "https://github.com/kamleshthink/Bluetooth-wireless-car",
    category: "other",
    stats: { range: "10m+", latency: "<50ms", battery: "2hrs+" }
  },
  {
    id: 12,
    title: "Drone Vision System",
    description: "Computer vision system for autonomous drone navigation and object detection. Implements real-time video processing, obstacle avoidance, and automated flight path planning using OpenCV and deep learning.",
    image: "/Assets/ChatGPT Image May 20, 2025, 02_13_05 AM.jpg",
    technologies: ["Python", "OpenCV", "TensorFlow", "Arduino", "Raspberry Pi", "Computer Vision"],
    githubUrl: "https://github.com/kamleshthink/Dronevision",
    category: "other",
    stats: { commits: "5+", features: "Autonomous Flight", status: "Prototype" }
  }
]; 