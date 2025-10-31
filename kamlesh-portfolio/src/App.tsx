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

const App: React.FC = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <UrgencyBanner onBookNowClick={() => setIsBookingFormOpen(true)} />
        <Header />
        <main>
          <Hero onBookNowClick={() => setIsBookingFormOpen(true)} />
          <About />
          <Services />
          <Process />
          <Projects />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <AIAssistantButton />
        <BookingForm
          isOpen={isBookingFormOpen}
          onClose={() => setIsBookingFormOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
