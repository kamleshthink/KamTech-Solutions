import { Client } from '../types';

export const clients: Client[] = [
  // Featured Clients
  {
    id: 1,
    name: "Achhadam",
    logo: "/Assets/Achhadamproject3/achhadam logo.png",
    category: "AgriTech",
    description: "Revolutionary agriculture technology platform",
    website: "https://achhadam.com",
    featured: true
  },
  {
    id: 2,
    name: "Ramsethu Construction",
    logo: "/Assets/ramsetuconstructionproject1/ramsethu construction logo.png",
    category: "Construction Engineering",
    description: "Professional engineering solutions provider",
    featured: true
  },
  {
    id: 3,
    name: "ACEBITS - BIT Sindri",
    logo: "/Assets/logo/",
    category: "Professional Community",
    description: "Association of Civil Engineers community platform",
    website: "https://acebits.in",
    featured: true
  },
  
  // New Client Projects
  {
    id: 4,
    name: "Alumniconnect ACEBITS",
    logo: "/Assets/Alumniconnect acebit sindri/alumniconnect logo.png",
    category: "Community Platform",
    description: "Alumni and student networking hub for BIT Sindri",
    website: "https://alumniconnect.acebits.in",
    featured: true
  },
  {
    id: 5,
    name: "Avlokan",
    logo: "/Assets/Avlokan ace bit sindri/avlokan logo.jpg",
    category: "Annual Event Website",
    description: "Annual event website for ACEBITS at BIT Sindri, showcasing event details, registration, and sponsor highlights.",
    featured: true
  },
  {
    id: 6,
    name: "Axiomrise IT Consulting",
    logo: "/Assets/Axiomrise it consulting company/axiom logo.webp",
    category: "IT Consulting",
    description: "Enterprise IT solutions and digital transformation",
    featured: true
  },

  // Other Project Clients
  {
    id: 7,
    name: "DesiDine",
    logo: "/Assets/logo/",
    category: "Food & Delivery",
    description: "Food delivery platform"
  },
  {
    id: 8,
    name: "Job Portal",
    logo: "/Assets/logo/",
    category: "Job Board",
    description: "Job listing and hiring platform"
  },
  {
    id: 9,
    name: "GIG Freelancer",
    logo: "/Assets/logo/",
    category: "Freelance Marketplace",
    description: "Freelancer marketplace platform"
  },
  {
    id: 10,
    name: "SatyaNews",
    logo: "/Assets/logo/",
    category: "News Portal",
    description: "News aggregation and publishing platform"
  },
  
  // Supported Technologies/Partners (display as tech partners)
  {
    id: 11,
    name: "React",
    logo: "/Assets/logo/",
    category: "Technology Partner",
    description: "Frontend framework"
  },
  {
    id: 12,
    name: "Node.js",
    logo: "/Assets/logo/",
    category: "Technology Partner",
    description: "Backend runtime"
  },
  {
    id: 13,
    name: "MongoDB",
    logo: "/Assets/logo/",
    category: "Technology Partner",
    description: "Database platform"
  }
];

// Helper function to get featured clients only
export const getFeaturedClients = (): Client[] => {
  return clients.filter(client => client.featured);
};

// Helper function to get clients by category
export const getClientsByCategory = (category: string): Client[] => {
  return clients.filter(client => client.category === category);
};
