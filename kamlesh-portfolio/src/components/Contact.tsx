import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { ContactForm } from '../types';
import { contactAPI } from '../services/api';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().notRequired(),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters').max(200, 'Subject cannot exceed 200 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters').max(2000, 'Message cannot exceed 2000 characters'),
  projectBudget: yup.string().notRequired(),
  projectType: yup.string().notRequired(),
  urgency: yup.string().notRequired()
});

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>({
    resolver: yupResolver(schema) as any
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await contactAPI.submit(data);

      if (response.success) {
        setIsSubmitted(true);
        reset();

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Reset success message after 8 seconds
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setSubmitError(response.message || 'Failed to send message. Please try again.');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitError('Failed to send message. Please try again or email directly at kamleshsharma@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'kamleshsharma@gmail.com',
      link: 'mailto:kamleshsharma@gmail.com'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      value: '+91 72092 13003',
      link: 'tel:+917209213003'
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: 'Dhanbad, Jharkhand, India',
      link: 'https://maps.google.com/?q=Dhanbad,Jharkhand,India'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/kamleshthink', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kamlesh-sharmathink', icon: '💼' },
    { name: 'Portfolio', url: 'https://achhadam.com', icon: '🌐' },
    { name: 'Fiverr', url: 'https://www.fiverr.com', icon: '💼' }
  ];

  return (
    <section id="contact" className="section-padding paper-texture-gradient">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to <span className="gradient-text">Start Your Project?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Let's transform your idea into reality. Get a free consultation and project quote within 24 hours!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              💼 Hire on Fiverr
            </a>
            <a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              💼 Hire on Upwork
            </a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Let's Build Something Amazing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong className="text-gray-900 dark:text-white">PragyaTek Solutions</strong> is ready to bring your vision to life.
                Whether you're a startup looking for an MVP or an enterprise needing a scalable solution - we've got you covered.
              </p>
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-8">
                <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  ⚡ Why Choose Us?
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>✅ 2-3 Days Response Time</li>
                  <li>✅ Free Consultation (Worth ₹5,000)</li>
                  <li>✅ 100% Average ROI</li>
                  <li>✅ 3 Months Free Support</li>
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-2xl">🔒</span>
                  <div className="text-xs">
                    <div className="font-semibold text-gray-900 dark:text-white">SSL Encrypted</div>
                    <div className="text-gray-600 dark:text-gray-400">Your data is safe</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-2xl">📝</span>
                  <div className="text-xs">
                    <div className="font-semibold text-gray-900 dark:text-white">NDA Available</div>
                    <div className="text-gray-600 dark:text-gray-400">100% confidential</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-2xl">💰</span>
                  <div className="text-xs">
                    <div className="font-semibold text-gray-900 dark:text-white">Money-Back</div>
                    <div className="text-gray-600 dark:text-gray-400">If not satisfied</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-2xl">⚡</span>
                  <div className="text-xs">
                    <div className="font-semibold text-gray-900 dark:text-white">Fast Delivery</div>
                    <div className="text-gray-600 dark:text-gray-400">On-time guaranteed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
                    <info.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-2xl"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Message
            </h3>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className="mb-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-xl shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                  >
                    <CheckCircleIcon className="w-8 h-8 flex-shrink-0" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-1">Message Sent Successfully! ✨</h4>
                    <p className="text-green-50 text-sm leading-relaxed">
                      Thank you for reaching out! Your message has been received and I'll get back to you within 24-48 hours.
                      Check your email for a confirmation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2"
              >
                <XCircleIcon className="w-5 h-5" />
                <span>{submitError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  inputMode="text"
                  autoComplete="name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.name
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  inputMode="email"
                  autoComplete="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.email
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  inputMode="text"
                  autoComplete="off"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                    errors.subject
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Phone (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Project Details (Optional) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    {...register('projectType')}
                    id="projectType"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select...</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="ml-ai">ML/AI</option>
                    <option value="full-stack">Full Stack</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="projectBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    {...register('projectBudget')}
                    id="projectBudget"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select...</option>
                    <option value="less-than-1k">Less than $1K</option>
                    <option value="1k-5k">$1K - $5K</option>
                    <option value="5k-10k">$5K - $10K</option>
                    <option value="10k-50k">$10K - $50K</option>
                    <option value="50k-plus">$50K+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none ${
                    errors.message
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="Tell me about your project or just say hello..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 touch-manipulation active:scale-95"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 