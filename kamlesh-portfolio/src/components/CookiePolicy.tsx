import React from 'react';
import { X } from 'lucide-react';

interface CookiePolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6 text-gray-700">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Last Updated:</strong> November 2, 2025
            </p>
            <p className="mb-4">
              This Cookie Policy explains how PragyaTek Solutions Private Limited uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
            </p>
          </div>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. What Are Cookies?</h3>
            <p className="mb-3">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="mb-3">
              Cookies set by the website owner (in this case, PragyaTek Solutions Private Limited) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., analytics, advertising, and interactive content).
            </p>
            <p>
              <strong>Session Cookies:</strong> These are temporary cookies that remain in your browser only while you are using our website and are deleted when you close your browser.
            </p>
            <p className="mt-2">
              <strong>Persistent Cookies:</strong> These cookies remain in your browser for a set period of time or until you manually delete them. They are used to remember your preferences and actions across multiple visits.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Why We Use Cookies</h3>
            <p className="mb-3">
              We use first-party and third-party cookies for several reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Essential Functionality:</strong> Some cookies are required for technical reasons in order for our website to operate properly</li>
              <li><strong>User Experience:</strong> To remember your preferences and settings</li>
              <li><strong>Analytics:</strong> To understand how visitors use our website and improve our services</li>
              <li><strong>Marketing:</strong> To deliver relevant advertisements and track advertising campaign performance</li>
              <li><strong>Security:</strong> To protect your data and prevent fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Types of Cookies We Use</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                <p className="mb-2">
                  These cookies are strictly necessary for the website to function and cannot be disabled in our systems. They are usually only set in response to actions made by you which amount to a request for services.
                </p>
                <p className="text-sm">
                  <strong>Examples:</strong> Authentication cookies, security cookies, load balancing cookies, cookie consent preferences
                </p>
                <p className="text-sm mt-2">
                  <strong>Duration:</strong> Session or up to 1 year
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Analytics and Performance Cookies</h4>
                <p className="mb-2">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                </p>
                <p className="text-sm">
                  <strong>Examples:</strong> Google Analytics, custom analytics tracking
                </p>
                <p className="text-sm mt-2">
                  <strong>Information Collected:</strong> Pages visited, time spent on pages, browser type, device type, geographic location, referring website
                </p>
                <p className="text-sm mt-2">
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <p className="text-sm mt-2">
                  <strong>Third Parties:</strong> Google Analytics
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Functionality Cookies</h4>
                <p className="mb-2">
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                <p className="text-sm">
                  <strong>Examples:</strong> Language preferences, theme preferences, form data retention
                </p>
                <p className="text-sm mt-2">
                  <strong>Duration:</strong> Up to 1 year
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Marketing and Targeting Cookies</h4>
                <p className="mb-2">
                  These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
                </p>
                <p className="text-sm">
                  <strong>Examples:</strong> Advertising cookies, social media cookies, remarketing pixels
                </p>
                <p className="text-sm mt-2">
                  <strong>Information Collected:</strong> Browsing behavior, interests, demographics
                </p>
                <p className="text-sm mt-2">
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <p className="text-sm mt-2">
                  <strong>Third Parties:</strong> Google Ads, Facebook Pixel, LinkedIn Insights
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Detailed Cookie List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Cookie Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">cookie_consent</td>
                    <td className="px-4 py-3">Stores your cookie preferences</td>
                    <td className="px-4 py-3">Essential</td>
                    <td className="px-4 py-3">1 year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3">session_id</td>
                    <td className="px-4 py-3">Maintains your session</td>
                    <td className="px-4 py-3">Essential</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">_ga</td>
                    <td className="px-4 py-3">Google Analytics - distinguish users</td>
                    <td className="px-4 py-3">Analytics</td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3">_gid</td>
                    <td className="px-4 py-3">Google Analytics - distinguish users</td>
                    <td className="px-4 py-3">Analytics</td>
                    <td className="px-4 py-3">24 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">_fbp</td>
                    <td className="px-4 py-3">Facebook Pixel - track conversions</td>
                    <td className="px-4 py-3">Marketing</td>
                    <td className="px-4 py-3">3 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3">user_preferences</td>
                    <td className="px-4 py-3">Stores UI preferences</td>
                    <td className="px-4 py-3">Functionality</td>
                    <td className="px-4 py-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5. How to Manage Cookies</h3>
            <p className="mb-3">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent Banner when you first visit our website, or by clicking on the cookie settings link in the footer.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
              <p className="font-semibold mb-2">Important Note:</p>
              <p>
                If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2 mt-4">Browser Controls:</h4>
            <p className="mb-3">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>

            <div className="space-y-2 ml-4">
              <p><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
              <p><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
              <p><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
              <p><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2 mt-4">Third-Party Opt-Out:</h4>
            <p className="mb-2">You can opt out of third-party cookies through:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></li>
              <li>Facebook: Ad Settings in your Facebook account</li>
              <li>Your Online Choices: <a href="http://www.youronlinechoices.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com/</a></li>
              <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">http://www.networkadvertising.org/</a></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Do Not Track Signals</h3>
            <p>
              Some browsers incorporate a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals, and we do not currently respond to DNT signals on this website.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Updates to This Cookie Policy</h3>
            <p className="mb-3">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page with an updated "Last Updated" date.
            </p>
            <p>
              We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Information</h3>
            <p className="mb-2">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><strong>Company:</strong> PragyaTek Solutions Private Limited</p>
              <p><strong>Email:</strong> support@pragyateksolutions.com</p>
              <p><strong>Alternative Email:</strong> kamleshsamudih@gmail.com</p>
              <p><strong>Phone:</strong> +91 7209213003, +91 8969445367</p>
              <p><strong>Address:</strong> Sindri, Dhanbad, Jharkhand, India</p>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-sm text-gray-600 text-center">
              By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
