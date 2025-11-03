import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll and prevent floating
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      setCurrentImageIndex(0);
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !project?.gallery) return;

      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex, project]);

  if (!project) return null;

  const gallery = project.gallery || [];
  const hasGallery = gallery.length > 0;

  const handlePrevImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setIsImageLoading(true);
    setCurrentImageIndex(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto mx-auto my-auto"
              style={{
                maxHeight: 'calc(100vh - 1rem)',
                height: 'auto'
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                    {project.title}
                  </h2>
                  <p className="text-primary-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
                    {hasGallery && `${gallery.length} screenshots available`}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex-shrink-0 p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 custom-scrollbar" style={{ minHeight: 0 }}>
                <div className="max-w-7xl mx-auto">
                  {/* Image Gallery */}
                  {hasGallery && (
                    <div className="mb-8">
                      {/* Main Image */}
                      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                        <div className="aspect-video relative">
                          {isImageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                            </div>
                          )}
                          <img
                            src={gallery[currentImageIndex]}
                            alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain"
                            onLoad={() => setIsImageLoading(false)}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/1200x675/3B82F6/FFFFFF?text=Screenshot+${currentImageIndex + 1}`;
                              setIsImageLoading(false);
                            }}
                          />
                        </div>

                        {/* Navigation Buttons */}
                        {gallery.length > 1 && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handlePrevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-colors duration-200"
                            >
                              <ChevronLeftIcon className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleNextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-colors duration-200"
                            >
                              <ChevronRightIcon className="w-6 h-6" />
                            </motion.button>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                              {currentImageIndex + 1} / {gallery.length}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Thumbnail Grid */}
                      {gallery.length > 1 && (
                        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                          {gallery.map((image: string, index: number) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleThumbnailClick(index)}
                              className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                currentImageIndex === index
                                  ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2 dark:ring-offset-gray-900'
                                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Project Overview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {project.detailedDescription || project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string, index: number) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                          >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            Visit Live Site
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                          >
                            <CodeBracketIcon className="w-5 h-5" />
                            View Source Code
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      {/* Stats */}
                      {project.stats && Object.keys(project.stats).filter(k => k !== 'commits').length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Project Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(project.stats)
                              .filter(([key]) => key !== 'commits')
                              .map(([key, value], index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800"
                                >
                                  <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
                                    {String(value)}
                                  </div>
                                  <div className="text-sm text-green-600 dark:text-green-500 font-medium capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Key Features */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <span className="text-2xl">✨</span>
                          Key Highlights
                        </h4>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          {project.featured && (
                            <li className="flex items-start gap-2">
                              <span className="text-primary-600 mt-1">🏆</span>
                              <span>Featured Project - Top Tier Quality</span>
                            </li>
                          )}
                          <li className="flex items-start gap-2">
                            <span className="text-primary-600 mt-1">🚀</span>
                            <span>Production-ready with live deployment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-600 mt-1">💡</span>
                            <span>Modern tech stack and best practices</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-600 mt-1">📱</span>
                            <span>Fully responsive and mobile-optimized</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-600 mt-1">⚡</span>
                            <span>Optimized performance and SEO</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
