import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import ConsultationBooking from './ConsultationBooking';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "How much does a project typically cost?",
      answer: "Projects start from ₹80,000 ($1,000) for basic websites to ₹12L+ ($15,000+) for enterprise applications. The exact cost depends on your requirements, features, and timeline. We provide a detailed quote within 48 hours of our discovery call - completely free!"
    },
    {
      question: "What is your development timeline?",
      answer: "Simple websites: 2-3 weeks. E-commerce platforms: 4-6 weeks. Complex web apps: 8-12 weeks. Enterprise solutions: 12+ weeks. We provide weekly progress updates and maintain transparent communication throughout the project lifecycle."
    },
    {
      question: "Do you sign NDAs and provide IP rights?",
      answer: "Absolutely! We sign NDAs before any project discussion. Upon project completion and final payment, you receive complete IP (Intellectual Property) rights, source code, and all documentation. Your business idea and code are 100% yours."
    },
    {
      question: "What technologies do you work with?",
      answer: "We specialize in modern, industry-standard technologies: React, Next.js, Node.js, MongoDB, PostgreSQL, TypeScript, Python, and more. We choose the best tech stack based on your specific requirements, scalability needs, and budget."
    },
    {
      question: "What's included in post-launch support?",
      answer: "Every project includes 3 months of free support covering bug fixes, minor updates, and technical assistance. We also offer extended maintenance plans starting at ₹10,000/month including hosting, updates, security patches, and priority support."
    },
    {
      question: "Can you work with my existing team?",
      answer: "Yes! We seamlessly integrate with your existing development team, designers, or project managers. We're experienced in collaborative development, code reviews, and can adapt to your existing workflow and tools (Jira, Slack, GitHub, etc.)."
    },
    {
      question: "Do you provide hosting and deployment?",
      answer: "Yes, we handle complete deployment on platforms like AWS, Vercel, or your preferred hosting. We also provide hosting recommendations based on your traffic and budget. First year hosting setup is included in our full-stack packages."
    },
    {
      question: "What if I need changes after the project is completed?",
      answer: "We offer unlimited revisions during the development phase to ensure 100% satisfaction. Post-launch, the 3-month free support covers bug fixes. For new features or major changes, we provide affordable rates for existing clients - typically 30% less than new projects."
    },
    {
      question: "How do payments work?",
      answer: "We follow a milestone-based payment structure: 30% to start, 40% at mid-point, 30% on completion. For Fiverr/Upwork clients, we use their secure escrow system. We accept bank transfers, UPI, PayPal, and cryptocurrency."
    },
    {
      question: "Can I see examples of your previous work?",
      answer: "Absolutely! Check our Projects section above featuring live applications: Achhadam.com (1000+ users), Ramsethu Construction (₹3.5Cr+ projects), and ACEBITS.in (500+ members). We can also share industry-specific case studies during our consultation call."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding paper-texture-blue">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking for?
            <a href="#contact" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline ml-1">
              Contact us
            </a>
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary-400"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Still have questions? Let's talk!
          </p>
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Schedule Free Consultation
            <span className="text-sm">(Worth ₹5,000)</span>
          </button>
        </motion.div>
      </div>

      {/* Consultation Booking Modal */}
      <ConsultationBooking
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </section>
  );
};

export default FAQ;
