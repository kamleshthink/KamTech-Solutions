import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';

interface CookieConsentProps {
  onPrivacyClick: () => void;
  onCookiePolicyClick: () => void;
}

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Simple UUID v4 generator
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const CookieConsent: React.FC<CookieConsentProps> = ({ onPrivacyClick, onCookiePolicyClick }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Check if user has already given consent
    const consentGiven = localStorage.getItem('cookie_consent');
    const storedUserId = localStorage.getItem('cookie_user_id');

    if (!consentGiven) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }

    // Get or create user ID
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = generateUUID();
      setUserId(newUserId);
      localStorage.setItem('cookie_user_id', newUserId);
    }
  }, []);

  const saveConsent = async (acceptedPreferences: ConsentPreferences) => {
    try {
      const consentData = {
        userId,
        acceptedCategories: Object.entries(acceptedPreferences)
          .filter(([_, value]) => value)
          .map(([key, _]) => key),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        preferences: acceptedPreferences,
      };

      // Save to localStorage
      localStorage.setItem('cookie_consent', JSON.stringify(consentData));
      localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());

      // Save to backend
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/cookie-consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentData),
      });

      if (!response.ok) {
        console.error('Failed to save consent to backend');
      }

      // Apply cookie preferences
      applyCookiePreferences(acceptedPreferences);

      // Hide banner
      setShowBanner(false);
      setShowCustomize(false);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
      // Still save locally and hide banner even if API fails
      localStorage.setItem('cookie_consent', JSON.stringify(preferences));
      setShowBanner(false);
      setShowCustomize(false);
    }
  };

  const applyCookiePreferences = (prefs: ConsentPreferences) => {
    // Essential cookies are always enabled

    // Analytics cookies
    if (prefs.analytics) {
      // Enable Google Analytics or other analytics
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
      console.log('Analytics cookies enabled');
    } else {
      // Disable analytics
      // window.gtag('consent', 'update', { analytics_storage: 'denied' });
      console.log('Analytics cookies disabled');
    }

    // Marketing cookies
    if (prefs.marketing) {
      // Enable marketing/advertising cookies
      // window.gtag('consent', 'update', { ad_storage: 'granted' });
      console.log('Marketing cookies enabled');
    } else {
      // Disable marketing cookies
      // window.gtag('consent', 'update', { ad_storage: 'denied' });
      console.log('Marketing cookies disabled');
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(essentialOnly);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  const handlePreferenceChange = (category: keyof ConsentPreferences) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Banner */}
      {!showCustomize && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-500 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-600">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                    By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or learn more in our{' '}
                    <button
                      onClick={onCookiePolicyClick}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Cookie Policy
                    </button>
                    {' '}and{' '}
                    <button
                      onClick={onPrivacyClick}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Panel */}
      {showCustomize && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Cookie className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
              </div>
              <button
                onClick={() => setShowCustomize(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <p className="text-gray-600">
                We use cookies to provide you with the best possible experience. You can choose which types of cookies you want to allow.
                Note that blocking some types of cookies may impact your experience on our website.
              </p>

              {/* Essential Cookies */}
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      Essential Cookies
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        Always Active
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies are necessary for the website to function and cannot be disabled. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className="ml-4"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                    } px-1`}>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      These cookies are used to track visitors across websites to display relevant advertisements. They may be set by our advertising partners to build a profile of your interests.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className="ml-4"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.marketing ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                    } px-1`}>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> You can change your cookie preferences at any time by clicking the cookie settings icon in the footer of our website.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-3 rounded-b-2xl">
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleSaveCustom}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
              >
                Save My Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
