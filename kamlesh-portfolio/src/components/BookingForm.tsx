import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  CloudArrowUpIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    clientName: '',
    email: '',
    phone: '',
    companyName: '',

    // Step 2: Project Details
    projectType: '',
    projectCategory: '',
    projectDomain: '',
    projectTimeline: '',
    budget: '',

    // Step 3: Technical Requirements
    platformType: [] as string[],
    frontendFeatures: [] as string[],
    backendFeatures: [] as string[],
    designPreference: '',

    // Step 4: Additional Details
    projectDescription: '',
    referenceWebsites: '',
    specialRequirements: '',

    // Step 5: Optional Company Info & Assets (optional)
    companyDescription: '',
    targetAudience: '',
    brandGuidelines: '',
    files: [] as File[]
  });

  const projectTypes = [
    'Website Development',
    'Mobile App Development',
    'E-Commerce Platform',
    'Web Application',
    'Landing Page',
    'Portfolio Website',
    'Business Website',
    'Blog/Content Platform',
    'SaaS Application',
    'Custom Software'
  ];

  const projectCategories = [
    'Startup MVP',
    'Enterprise Solution',
    'Small Business',
    'Personal Project',
    'Non-Profit',
    'Educational',
    'Healthcare',
    'Finance',
    'E-learning',
    'Other'
  ];

  const projectDomains = [
    'AgriTech',
    'E-Commerce',
    'Healthcare',
    'Education',
    'Finance',
    'Construction',
    'Real Estate',
    'Food & Beverage',
    'Travel & Tourism',
    'Technology',
    'Social Networking',
    'Entertainment',
    'Other'
  ];

  const timelines = [
    'Less than 1 week',
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  const budgetRanges = [
    '₹10,000 - ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000+',
    'To be discussed'
  ];

  const platformTypes = [
    'Web Application',
    'iOS App',
    'Android App',
    'Progressive Web App (PWA)',
    'Desktop Application',
    'Responsive Website'
  ];

  const frontendFeaturesList = [
    'User Authentication',
    'Dashboard/Admin Panel',
    'Payment Integration',
    'Real-time Chat',
    'Social Media Integration',
    'Search Functionality',
    'Filters & Sorting',
    'User Profiles',
    'Notification System',
    'File Upload',
    'Image Gallery',
    'Video Streaming',
    'Maps Integration',
    'Calendar/Booking',
    'Reviews & Ratings',
    'Analytics Dashboard',
    'Multi-language Support',
    'Dark Mode',
    'Email Templates',
    'PDF Generation'
  ];

  const backendFeaturesList = [
    'REST API',
    'GraphQL API',
    'Database (MongoDB/PostgreSQL/MySQL)',
    'Authentication & Authorization',
    'Payment Gateway',
    'Email Service',
    'SMS Service',
    'Cloud Storage (AWS/Cloudinary)',
    'Caching (Redis)',
    'Queue System',
    'Real-time WebSocket',
    'Third-party API Integration',
    'Cron Jobs/Scheduled Tasks',
    'Data Export/Import',
    'Logging & Monitoring',
    'Security (Rate Limiting, CORS)',
    'Backup System',
    'CI/CD Pipeline'
  ];

  const designPreferences = [
    'Modern & Minimalist',
    'Bold & Colorful',
    'Professional & Corporate',
    'Creative & Artistic',
    'Elegant & Sophisticated',
    'Playful & Fun',
    'Classic & Traditional',
    'You decide (Designer\'s Choice)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...filesArray] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.clientName && formData.email && formData.phone);
      case 2:
        return !!(formData.projectType && formData.projectCategory && formData.projectDomain && formData.projectTimeline && formData.budget);
      case 3:
        return formData.platformType.length > 0;
      case 4:
        return !!formData.projectDescription;
      case 5:
        return true; // Optional step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) {
      setSubmitError('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'files') {
          if (Array.isArray(value)) {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, value as string);
          }
        }
      });

      // Add files
      formData.files.forEach((file, index) => {
        formDataToSend.append(`files`, file);
      });

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const result = await response.json();
      setSubmitSuccess(true);

      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setCurrentStep(1);
        setFormData({
          clientName: '',
          email: '',
          phone: '',
          companyName: '',
          projectType: '',
          projectCategory: '',
          projectDomain: '',
          projectTimeline: '',
          budget: '',
          platformType: [],
          frontendFeatures: [],
          backendFeatures: [],
          designPreference: '',
          projectDescription: '',
          referenceWebsites: '',
          specialRequirements: '',
          companyDescription: '',
          targetAudience: '',
          brandGuidelines: '',
          files: []
        });
      }, 3000);

    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitError('Failed to submit booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <PhotoIcon className="w-5 h-5" />;
    if (file.type.startsWith('video/')) return <VideoCameraIcon className="w-5 h-5" />;
    return <DocumentIcon className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
          >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-4 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Start Your Project</h2>
                    <p className="text-white/90 text-xs sm:text-sm mt-1">Tell us about your project in detail</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="mt-4 sm:mt-6 flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${
                        currentStep >= step ? 'bg-white text-primary-600 border-white' : 'border-white/50 text-white/50'
                      }`}>
                        {currentStep > step ? (
                          <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <span className="text-xs sm:text-sm font-bold">{step}</span>
                        )}
                      </div>
                      {step < 5 && (
                        <div className={`flex-1 h-0.5 mx-1 sm:mx-2 ${
                          currentStep > step ? 'bg-white' : 'bg-white/30'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Labels */}
                <div className="mt-2 flex justify-between text-xs sm:text-xs text-white/80 px-1">
                  <span className="text-center">Basic</span>
                  <span className="text-center">Project</span>
                  <span className="text-center">Tech</span>
                  <span className="text-center">Details</span>
                  <span className="text-center">Assets</span>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Booking Submitted Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We'll review your requirements and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="clientName"
                              value={formData.clientName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                              placeholder="Your full name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                              placeholder="your.email@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                              placeholder="+91 98765 43210"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Company Name (Optional)
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                              placeholder="Your company name"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Project Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Project Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            >
                              <option value="">Select project type</option>
                              {projectTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Project Category <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="projectCategory"
                              value={formData.projectCategory}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            >
                              <option value="">Select category</option>
                              {projectCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Domain/Industry <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="projectDomain"
                              value={formData.projectDomain}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            >
                              <option value="">Select domain</option>
                              {projectDomains.map(domain => (
                                <option key={domain} value={domain}>{domain}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Timeline <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="projectTimeline"
                              value={formData.projectTimeline}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            >
                              <option value="">Select timeline</option>
                              {timelines.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Budget Range <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            >
                              <option value="">Select budget range</option>
                              {budgetRanges.map(budget => (
                                <option key={budget} value={budget}>{budget}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Technical Requirements */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Technical Requirements
                        </h3>

                        {/* Platform Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Platform Type <span className="text-red-500">*</span> (Select all that apply)
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {platformTypes.map(platform => (
                              <button
                                key={platform}
                                type="button"
                                onClick={() => handleMultiSelect('platformType', platform)}
                                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                                  formData.platformType.includes(platform)
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:text-gray-300'
                                }`}
                              >
                                {platform}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Frontend Features */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Frontend Features (Select all that apply)
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto custom-scrollbar p-2">
                            {frontendFeaturesList.map(feature => (
                              <button
                                key={feature}
                                type="button"
                                onClick={() => handleMultiSelect('frontendFeatures', feature)}
                                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                                  formData.frontendFeatures.includes(feature)
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:text-gray-300'
                                }`}
                              >
                                {feature}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Backend Features */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Backend Features (Select all that apply)
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto custom-scrollbar p-2">
                            {backendFeaturesList.map(feature => (
                              <button
                                key={feature}
                                type="button"
                                onClick={() => handleMultiSelect('backendFeatures', feature)}
                                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                                  formData.backendFeatures.includes(feature)
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:text-gray-300'
                                }`}
                              >
                                {feature}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Design Preference */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Design Preference
                          </label>
                          <select
                            name="designPreference"
                            value={formData.designPreference}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                          >
                            <option value="">Select design style</option>
                            {designPreferences.map(pref => (
                              <option key={pref} value={pref}>{pref}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Additional Details */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Additional Details
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Describe your project in detail. What problem does it solve? Who are your target users?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Reference Websites (Optional)
                          </label>
                          <textarea
                            name="referenceWebsites"
                            value={formData.referenceWebsites}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Share links to websites you like or want to use as inspiration (one per line)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Special Requirements (Optional)
                          </label>
                          <textarea
                            name="specialRequirements"
                            value={formData.specialRequirements}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Any special requirements, constraints, or things we should know about?"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Optional Company Info & Assets */}
                    {currentStep === 5 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                          <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>Optional Step:</strong> This information helps us understand your brand better, but you can skip it and provide details later.
                          </p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Company Information & Assets (Optional)
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company Description
                          </label>
                          <textarea
                            name="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Tell us about your company, mission, and values"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Target Audience
                          </label>
                          <textarea
                            name="targetAudience"
                            value={formData.targetAudience}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Who is your target audience? Demographics, interests, etc."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Brand Guidelines
                          </label>
                          <textarea
                            name="brandGuidelines"
                            value={formData.brandGuidelines}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                            placeholder="Brand colors, fonts, tone of voice, or link to brand guidelines document"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Upload Assets (Images, Videos, Logos, Documents)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*,.pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="hidden"
                              id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                PNG, JPG, PDF, MP4 up to 10MB each
                              </p>
                            </label>
                          </div>

                          {/* Uploaded Files List */}
                          {formData.files.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {formData.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    {getFileIcon(file)}
                                    <div>
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <XMarkIcon className="w-5 h-5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitError && (
                      <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                        <ExclamationCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800 dark:text-red-300">{submitError}</p>
                      </div>
                    )}
                  </>
                )}
                </form>
              </div>

              {/* Footer with Navigation */}
              {!submitSuccess && (
                <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex justify-between items-center gap-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        currentStep === 1
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      Previous
                    </button>

                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Step {currentStep} of 5
                    </div>

                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                          validateStep(currentStep)
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !validateStep(4)}
                        className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                          isSubmitting || !validateStep(4)
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700'
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    )}
                  </div>
                </div>
              )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;
