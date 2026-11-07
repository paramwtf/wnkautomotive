import React, { useState, useRef } from 'react';

export const CustomWrapPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [description, setDescription] = useState('');
  const [requestCallback, setRequestCallback] = useState(false);
  const [phone, setPhone] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const added = Array.from(e.target.files).slice(0, 3);
      setFiles(added);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !vehicle.trim() || !description.trim()) {
      setErrorMsg('Please fill in your name, email, vehicle details, and creative direction.');
      return;
    }

    // Build WhatsApp Message for WNK Automotive
    const textLines = [
      `*CUSTOM WRAP INQUIRY — WNK AUTOMOTIVE*`,
      `---------------------------------------`,
      `*Name:* ${fullName}`,
      `*Email:* ${email}`,
      `*Vehicle:* ${vehicle}`,
      phone ? `*Phone / Callback:* ${phone}` : `*Callback:* ${requestCallback ? 'Requested' : 'Not requested'}`,
      `---------------------------------------`,
      `*Creative Direction:*`,
      `${description}`,
      `---------------------------------------`,
      files.length > 0
        ? `*Attachments:* ${files.map((f) => f.name).join(', ')}`
        : `*Attachments:* Will share reference images on WhatsApp`,
      `_Sent from wnkautomotive.com custom studio_`,
    ];

    const message = textLines.join('\n');
    const waUrl = `https://wa.me/919284247387?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-paper min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] pt-12 sm:pt-16 pb-20">
        {/* Header Breadcrumb & Title (media_1794050278982_79c6a228.jpg) */}
        <div className="mb-10 sm:mb-14">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted block mb-3">
            CUSTOM WRAP / YOUR IDEA. OUR DESIGN.
          </span>
          <h1 className="font-sans font-medium text-[44px] sm:text-[62px] lg:text-[76px] leading-[1.04] tracking-[-2px] text-ink mb-4">
            Something entirely yours<span className="text-[#e61919]">.</span>
          </h1>
          <p className="font-sans text-[16px] sm:text-[18px] text-secondary leading-relaxed max-w-3xl">
            Share your vehicle details, ideas or existing artwork. We'll discuss the design and quote with you.
          </p>
        </div>

        {/* 2-Column Split: Visual & Story on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Aprilia RS 457 Lightning McQueen + Process Story */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Aprilia RS 457 Lightning McQueen Edition Artwork */}
            <div className="w-full aspect-[16/10] sm:aspect-[4/3] bg-[#f4f4f2] border border-line overflow-hidden relative shadow-sm">
              <img
                src="/assets/images/rs457/web/rs457-lightning-mcqueen-01.webp"
                alt="Aprilia RS 457 Lightning McQueen Edition Custom Wrap"
                className="w-full h-full object-cover object-center filter drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Story & Process (media_1794050287638_938bc0bc.png) */}
            <div className="pt-10">
              <h2 className="font-sans font-medium text-[28px] sm:text-[34px] text-ink leading-tight mb-3">
                From a thought to a new identity<span className="text-[#e61919]">.</span>
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-secondary leading-relaxed mb-8">
                Abstract graphics, themed artwork or your own idea, designed to fit your vehicle.
              </p>

              {/* Steps List */}
              <div className="space-y-4 mb-8 font-sans text-[14px] sm:text-[15px] text-ink">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] text-muted">01 /</span>
                  <span>Share your vehicle and references.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] text-muted">02 /</span>
                  <span>Discuss the direction and quote.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] text-muted">03 /</span>
                  <span>Approve your design before production.</span>
                </div>
              </div>

              {/* Bottom Note */}
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted block pt-4 border-t border-line">
                DESIGN CONCEPT SHOWN / FINAL FITMENT CONFIRMED WITH WNK
              </span>
            </div>
          </div>

          {/* Right Column: Custom Intake Form (media_1794050278982_79c6a228.jpg) */}
          <div className="lg:col-span-6 bg-white border border-[#cecece] p-6 sm:p-10 shadow-xs">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
              START A CONVERSATION
            </span>
            <h2 className="font-sans font-medium text-[28px] sm:text-[34px] text-ink leading-tight mb-8">
              Tell us your idea<span className="text-[#e61919]">.</span>
            </h2>

            {submitted ? (
              <div className="bg-[#f4f4f2] border border-line p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-ink text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-sans font-medium text-[20px] text-ink">
                  Inquiry Prepared & Forwarded!
                </h3>
                <p className="font-sans text-[14px] text-secondary leading-relaxed">
                  Your project details have been organized. Sahil and the WNK Automotive design team will connect with you directly on WhatsApp / phone.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href="https://wa.me/919284247387"
                    target="_blank"
                    rel="noreferrer"
                    className="h-[48px] px-6 bg-[#010101] text-white font-sans text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-charcoal transition-colors"
                  >
                    <span>Open WhatsApp Chat Directly</span>
                    <span className="font-mono">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-[13px] font-sans text-muted hover:text-ink underline mt-2"
                  >
                    Submit another custom commission
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 bg-red/10 border border-red/20 text-red text-[13px] font-sans">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Name */}
                <div>
                  <label className="font-sans text-[14px] text-secondary block mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full h-[48px] px-4 bg-white border border-[#cecece] focus:border-ink font-sans text-[14px] text-ink outline-none transition-colors"
                  />
                </div>

                {/* 2. Email */}
                <div>
                  <label className="font-sans text-[14px] text-secondary block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-[48px] px-4 bg-white border border-[#cecece] focus:border-ink font-sans text-[14px] text-ink outline-none transition-colors"
                  />
                </div>

                {/* 3. Vehicle */}
                <div>
                  <label className="font-sans text-[14px] text-secondary block mb-1.5">
                    Vehicle make, model, year & variant
                  </label>
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="e.g. Aprilia RS 457 (2024) / Thar 4x4"
                    required
                    className="w-full h-[48px] px-4 bg-white border border-[#cecece] focus:border-ink font-sans text-[14px] text-ink outline-none transition-colors"
                  />
                </div>

                {/* 4. Creative Direction */}
                <div>
                  <label className="font-sans text-[14px] text-secondary block mb-1.5">
                    Your creative direction
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your vision, colors, racing livery influences, or specific theme..."
                    required
                    className="w-full p-4 bg-white border border-[#cecece] focus:border-ink font-sans text-[14px] text-ink outline-none transition-colors resize-y"
                  />
                </div>

                {/* 5. Request Callback Checkbox & Phone */}
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={requestCallback}
                      onChange={(e) => setRequestCallback(e.target.checked)}
                      className="w-4 h-4 rounded-none accent-ink border border-[#cecece]"
                    />
                    <span className="font-sans text-[14px] text-ink">
                      Request a callback
                    </span>
                  </label>

                  <div className="mt-3">
                    <label className="font-sans text-[13px] text-muted block mb-1.5">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-[48px] px-4 bg-white border border-[#cecece] focus:border-ink font-sans text-[14px] text-ink outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 6. Attach Files Box (media_1794050287638_938bc0bc.png) */}
                <div className="border border-[#cecece] p-6 bg-[#fafafa]">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-ink mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-sans font-medium text-[15px] text-ink mb-1">
                        Attach your artwork or references
                      </h4>
                      <p className="font-mono text-[11px] text-muted mb-4">
                        JPG, PNG, WebP or PDF · Up to 3 files · 10 MB total
                      </p>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/*,.pdf"
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-[38px] px-5 bg-[#010101] text-white font-sans text-[13px] font-medium hover:bg-charcoal transition-colors cursor-pointer"
                      >
                        Choose files
                      </button>

                      {files.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {files.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-[12px] font-mono text-ink bg-white px-3 py-1.5 border border-line"
                            >
                              <span className="truncate max-w-[220px]">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="text-muted hover:text-red ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 7. Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#010101] text-white font-sans text-[14px] font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <span>Submit Custom Wrap Request</span>
                  <span className="font-mono">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
