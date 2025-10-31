import React from 'react';
import { motion } from 'framer-motion';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ChartBarIcon,
  CogIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
  deliverables: string[];
  priceRange: string;
  turnaround: string;
  badge?: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: <CodeBracketIcon className="w-12 h-12" />,
      title: "Full-Stack Web Development",
      description: "Complete web applications from database to deployment. Specialized in MERN stack with scalable architecture.",
      skills: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "REST APIs"],
      deliverables: [
        "Responsive web application",
        "Admin panel & dashboard",
        "API documentation",
        "Source code & deployment",
        "3 months support"
      ],
      priceRange: "$1,500 - $10,000+",
      turnaround: "2-6 weeks",
      badge: "Most Popular"
    },
    {
      icon: <DevicePhoneMobileIcon className="w-12 h-12" />,
      title: "Frontend Development",
      description: "Modern, pixel-perfect UI/UX implementation with smooth animations and excellent performance.",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      deliverables: [
        "Responsive UI components",
        "Cross-browser compatibility",
        "Performance optimization",
        "SEO implementation",
        "Design system"
      ],
      priceRange: "$800 - $5,000+",
      turnaround: "1-4 weeks"
    },
    {
      icon: <CogIcon className="w-12 h-12" />,
      title: "Backend & API Development",
      description: "Robust RESTful APIs, database design, and server-side logic with security best practices.",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "JWT", "WebSockets"],
      deliverables: [
        "RESTful API endpoints",
        "Database schema & models",
        "Authentication system",
        "API documentation",
        "Testing & deployment"
      ],
      priceRange: "$1,000 - $6,000+",
      turnaround: "1-4 weeks"
    },
    {
      icon: <CpuChipIcon className="w-12 h-12" />,
      title: "Machine Learning Solutions",
      description: "AI/ML models for real-world problems including image recognition, prediction, and automation.",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas"],
      deliverables: [
        "Trained ML model",
        "Model documentation",
        "API integration",
        "Performance metrics",
        "Training notebooks"
      ],
      priceRange: "$1,500 - $8,000+",
      turnaround: "2-5 weeks",
      badge: "Premium"
    },
    {
      icon: <ChartBarIcon className="w-12 h-12" />,
      title: "E-Commerce Development",
      description: "Complete e-commerce solutions with payment integration, inventory management, and admin panels.",
      skills: ["Next.js", "Stripe", "MongoDB", "Redux", "Node.js", "Analytics"],
      deliverables: [
        "Product catalog system",
        "Shopping cart & checkout",
        "Payment integration",
        "Order management",
        "Admin dashboard"
      ],
      priceRange: "$2,500 - $15,000+",
      turnaround: "3-8 weeks"
    },
    {
      icon: <RocketLaunchIcon className="w-12 h-12" />,
      title: "MVP Development",
      description: "Rapid prototyping and MVP development for startups. Get your product to market fast.",
      skills: ["React", "Next.js", "Firebase", "Vercel", "Rapid Prototyping"],
      deliverables: [
        "Working MVP",
        "Core features",
        "Cloud deployment",
        "Basic analytics",
        "User feedback system"
      ],
      priceRange: "$2,000 - $10,000+",
      turnaround: "2-6 weeks",
      badge: "Startup Special"
    }
  ];

  return (
    <section id="services" className="section-padding paper-texture-light">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Services & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional development services tailored for startups, agencies, and businesses looking for quality solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                    {service.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className="mb-6 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    What You Get:
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-500 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Time */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Starting from</span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {service.priceRange.split(' - ')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Delivery time</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {service.turnaround}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block mt-6 w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold rounded-lg transition-colors duration-200"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose Me?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Fast Delivery',
                description: 'Quick turnaround without compromising quality'
              },
              {
                icon: '💯',
                title: 'Quality Code',
                description: 'Clean, maintainable, and well-documented code'
              },
              {
                icon: '🔄',
                title: 'Unlimited Revisions',
                description: 'Free revisions until you\'re 100% satisfied'
              },
              {
                icon: '🛡️',
                title: 'Post-Launch Support',
                description: '3 months free support after delivery'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
