import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownIcon,
  RocketLaunchIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface HeroProps {
  onBookNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNowClick }) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = [
    'Elite Full-Stack Development Agency',
    'Your Trusted Tech Partner',
    'AgriTech & ML Solutions Expert',
    'Enterprise Web Applications',
    'Scaling Startups to Success'
  ];

  useEffect(() => {
    const currentWord = words[currentIndex];
    
    if (!isDeleting) {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [text, currentIndex, isDeleting, words]);

     const handleDownloadResume = () => {
     // Add resume download functionality
     const link = document.createElement('a');
     link.href = '/Assets/kamli res.pdf';
     link.download = 'Kamlesh_Sharma_Resume.pdf';
     link.click();
   };

  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center paper-texture-blue relative overflow-hidden pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <div className="mb-3">
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-semibold">
                  🏆 Top Rated Development Agency
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                <span className="gradient-text">KamTech Solutions</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                Elite Development Agency
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 min-h-[2rem] sm:min-h-[2.5rem]">
                <span className="text-primary-600 dark:text-primary-400">
                  {text}
                  <span className="animate-pulse">|</span>
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                We deliver world-class web & mobile applications that drive real business results.
                From AgriTech platforms serving <strong>1000+ users</strong> to AI systems with <strong>94% accuracy</strong> -
                we transform ambitious ideas into market-ready solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6"
            >
              <motion.button
                onClick={onBookNowClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2 text-center w-full sm:w-auto"
              >
                <RocketLaunchIcon className="w-5 h-5" />
                Hire Us Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScrollToAbout}
                className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <EyeIcon className="w-5 h-5" />
                View Portfolio
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="btn-outline flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <DocumentTextIcon className="w-5 h-5" />
                Company Profile
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12"
            >
              {[
                { number: '₹50L+', label: 'Client Revenue', icon: '💰' },
                { number: '10K+', label: 'Active Users', icon: '👥' },
                { number: '95%', label: 'Success Rate', icon: '⭐' },
                { number: '2-3 Days', label: 'Avg Response', icon: '⚡' }
              ].map((stat, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Coding Team Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

                {/* Illustration Card */}
                <div className="relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                  {/* Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Development Team</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Building Your Dream Project</p>
                  </div>

                  {/* Team SVG */}
                  <svg viewBox="0 0 500 450" className="w-full h-auto">
                    {/* Background Grid */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                      <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>

                    <rect width="500" height="450" fill="url(#grid)"/>

                    {/* Monitor/Screens Background */}
                    <g opacity="0.1">
                      <rect x="50" y="80" width="120" height="90" rx="4" fill="#3b82f6"/>
                      <rect x="190" y="60" width="120" height="90" rx="4" fill="#8b5cf6"/>
                      <rect x="330" y="80" width="120" height="90" rx="4" fill="#ec4899"/>
                    </g>

                    {/* Designer - Left */}
                    <g className="designer-group">
                      <motion.g
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {/* Monitor */}
                        <rect x="50" y="160" width="100" height="70" rx="3" fill="#1e40af" opacity="0.9"/>
                        <rect x="53" y="163" width="94" height="64" rx="2" fill="#60a5fa"/>

                        {/* Design Elements on Screen */}
                        <rect x="60" y="170" width="30" height="20" rx="2" fill="#3b82f6" opacity="0.6"/>
                        <rect x="60" y="195" width="40" height="4" fill="#3b82f6" opacity="0.4"/>
                        <rect x="60" y="202" width="30" height="4" fill="#3b82f6" opacity="0.4"/>
                        <circle cx="120" cy="180" r="8" fill="#3b82f6" opacity="0.5"/>
                        <path d="M 105 210 L 115 220 L 125 210" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.5"/>

                        {/* Person */}
                        <circle cx="100" cy="250" r="15" fill="#3b82f6"/>
                        <rect x="88" y="265" width="24" height="35" rx="12" fill="#3b82f6"/>

                        {/* Coffee Cup */}
                        <rect x="135" y="225" width="12" height="15" rx="2" fill="#f59e0b" opacity="0.8"/>
                        <ellipse cx="141" cy="224" rx="7" ry="2" fill="#f59e0b" opacity="0.6"/>
                      </motion.g>

                      {/* Label */}
                      <motion.g
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <rect x="55" y="310" width="90" height="24" rx="12" fill="#3b82f6" opacity="0.9"/>
                        <text x="100" y="326" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">UI DESIGNER</text>
                      </motion.g>
                    </g>

                    {/* Developer - Center */}
                    <g className="developer-group">
                      <motion.g
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        {/* Larger Monitor */}
                        <rect x="180" y="145" width="120" height="85" rx="3" fill="#4c1d95" opacity="0.9"/>
                        <rect x="183" y="148" width="114" height="79" rx="2" fill="#a78bfa"/>

                        {/* Code on Screen with Syntax Highlighting */}
                        <motion.g
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {/* VS Code-like interface */}
                          <rect x="186" y="151" width="108" height="8" fill="#4c1d95" opacity="0.3"/>
                          <text x="192" y="158" fontSize="8" fill="#8b5cf6" fontFamily="monospace">{"<>"}</text>
                          <text x="210" y="158" fontSize="8" fill="#ec4899" fontFamily="monospace">index.tsx</text>

                          {/* Code lines */}
                          <text x="190" y="172" fontSize="8" fill="#4c1d95" fontFamily="monospace">{"const"}</text>
                          <text x="216" y="172" fontSize="8" fill="#ec4899" fontFamily="monospace">{"app ="}</text>

                          <text x="190" y="182" fontSize="8" fill="#10b981" fontFamily="monospace">{"  function"}</text>
                          <text x="230" y="182" fontSize="8" fill="#3b82f6" fontFamily="monospace">{"() {"}</text>

                          <text x="195" y="192" fontSize="8" fill="#8b5cf6" fontFamily="monospace">{"    return"}</text>
                          <text x="235" y="192" fontSize="8" fill="#f59e0b" fontFamily="monospace">{"<App/>"}</text>

                          <text x="190" y="202" fontSize="8" fill="#3b82f6" fontFamily="monospace">{"  }"}</text>

                          {/* Cursor blinking */}
                          <motion.rect
                            x="213"
                            y="195"
                            width="2"
                            height="8"
                            fill="#fff"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </motion.g>

                        {/* Person */}
                        <circle cx="240" cy="245" r="18" fill="#8b5cf6"/>
                        <rect x="226" y="263" width="28" height="40" rx="14" fill="#8b5cf6"/>

                        {/* Keyboard */}
                        <rect x="210" y="295" width="60" height="8" rx="2" fill="#6366f1" opacity="0.6"/>
                      </motion.g>

                      {/* Label */}
                      <motion.g
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      >
                        <rect x="200" y="315" width="80" height="22" rx="11" fill="#8b5cf6" opacity="0.9"/>
                        <text x="240" y="330" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">DEVELOPER</text>
                      </motion.g>
                    </g>

                    {/* QA/Debugger - Right */}
                    <g className="debugger-group">
                      <motion.g
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        {/* Monitor */}
                        <rect x="330" y="160" width="100" height="70" rx="3" fill="#9f1239" opacity="0.9"/>
                        <rect x="333" y="163" width="94" height="64" rx="2" fill="#f9a8d4"/>

                        {/* Bug/Debug Icons */}
                        <circle cx="360" cy="185" r="8" stroke="#dc2626" strokeWidth="2" fill="none"/>
                        <path d="M 356 185 L 364 185 M 360 181 L 360 189" stroke="#dc2626" strokeWidth="2"/>

                        {/* Console/Terminal */}
                        <rect x="340" y="200" width="80" height="20" rx="2" fill="#1f2937" opacity="0.7"/>
                        <text x="345" y="210" fontSize="6" fill="#10b981" fontFamily="monospace">{">> Test passed"}</text>
                        <text x="345" y="216" fontSize="6" fill="#ef4444" fontFamily="monospace">{">> 1 bug fixed"}</text>

                        {/* Checkmarks */}
                        <motion.g
                          animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <circle cx="410" cy="180" r="6" fill="#10b981" opacity="0.8"/>
                          <path d="M 407 180 L 409 182 L 413 177" stroke="white" strokeWidth="2" fill="none"/>
                        </motion.g>

                        {/* Person */}
                        <circle cx="380" cy="250" r="15" fill="#ec4899"/>
                        <rect x="368" y="265" width="24" height="35" rx="12" fill="#ec4899"/>
                      </motion.g>

                      {/* Label */}
                      <motion.g
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      >
                        <rect x="343" y="310" width="80" height="24" rx="12" fill="#ec4899" opacity="0.9"/>
                        <text x="383" y="326" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">QA TESTER</text>
                      </motion.g>
                    </g>

                    {/* Connecting Lines/Workflow */}
                    <motion.g
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <path d="M 150 280 L 190 280" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"/>
                      <path d="M 300 280 L 330 280" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"/>
                      <polygon points="185,278 195,280 185,282" fill="#3b82f6" opacity="0.5"/>
                      <polygon points="325,278 335,280 325,282" fill="#8b5cf6" opacity="0.5"/>
                    </motion.g>

                    {/* Floating Icons */}
                    <motion.g
                      animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <text x="50" y="50" fontSize="20" fill="#3b82f6" opacity="0.5">🎨</text>
                      <text x="230" y="35" fontSize="22" fill="#8b5cf6" opacity="0.5">💻</text>
                      <text x="450" y="50" fontSize="20" fill="#ec4899" opacity="0.5">🐛</text>
                    </motion.g>

                    {/* Process Tags */}
                    <g opacity="0.6">
                      <rect x="20" y="380" width="70" height="20" rx="10" fill="#10b981"/>
                      <text x="55" y="394" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">PLANNING</text>

                      <rect x="100" y="380" width="60" height="20" rx="10" fill="#3b82f6"/>
                      <text x="130" y="394" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">DESIGN</text>

                      <rect x="170" y="380" width="80" height="20" rx="10" fill="#8b5cf6"/>
                      <text x="210" y="394" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">DEVELOPMENT</text>

                      <rect x="260" y="380" width="60" height="20" rx="10" fill="#ec4899"/>
                      <text x="290" y="394" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">TESTING</text>

                      <rect x="330" y="380" width="60" height="20" rx="10" fill="#f59e0b"/>
                      <text x="360" y="394" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">DEPLOY</text>

                      <rect x="400" y="380" width="70" height="20" rx="10" fill="#10b981"/>
                      <text x="435" y="394" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">SUCCESS!</text>
                    </g>
                  </svg>

                  {/* Status Indicators */}
                  <div className="flex justify-between items-center mt-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Team Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">In Development</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={handleScrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ArrowDownIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 