import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  QuoteIcon
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  feedback: string;
  platform: string;
  projectType?: string;
  businessResults?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    company: "TechStart India",
    rating: 5,
    feedback: "PragyaTek Solutions delivered an exceptional AgriTech platform that transformed our business. Within 3 months of launch, we generated ₹2L in revenue and acquired 500+ paying customers. The platform handles 200+ daily transactions smoothly. Best investment we made!",
    businessResults: "₹2L Revenue Generated | 500+ Customers | 100% ROI",
    platform: "Upwork",
    projectType: "Web Development",
    image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=3B82F6&color=fff&size=200"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "ConstructTech Solutions",
    rating: 5,
    feedback: "Our construction website by PragyaTek Solutions increased our lead generation by 250% in just 2 months. We're getting 50+ qualified inquiries per month now, resulting in ₹12L+ additional revenue. The website paid for itself in the first month!",
    businessResults: "250% More Leads | ₹12L+ Revenue Impact | 6 Week Payback",
    platform: "Fiverr",
    projectType: "Website Design",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff&size=200"
  },
  {
    id: 3,
    name: " Prof.Prafulla Sharma",
    role: "HOD, Civil Engineering",
    company: "BIT Sindri",
    rating: 5,
    feedback: "The ACEBITS community platform reduced our administrative costs by ₹3L annually and improved student engagement by 400%. Now serving 800+ active students with zero downtime. PragyaTek's post-launch support has been exceptional!",
    businessResults: "₹3L Cost Savings | 400% Engagement Boost | 800+ Users",
    platform: "Direct Client",
    projectType: "Community Platform",
    image: "https://ui-avatars.com/api/?name=Amit+Sharma&background=8B5CF6&color=fff&size=200"
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "FoodTech Ventures",
    rating: 5,
    feedback: "Our food delivery app built by PragyaTek Solutions is processing ₹25L+ monthly transactions. We grew from 0 to 5,000+ users in 4 months with 40% repeat customer rate. The real-time tracking and payment integration work flawlessly!",
    businessResults: "₹25L Monthly Transactions | 5,000 Users | 40% Retention",
    platform: "Upwork",
    projectType: "Mobile App",
    image: "https://ui-avatars.com/api/?name=Michael+Chen&background=F59E0B&color=fff&size=200"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "HR Director",
    company: "HireRight Solutions",
    rating: 5,
    feedback: "The job portal reduced our hiring time by 60% and saved ₹8L annually on recruitment costs. We're now processing 200+ applications daily with automated screening. PragyaTek delivered exactly what our business needed!",
    businessResults: "60% Faster Hiring | ₹8L Annual Savings | 200+ Daily Applications",
    platform: "Freelancer",
    projectType: "Job Portal",
    image: "https://ui-avatars.com/api/?name=Priya+Patel&background=EF4444&color=fff&size=200"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  const getPlatformBadgeColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'Upwork': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Fiverr': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      'Freelancer': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Direct Client': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    };
    return colors[platform] || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <section id="testimonials" className="section-padding paper-texture-light">
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
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real results from real businesses - See how we've helped our clients generate revenue and grow
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <QuoteIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6 font-medium">
                "{current.feedback}"
              </p>

              {/* Business Results */}
              {current.businessResults && (
                <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">📊</span>
                    <h4 className="font-bold text-green-800 dark:text-green-300">Business Impact:</h4>
                  </div>
                  <p className="text-center text-green-700 dark:text-green-400 font-semibold">
                    {current.businessResults}
                  </p>
                </div>
              )}

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Avatar */}
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                />

                {/* Details */}
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {current.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {current.role} at {current.company}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPlatformBadgeColor(current.platform)}`}>
                      {current.platform}
                    </span>
                    {current.projectType && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                        {current.projectType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '₹5L+', label: 'Client Revenue', icon: '💰' },
            { number: '100%', label: 'Average ROI', icon: '📈' },
            { number: '98%', label: 'Success Rate', icon: '✅' },
            { number: '5.0★', label: 'Client Rating', icon: '⭐' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
