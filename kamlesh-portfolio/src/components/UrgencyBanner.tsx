import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const UrgencyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end of month as deadline
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Store in sessionStorage so it doesn't show again this session
    sessionStorage.setItem('urgencyBannerClosed', 'true');
  };

  useEffect(() => {
    const wasClosed = sessionStorage.getItem('urgencyBannerClosed');
    if (wasClosed) {
      setIsVisible(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white relative z-50"
        >
          <div className="container-custom py-2 sm:py-3">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Left side - Main message */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-2xl animate-pulse">🔥</span>
                  <span className="font-bold text-xs sm:text-sm md:text-base">
                    <span className="hidden sm:inline">LIMITED SLOTS: Only 3 Projects This Month!</span>
                    <span className="sm:hidden">3 Slots Left This Month!</span>
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-1 sm:gap-2 text-xs md:text-sm">
                  <span className="hidden md:inline">⏰</span>
                  <div className="flex gap-1 sm:gap-2">
                    <div className="bg-white/20 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs">
                      <span className="font-bold">{timeLeft.days}d</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs">
                      <span className="font-bold">{timeLeft.hours}h</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs">
                      <span className="font-bold">{timeLeft.minutes}m</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded hidden md:block">
                      <span className="font-bold">{timeLeft.seconds}s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - CTA and Close */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <a
                  href="#contact"
                  className="bg-white text-primary-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap hidden md:block"
                >
                  Book Now →
                </a>

                <button
                  onClick={handleClose}
                  className="p-0.5 sm:p-1 hover:bg-white/20 rounded transition-colors duration-200 flex-shrink-0"
                  aria-label="Close banner"
                >
                  <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Animated background effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrgencyBanner;
