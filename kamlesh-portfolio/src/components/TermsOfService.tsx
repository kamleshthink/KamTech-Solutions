import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
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
              Welcome to PragyaTek Solutions Private Limited. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </div>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h3>
            <p className="mb-3">
              By accessing and using the services provided by PragyaTek Solutions Private Limited, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
            <p>
              If you do not agree to these Terms, you must not access or use our services. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Services Description</h3>
            <p className="mb-3">
              PragyaTek Solutions Private Limited provides a range of professional services including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Web Development and Design</li>
              <li>Mobile Application Development</li>
              <li>UI/UX Design Services</li>
              <li>AI/ML Solutions and Integration</li>
              <li>Digital Consulting Services</li>
              <li>Custom Software Development</li>
              <li>Technical Support and Maintenance</li>
            </ul>
            <p className="mt-3">
              The specific scope, deliverables, and timeline for each service will be defined in individual project agreements or statements of work.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h3>
            <p className="mb-3">As a user of our services, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information when required</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not engage in any activity that interferes with or disrupts our services</li>
              <li>Not attempt to gain unauthorized access to any portion of our systems</li>
              <li>Respect all intellectual property rights</li>
              <li>Comply with all applicable local, state, national, and international laws</li>
              <li>Provide timely feedback and approvals as required for project completion</li>
              <li>Honor payment obligations as outlined in project agreements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Intellectual Property</h3>
            <p className="mb-3">
              <strong>Our Intellectual Property:</strong> All content, features, and functionality on our website and services, including but not limited to text, graphics, logos, images, software, and code, are the exclusive property of PragyaTek Solutions Private Limited and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-3">
              <strong>Client Work Product:</strong> Upon full payment for services rendered, ownership of the final deliverables created specifically for you will be transferred to you as outlined in the project agreement. However, we retain the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
              <li>Use general methodologies, concepts, and techniques developed during the project</li>
              <li>Display the work in our portfolio with your permission</li>
              <li>Reuse code libraries, frameworks, and tools that are proprietary to us</li>
            </ul>
            <p>
              <strong>Third-Party Assets:</strong> Any third-party assets, libraries, or frameworks used in your project remain the property of their respective owners and are licensed according to their terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Payment Terms</h3>
            <p className="mb-3">
              <strong>Project-Based Payments:</strong> Payment terms for specific projects will be outlined in individual project agreements. Generally, our payment structure includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
              <li>Initial deposit (typically 30-50%) upon project commencement</li>
              <li>Milestone payments as defined in the project agreement</li>
              <li>Final payment upon project completion and delivery</li>
            </ul>
            <p className="mb-3">
              <strong>Payment Methods:</strong> We accept payments via bank transfer, UPI, credit/debit cards, and other methods as specified in the invoice.
            </p>
            <p className="mb-3">
              <strong>Late Payments:</strong> Invoices are due within the timeframe specified. Late payments may result in:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
              <li>Suspension of work until payment is received</li>
              <li>Late fees as specified in the project agreement</li>
              <li>Withholding of deliverables until full payment</li>
            </ul>
            <p>
              <strong>Refunds:</strong> Refund policies are project-specific and will be detailed in individual agreements. Generally, deposits are non-refundable once work has commenced.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h3>
            <p className="mb-3">
              To the maximum extent permitted by law, PragyaTek Solutions Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Loss of data or information</li>
              <li>Business interruption</li>
              <li>Loss of goodwill or reputation</li>
            </ul>
            <p className="mb-3">
              Our total liability for any claims arising from our services shall not exceed the total amount paid by you for the specific service giving rise to the claim.
            </p>
            <p>
              <strong>Service Warranties:</strong> We strive to provide high-quality services but do not guarantee that our services will be uninterrupted, error-free, or meet all your requirements. We provide services on an "as is" and "as available" basis.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h3>
            <p className="mb-3">
              <strong>Termination by You:</strong> You may terminate a project agreement by providing written notice. Termination terms, including any fees or refunds, will be governed by the specific project agreement.
            </p>
            <p className="mb-3">
              <strong>Termination by Us:</strong> We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
              <li>Breach of these Terms of Service</li>
              <li>Non-payment of invoices</li>
              <li>Fraudulent or illegal activity</li>
              <li>Abusive or disrespectful behavior toward our team</li>
            </ul>
            <p>
              <strong>Effect of Termination:</strong> Upon termination, your right to use our services will immediately cease. You remain liable for any payments due for services rendered prior to termination.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Governing Law</h3>
            <p className="mb-3">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            <p className="mb-3">
              Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts located in Dhanbad, Jharkhand, India.
            </p>
            <p>
              <strong>Dispute Resolution:</strong> In the event of any dispute, we encourage you to contact us first to seek an amicable resolution. If a resolution cannot be reached, either party may pursue legal remedies as permitted by law.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h3>
            <p className="mb-3">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be notified through our website or via email to registered users.
            </p>
            <p>
              Your continued use of our services after any changes indicates your acceptance of the new Terms. It is your responsibility to review these Terms periodically.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Miscellaneous</h3>
            <p className="mb-3">
              <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>
            <p className="mb-3">
              <strong>Waiver:</strong> No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
            </p>
            <p>
              <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and any project-specific agreements, constitute the entire agreement between you and PragyaTek Solutions Private Limited regarding our services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h3>
            <p className="mb-2">
              If you have any questions about these Terms of Service, please contact us:
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
              By using our services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
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

export default TermsOfService;
