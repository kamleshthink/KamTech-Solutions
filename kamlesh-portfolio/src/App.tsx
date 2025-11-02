import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import UrgencyBanner from './components/UrgencyBanner';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AIAssistantButton from './components/AIAssistantButton';
import BookingForm from './components/BookingForm';
import CookieConsent from './components/CookieConsent';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from './components/PrivacyPolicy';

const App: React.FC = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const handleBookNowClick = () => {
    console.log('Book Now clicked - Opening Booking Form');
    setIsBookingFormOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <UrgencyBanner onBookNowClick={handleBookNowClick} />
        <Header />
        <main>
          <Hero onBookNowClick={() => setIsBookingFormOpen(true)} />
          <About />
          <Services onBookNowClick={() => setIsBookingFormOpen(true)} />
          <Process />
          <Projects />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer
          onTermsClick={() => setIsTermsOpen(true)}
          onCookiePolicyClick={() => setIsCookiePolicyOpen(true)}
          onPrivacyClick={() => setIsPrivacyPolicyOpen(true)}
        />
        <WhatsAppButton />
        <AIAssistantButton />
        <BookingForm
          isOpen={isBookingFormOpen}
          onClose={() => setIsBookingFormOpen(false)}
        />
        <CookieConsent
          onPrivacyClick={() => setIsPrivacyPolicyOpen(true)}
          onCookiePolicyClick={() => setIsCookiePolicyOpen(true)}
        />
        <TermsOfService
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />
        <CookiePolicy
          isOpen={isCookiePolicyOpen}
          onClose={() => setIsCookiePolicyOpen(false)}
        />
        <PrivacyPolicy
          isOpen={isPrivacyPolicyOpen}
          onClose={() => setIsPrivacyPolicyOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
