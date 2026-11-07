import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I know what fits?',
    answer:
      'Choose your make, model, year and variant. Vehicle not listed? Ask WNK about a custom design. Every kit in our catalogue is patterned to exact factory CAD dimensions.',
  },
  {
    id: 'faq-2',
    question: 'When will my wrap arrive?',
    answer:
      'Standard wraps are prepared and dispatched within 3 business days in heavy-duty reinforced rigid tubes. Delivery across India typically takes 2–5 days depending on your postal pin code.',
  },
  {
    id: 'faq-3',
    question: 'Which finishes are available?',
    answer:
      'We offer Matte (glare-free satin texture) and Gloss (high-reflectivity deep finish) across all our automotive cast vinyl collections.',
  },
  {
    id: 'faq-4',
    question: 'Can I cancel an order?',
    answer:
      'Because each wrap kit is precision-cut to order, cancellation requests are accepted within 12 hours of placing your order request via WhatsApp before material plotting commences.',
  },
  {
    id: 'faq-5',
    question: 'What if my order arrives damaged?',
    answer:
      'In the rare event of transit damage to the packaging or vinyl, send clear photos within 48 hours of delivery to wnkautomotive01@gmail.com or via WhatsApp (+91 92842 47387) for an immediate free replacement.',
  },
  {
    id: 'faq-6',
    question: 'Can I order without an account?',
    answer:
      'Yes. WNK does not require account creation. We handle your configuration, order verification, and tracking updates directly through WhatsApp and email.',
  },
];

export const HelpContactPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Support Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderRef: '',
    question: '',
    requestCallback: false,
    phone: '',
    agreeDemo: false,
  });

  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePreviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.question.trim()) {
      alert('Please enter your name, email, and your question.');
      return;
    }
    setPreviewModalOpen(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `*WNK AUTOMOTIVE SUPPORT REQUEST*
Name: ${formData.name.trim()}
Email: ${formData.email.trim()}
Order Reference: ${formData.orderRef.trim() || 'N/A'}
Request Callback: ${formData.requestCallback ? `YES (${formData.phone.trim() || 'No number provided'})` : 'NO'}

*Question / Inquiry:*
${formData.question.trim()}`;

    window.open(`https://wa.me/919284247387?text=${encodeURIComponent(text)}`, '_blank');
    setPreviewModalOpen(false);
  };

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* 1. Header Section */}
      <section className="border-b border-line py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-3">
            HELP / THE DETAILS
          </span>
          <h1 className="font-sans font-medium text-[40px] sm:text-[56px] lg:text-[76px] leading-[1.05] tracking-[-2px] text-ink">
            Good questions. Clear answers<span className="text-red">.</span>
          </h1>
        </div>
      </section>

      {/* 2. Main FAQ Section: How it works (Left) & FAQs (Right) */}
      <section className="py-14 lg:py-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: How it works */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="font-sans font-medium text-[24px] sm:text-[28px] text-ink">
                How it works
              </h2>

              <div className="space-y-8">
                {/* Step 01 */}
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-ink text-white font-mono text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                    01
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-[16px] text-ink mb-1">
                      Find your fit.
                    </h3>
                    <p className="font-sans text-[14px] text-secondary leading-relaxed">
                      Select your car or bike, then choose its make, model and year.
                    </p>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-ink text-white font-mono text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                    02
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-[16px] text-ink mb-1">
                      Make it yours.
                    </h3>
                    <p className="font-sans text-[14px] text-secondary leading-relaxed">
                      Choose your design, colour, finish and coverage, or ask WNK for a custom wrap.
                    </p>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-ink text-white font-mono text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                    03
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-[16px] text-ink mb-1">
                      Review and order.
                    </h3>
                    <p className="font-sans text-[14px] text-secondary leading-relaxed">
                      Confirm your vehicle details and delivery information. WNK then prepares and dispatches your kit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: FAQs Accordion */}
            <div className="lg:col-span-7">
              <div className="divide-y divide-line border-t border-b border-line">
                {FAQS_LIST.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="py-5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className="font-sans font-medium text-[16px] sm:text-[17px] text-ink group-hover:text-muted transition-colors pr-4">
                          {faq.question}
                        </span>
                        <span className="font-mono text-[20px] text-ink shrink-0 select-none">
                          {isOpen ? '—' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-[14px] sm:text-[15px] font-sans text-secondary leading-relaxed pr-6">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT WNK Banner */}
      <section className="py-14 lg:py-20 border-b border-line bg-surface">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
            ABOUT WNK
          </span>
          <h2 className="font-sans font-medium text-[32px] sm:text-[44px] lg:text-[52px] leading-tight text-ink mb-4">
            Made for your vehicle.<br />
            Made to feel like you<span className="text-red">.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-secondary max-w-2xl leading-relaxed">
            WNK Automotive designs wraps for cars and bikes. Choose a ready made design or work with us on a custom wrap for your vehicle.
          </p>
        </div>
      </section>

      {/* 4. Reach the studio & Interactive Support Form */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Reach the studio */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
                  HELP & CONTACT
                </span>
                <h2 className="font-sans font-medium text-[28px] sm:text-[34px] text-ink">
                  Reach the studio<span className="text-red">.</span>
                </h2>
              </div>

              <div className="space-y-6 font-mono text-[13px]">
                <div>
                  <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">
                    EMAIL
                  </span>
                  <a
                    href="mailto:wnkautomotive01@gmail.com"
                    className="text-ink hover:underline font-sans text-[15px]"
                  >
                    wnkautomotive01@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">
                    STUDIO
                  </span>
                  <p className="text-ink font-sans text-[15px] leading-relaxed">
                    Uttam Nagar, Bavdhan<br />
                    Pune, 411021<br />
                    Maharashtra, India
                  </p>
                </div>

                <div>
                  <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">
                    INSTAGRAM
                  </span>
                  <a
                    href="https://instagram.com/wnkautomotive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:underline font-sans text-[15px]"
                  >
                    @wnkautomotive
                  </a>
                </div>

                <div>
                  <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">
                    DIRECT WHATSAPP
                  </span>
                  <a
                    href="https://wa.me/919284247387"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#128C7E] font-medium hover:underline font-sans text-[15px] flex items-center gap-1.5"
                  >
                    <span>+91 92842 47387</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: How can we help? Support Form */}
            <div className="lg:col-span-7 bg-white border border-line p-6 sm:p-10">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
                HELP & CONTACT
              </span>
              <h2 className="font-sans font-medium text-[26px] sm:text-[32px] text-ink mb-6">
                How can we help?
              </h2>

              <form onSubmit={handlePreviewSubmit} className="space-y-5">
                {/* Your Name */}
                <div>
                  <label className="block font-sans text-[13px] text-ink mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Parmanand Shinde"
                    className="w-full h-[46px] px-3.5 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-[13px] text-ink mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. you@example.com"
                    className="w-full h-[46px] px-3.5 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors"
                  />
                </div>

                {/* Order reference (optional) */}
                <div>
                  <label className="block font-sans text-[13px] text-ink mb-1.5">
                    Order reference <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="orderRef"
                    value={formData.orderRef}
                    onChange={handleInputChange}
                    placeholder="e.g. WNK-2026-XXXX"
                    className="w-full h-[46px] px-3.5 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors"
                  />
                </div>

                {/* Your question */}
                <div>
                  <label className="block font-sans text-[13px] text-ink mb-1.5">
                    Your question
                  </label>
                  <textarea
                    name="question"
                    required
                    rows={4}
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="Tell us about your vehicle model, finish questions, or timeline..."
                    className="w-full p-3.5 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors resize-y"
                  />
                </div>

                {/* Request a callback checkbox */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="requestCallback"
                      checked={formData.requestCallback}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded-none border border-field text-ink focus:ring-0 cursor-pointer"
                    />
                    <span className="font-sans text-[14px] text-ink">
                      Request a callback
                    </span>
                  </label>

                  {formData.requestCallback && (
                    <div>
                      <label className="block font-sans text-[13px] text-ink mb-1.5">
                        Phone <span className="text-muted">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full h-[46px] px-3.5 bg-white border border-field focus:border-ink rounded-none font-sans text-[14px] text-ink outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Disclaimer checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeDemo"
                      checked={formData.agreeDemo}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded-none border border-field text-ink focus:ring-0 cursor-pointer mt-0.5"
                    />
                    <span className="font-sans text-[13px] text-secondary">
                      I understand this connects with WNK Automotive studio via direct WhatsApp inquiry.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="h-[50px] px-8 bg-ink text-white font-sans text-[14px] font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Preview support request</span>
                    <span className="font-mono">→</span>
                  </button>
                  <p className="font-mono text-[11px] text-muted mt-2">
                    Direct studio response within 4 business hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Request Preview Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 border border-line shadow-2xl relative">
            <button
              onClick={() => setPreviewModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-ink font-mono text-lg"
            >
              ✕
            </button>

            <span className="font-mono text-[11px] uppercase tracking-wider text-muted block mb-1">
              SUPPORT REQUEST PREVIEW
            </span>
            <h3 className="font-sans font-medium text-[22px] text-ink mb-4">
              Review your inquiry
            </h3>

            <div className="space-y-3 bg-surface p-4 border border-line text-[13px] mb-6 font-mono">
              <div>
                <strong className="text-muted block text-[11px]">NAME:</strong>
                <span className="text-ink">{formData.name}</span>
              </div>
              <div>
                <strong className="text-muted block text-[11px]">EMAIL:</strong>
                <span className="text-ink">{formData.email}</span>
              </div>
              {formData.orderRef && (
                <div>
                  <strong className="text-muted block text-[11px]">ORDER REF:</strong>
                  <span className="text-ink">{formData.orderRef}</span>
                </div>
              )}
              {formData.requestCallback && (
                <div>
                  <strong className="text-muted block text-[11px]">CALLBACK PHONE:</strong>
                  <span className="text-ink">{formData.phone || 'Requested'}</span>
                </div>
              )}
              <div>
                <strong className="text-muted block text-[11px]">QUESTION:</strong>
                <p className="font-sans text-[14px] text-ink whitespace-pre-line mt-1">
                  {formData.question}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="w-full sm:w-auto h-[44px] px-5 border border-line text-ink font-mono text-[13px] hover:border-ink"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full sm:w-auto h-[44px] px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-[13px] flex items-center justify-center gap-2"
              >
                <span>Send to Studio WhatsApp</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
