import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import AIChatbot from './AIChatbot';

const AIAssistantButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleClick = () => {
    setIsChatbotOpen(true);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.3, duration: 0.5, type: "spring" }}
      className="fixed bottom-[5.5rem] right-4 sm:bottom-[6.5rem] sm:right-6 z-[9999]"
    >
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-full shadow-2xl cursor-pointer group"
      >
        {/* AI Sparkles Icon */}
        <SparklesIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75"></span>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium">
                AI Project Assistant
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center"
      >
        <span className="text-gray-900 text-[10px] sm:text-xs font-bold">AI</span>
      </motion.div>

      {/* AI Chatbot Modal */}
      <AIChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </motion.div>
  );
};

export default AIAssistantButton;
