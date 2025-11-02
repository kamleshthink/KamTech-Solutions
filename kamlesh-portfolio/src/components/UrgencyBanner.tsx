import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface UrgencyBannerProps {
  onBookNowClick: () => void;
}

const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ onBookNowClick }) => {
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
    // Banner will show again on page refresh
  };

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
          <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 relative z-10">
            <div className="flex items-center justify-between gap-1.5 sm:gap-3">
              {/* Left side - Main message */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-base sm:text-xl animate-pulse">🔥</span>
                  <span className="font-bold text-[10px] sm:text-xs md:text-sm">
                    <span className="hidden sm:inline">LIMITED SLOTS: Only 3 Projects This Month!</span>
                    <span className="sm:hidden">3 Slots Left!</span>
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                  <span className="hidden lg:inline text-xs">⏰</span>
                  <div className="flex gap-1">
                    <div className="bg-white/20 backdrop-blur-sm px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded">
                      <span className="font-bold">{timeLeft.days}d</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded">
                      <span className="font-bold">{timeLeft.hours}h</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded">
                      <span className="font-bold">{timeLeft.minutes}m</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded hidden lg:block">
                      <span className="font-bold">{timeLeft.seconds}s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - CTA and Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 relative z-20">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Book Now button clicked!');
                    onBookNowClick();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-white text-primary-600 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg font-bold text-[10px] sm:text-xs md:text-sm hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl animate-pulse cursor-pointer z-30"
                  style={{ animationDuration: '2s', pointerEvents: 'auto' }}
                >
                  <span className="relative z-10 flex items-center gap-1 pointer-events-none">
                    🚀 Book Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button clicked!');
                    handleClose();
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 sm:p-2 hover:bg-white/30 bg-white/10 rounded-lg transition-all duration-200 flex-shrink-0 cursor-pointer z-30 border border-white/20 hover:border-white/40"
                  aria-label="Close banner"
                  style={{ pointerEvents: 'auto' }}
                >
                  <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Animated background effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer pointer-events-none"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrgencyBanner;
