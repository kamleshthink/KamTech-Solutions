import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CookiePolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll and prevent floating
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
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

  if (!isOpen) return null;

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full pointer-events-auto mx-auto my-auto flex flex-col"
              style={{
                maxHeight: 'calc(100vh - 1rem)',
                height: 'auto'
              }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex justify-between items-center flex-shrink-0 rounded-t-xl">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Cookie Policy</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 custom-scrollbar" style={{ minHeight: 0 }}>
                <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 dark:text-gray-300">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                      <strong>Last Updated:</strong> November 2, 2025
                    </p>
                    <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                      This Cookie Policy explains how PragyaTek Solutions Private Limited uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
                    </p>
                  </div>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">1. What Are Cookies?</h3>
                    <p className="mb-2 sm:mb-3 text-sm sm:text-base">
                      Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                    </p>
                    <p className="mb-2 sm:mb-3 text-sm sm:text-base">
                      Cookies set by the website owner (in this case, PragyaTek Solutions Private Limited) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., analytics, advertising, and interactive content).
                    </p>
                    <p className="text-sm sm:text-base">
                      <strong>Session Cookies:</strong> These are temporary cookies that remain in your browser only while you are using our website and are deleted when you close your browser.
                    </p>
                    <p className="mt-2 text-sm sm:text-base">
                      <strong>Persistent Cookies:</strong> These cookies remain in your browser for a set period of time or until you manually delete them. They are used to remember your preferences and actions across multiple visits.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">2. Why We Use Cookies</h3>
                    <p className="mb-2 sm:mb-3 text-sm sm:text-base">
                      We use first-party and third-party cookies for several reasons:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base">
                      <li><strong>Essential Functionality:</strong> Some cookies are required for technical reasons in order for our website to operate properly</li>
                      <li><strong>User Experience:</strong> To remember your preferences and settings</li>
                      <li><strong>Analytics:</strong> To understand how visitors use our website and improve our services</li>
                      <li><strong>Marketing:</strong> To deliver relevant advertisements and track advertising campaign performance</li>
                      <li><strong>Security:</strong> To protect your data and prevent fraudulent activity</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">3. Types of Cookies We Use</h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Essential Cookies</h4>
                        <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          These cookies are strictly necessary for the website to function and cannot be disabled in our systems. They are usually only set in response to actions made by you which amount to a request for services.
                        </p>
                        <p className="text-xs sm:text-sm">
                          <strong>Examples:</strong> Authentication cookies, security cookies, load balancing cookies, cookie consent preferences
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Duration:</strong> Session or up to 1 year
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 sm:p-4 rounded">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Analytics and Performance Cookies</h4>
                        <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                        </p>
                        <p className="text-xs sm:text-sm">
                          <strong>Examples:</strong> Google Analytics, custom analytics tracking
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Information Collected:</strong> Pages visited, time spent on pages, browser type, device type, geographic location, referring website
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Duration:</strong> Up to 2 years
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Third Parties:</strong> Google Analytics
                        </p>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-3 sm:p-4 rounded">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Functionality Cookies</h4>
                        <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                        </p>
                        <p className="text-xs sm:text-sm">
                          <strong>Examples:</strong> Language preferences, theme preferences, form data retention
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Duration:</strong> Up to 1 year
                        </p>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-3 sm:p-4 rounded">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Marketing and Targeting Cookies</h4>
                        <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm">
                          These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
                        </p>
                        <p className="text-xs sm:text-sm">
                          <strong>Examples:</strong> Advertising cookies, social media cookies, remarketing pixels
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Information Collected:</strong> Browsing behavior, interests, demographics
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Duration:</strong> Up to 2 years
                        </p>
                        <p className="text-xs sm:text-sm mt-1.5 sm:mt-2">
                          <strong>Third Parties:</strong> Google Ads, Facebook Pixel, LinkedIn Insights
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">4. Detailed Cookie List</h3>
                    <div className="overflow-x-auto -mx-3 sm:mx-0">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white">Cookie Name</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white">Purpose</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white">Type</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">cookie_consent</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Stores your cookie preferences</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Essential</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">1 year</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-2 sm:px-4 py-2 sm:py-3">session_id</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Maintains your session</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Essential</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Session</td>
                          </tr>
                          <tr>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">_ga</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Google Analytics - distinguish users</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Analytics</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">2 years</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-2 sm:px-4 py-2 sm:py-3">_gid</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Google Analytics - distinguish users</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Analytics</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">24 hours</td>
                          </tr>
                          <tr>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">_fbp</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Facebook Pixel - track conversions</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Marketing</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">3 months</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-2 sm:px-4 py-2 sm:py-3">user_preferences</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Stores UI preferences</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">Functionality</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">5. How to Manage Cookies</h3>
                    <p className="mb-2 sm:mb-3 text-sm sm:text-base">
                      You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent Banner when you first visit our website, or by clicking on the cookie settings link in the footer.
                    </p>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 sm:p-4 rounded mb-3 sm:mb-4">
                      <p className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Important Note:</p>
                      <p className="text-xs sm:text-sm">
                        If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                      </p>
                    </div>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 mt-3 sm:mt-4 text-sm sm:text-base">Browser Controls:</h4>
                    <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
                      Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                    </p>

                    <div className="space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                      <p className="text-xs sm:text-sm"><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                      <p className="text-xs sm:text-sm"><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                      <p className="text-xs sm:text-sm"><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                      <p className="text-xs sm:text-sm"><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
                    </div>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 mt-3 sm:mt-4 text-sm sm:text-base">Third-Party Opt-Out:</h4>
                    <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm">You can opt out of third-party cookies through:</p>
                    <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4 text-xs sm:text-sm">
                      <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 dark:text-blue-400 hover:underline break-all" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></li>
                      <li>Facebook: Ad Settings in your Facebook account</li>
                      <li>Your Online Choices: <a href="http://www.youronlinechoices.com/" className="text-blue-600 dark:text-blue-400 hover:underline break-all" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com/</a></li>
                      <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/" className="text-blue-600 dark:text-blue-400 hover:underline break-all" target="_blank" rel="noopener noreferrer">http://www.networkadvertising.org/</a></li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">6. Do Not Track Signals</h3>
                    <p className="text-sm sm:text-base">
                      Some browsers incorporate a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals, and we do not currently respond to DNT signals on this website.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">7. Updates to This Cookie Policy</h3>
                    <p className="mb-2 sm:mb-3 text-sm sm:text-base">
                      We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page with an updated "Last Updated" date.
                    </p>
                    <p className="text-sm sm:text-base">
                      We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies and related technologies.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">8. Contact Information</h3>
                    <p className="mb-1.5 sm:mb-2 text-sm sm:text-base">
                      If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2">
                      <p className="text-xs sm:text-sm"><strong>Company:</strong> PragyaTek Solutions Private Limited</p>
                      <p className="text-xs sm:text-sm"><strong>Email:</strong> support@pragyateksolutions.com</p>
                      <p className="text-xs sm:text-sm"><strong>Alternative Email:</strong> kamleshsamudih@gmail.com</p>
                      <p className="text-xs sm:text-sm"><strong>Phone:</strong> +91 7209213003, +91 8969445367</p>
                      <p className="text-xs sm:text-sm"><strong>Address:</strong> Sindri, Dhanbad, Jharkhand, India</p>
                    </div>
                  </section>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 mt-6 sm:mt-8">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
                      By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex-shrink-0 rounded-b-xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm sm:text-base shadow-lg"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookiePolicy;
