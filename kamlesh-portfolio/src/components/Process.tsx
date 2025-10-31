import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface ProcessStep {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      icon: PhoneIcon,
      step: "01",
      title: "Discovery Call",
      description: "We start with a free 30-minute consultation to understand your business goals, target audience, and technical requirements. No sales pitch - just honest advice.",
      duration: "30 mins (Free)",
      deliverables: [
        "Project scope clarity",
        "Technology recommendations",
        "Initial timeline estimate",
        "Budget ballpark"
      ]
    },
    {
      icon: DocumentTextIcon,
      step: "02",
      title: "Proposal & Agreement",
      description: "Within 48 hours, you receive a detailed proposal including timeline, milestones, tech stack, and pricing. Once approved, we sign NDA and service agreement.",
      duration: "24-48 hours",
      deliverables: [
        "Detailed project proposal",
        "Wireframes & mockups",
        "Milestone-based timeline",
        "NDA & contract signed"
      ]
    },
    {
      icon: CodeBracketIcon,
      step: "03",
      title: "Development Sprints",
      description: "We work in 2-week sprints with weekly demos. You get access to a staging environment to test features as we build. Unlimited revisions during this phase.",
      duration: "2-12 weeks",
      deliverables: [
        "Weekly progress updates",
        "Staging environment access",
        "Sprint demo sessions",
        "Regular code commits"
      ]
    },
    {
      icon: RocketLaunchIcon,
      step: "04",
      title: "Launch & Support",
      description: "We handle complete deployment, testing, and launch. Post-launch, you get 3 months of free support including bug fixes, minor updates, and technical assistance.",
      duration: "Ongoing",
      deliverables: [
        "Production deployment",
        "Complete documentation",
        "Admin training session",
        "3 months free support"
      ]
    }
  ];

  return (
    <section id="process" className="section-padding paper-texture-purple">
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
            Our Proven <span className="gradient-text">Process</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transparent, efficient, and designed for success. Here's how we turn your idea into reality.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-purple-400 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative mb-12 lg:mb-24 ${
                index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'
              }`}
            >
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}>
                {/* Step Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-400">
                  {/* Icon & Step Number */}
                  <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? '' : 'lg:justify-end'}`}>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl text-white shadow-lg">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-4xl font-bold gradient-text">{step.step}</span>
                    </div>
                  </div>

                  {/* Title & Duration */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      ⏱️ {step.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      📦 What You Get:
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Center Circle (visible on large screens) */}
              <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-white dark:bg-gray-800 border-4 border-primary-500 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl mt-16"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Join 50+ satisfied clients who've transformed their ideas into successful digital products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Get Free Consultation
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              View Success Stories
            </a>
          </div>
          <p className="text-sm mt-6 opacity-75">
            ⚡ Limited slots: Only 3 new projects per month
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
