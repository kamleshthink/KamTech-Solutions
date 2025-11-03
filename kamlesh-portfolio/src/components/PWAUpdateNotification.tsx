import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PWAUpdateNotification: React.FC = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const handleServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
      // Check if there's a waiting service worker
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShowUpdate(true);
      }

      // Listen for new service worker being installed
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is installed and there's an existing controller
            setWaitingWorker(newWorker);
            setShowUpdate(true);
          }
        });
      });
    };

    // Get the service worker registration
    navigator.serviceWorker.ready.then(handleServiceWorkerUpdate);

    // Listen for controller change (new service worker activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isUpdating) {
        window.location.reload();
      }
    });

    // Check for updates periodically (every 5 minutes)
    const updateInterval = setInterval(() => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
      });
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [isUpdating]);

  const handleUpdate = () => {
    if (!waitingWorker) return;

    setIsUpdating(true);

    // Send message to waiting service worker to skip waiting
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });

    // The page will reload when controllerchange event fires
  };

  const handleDismiss = () => {
    setShowUpdate(false);
    // Show again after 1 hour
    setTimeout(() => {
      setShowUpdate(true);
    }, 60 * 60 * 1000);
  };

  if (!showUpdate) {
    return null;
  }

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-6 sm:max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden z-[9999] border border-gray-200 dark:border-gray-700"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <ArrowPathIcon className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white font-semibold text-sm">
                Update Available
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="p-1 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              aria-label="Dismiss"
            >
              <XMarkIcon className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
              A new version of PragyaTek Solutions is available. Update now to get the latest features and improvements!
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md ${
                  isUpdating ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-700 hover:to-emerald-700'
                }`}
              >
                {isUpdating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </motion.div>
                    Updating...
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="w-5 h-5" />
                    Update Now
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDismiss}
                disabled={isUpdating}
                className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Later
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAUpdateNotification;
