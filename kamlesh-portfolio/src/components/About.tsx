import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const achievements = [
    "Generated ₹50L+ in revenue for client businesses",
    "Delivered 3+ enterprise-grade applications serving 10,000+ users",
    "Achieved 300% average ROI across all completed projects",
    "Maintained 98% on-time project delivery rate",
    "Cross-industry expertise: AgriTech, Construction, E-Commerce, Healthcare",
    "Professional support with <2 hour average response time",
    "Client-centric approach with unlimited revisions",
    "Complete confidentiality with NDA & IP protection"
  ];

  const interests = [
    "Enterprise Web Applications",
    "Cross-Platform Mobile Development",
    "AgriTech & Social Impact Solutions",
    "AI/ML Integration & Computer Vision",
    "Real-time Systems & IoT Solutions",
    "E-Commerce & Payment Solutions"
  ];

  return (
    <section id="about" className="section-padding hand-drawn-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="gradient-text">KamTech Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Elite Development Agency | Building Scalable Solutions | From Startups to Enterprises
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-500 rounded-2xl sm:rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl sm:rounded-3xl blur-2xl opacity-40"></div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                  {/* Professional Agency Illustration */}
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Team Work Illustration */}
                    <div className="flex justify-center items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold shadow-2xl">
                        KT
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-green-200 dark:border-green-800">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">₹50L+</div>
                        <div className="text-xs sm:text-sm text-green-700 dark:text-green-500 font-medium">Revenue</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                        <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-500 font-medium">Users</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                        <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-500 font-medium">Success</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-orange-200 dark:border-orange-800">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">300%</div>
                        <div className="text-xs sm:text-sm text-orange-700 dark:text-orange-500 font-medium">Avg ROI</div>
                      </div>
                    </div>

                    {/* Tech Stack Icons */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                      {['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'].map((tech) => (
                        <div key={tech} className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-md">
                          {tech}
                        </div>
                      ))}
                    </div>

                    {/* Trust Badges */}
                    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🏆</div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Top</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">⚡</div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Fast</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🔒</div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">NDA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">💯</div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About KamTech Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong className="text-gray-900 dark:text-white">KamTech Solutions</strong> is a professional software development agency
                specializing in building scalable, high-performance digital solutions for businesses of all sizes. Our expertise spans across
                web development, mobile applications, and AI-powered systems that deliver measurable business value.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong className="text-gray-900 dark:text-white">Proven Track Record:</strong>
              </p>
              <div className="space-y-2 mb-4 ml-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-xl flex-shrink-0">🌾</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Achhadam.com</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AgriTech platform connecting 1000+ farmers, facilitating ₹20L+ in transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 text-xl flex-shrink-0">🏗️</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Ramsethu Construction</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project management system handling ₹3.5Cr+ worth of construction projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0">👥</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">ACEBITS.in</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Professional networking platform serving 500+ users with 99.9% uptime</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Our Approach:</strong> We focus on delivering production-ready solutions
                with clean, maintainable code. Every project is built with security, scalability, and performance in mind. From initial
                consultation to deployment and maintenance, we ensure complete transparency and client satisfaction at every stage.
              </p>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-primary-600" />
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-sm">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HeartIcon className="w-6 h-6 text-primary-600" />
                Technical Expertise & Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { icon: BriefcaseIcon, number: "₹50L+", label: "Client Revenue" },
                { icon: HeartIcon, number: "10K+", label: "App Users" },
                { icon: AcademicCapIcon, number: "300%", label: "Avg ROI" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 