import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface PolicyContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: { heading: string; content: string[] }[];
}

const POLICIES: Record<string, PolicyContent> = {
  shipping: {
    title: 'Shipping & Delivery Policy',
    subtitle: 'Safe, reinforced tube delivery across all pin codes in India.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Nationwide Delivery Coverage',
        content: [
          'WNK Automotive delivers to over 26,000 PIN codes across India.',
        ],
      },
      {
        heading: 'Packaging Standards',
        content: [
          'Automotive vinyl cannot be folded. All WNK kits are wound onto smooth protective liners and packaged inside heavy-duty, reinforced rigid cylindrical mailing tubes with impact-resistant end caps.',
        ],
      },
      {
        heading: 'Production & Dispatch Timelines',
        content: [
          'Production takes 2–3 days, followed by 3 days in transit after dispatch. Custom designs may take additional time.',
        ],
      },
    ],
  },
  returns: {
    title: 'Returns & Replacement Policy',
    subtitle: 'Commitment to dimensional accuracy and uncompromised quality.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Vehicle-Specific Manufacturing',
        content: [
          'Every wrap kit ordered is precision cut on-demand according to your selected vehicle make, model, year, and trim variant. Because of this bespoke manufacturing process, standard change-of-mind returns are not supported.',
        ],
      },
      {
        heading: 'Transit Damage & Defects',
        content: [
          'If your postal tube arrives visibly crushed or damaged in transit, please take photographs of the tube exterior prior to opening.',
          'Inspect the vinyl film immediately upon unrolling. If any creases penetrate the adhesive liner or printing defects are observed, notify us via WhatsApp (+91 92842 47387) within 24 hours of delivery.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Transparent data stewardship for automotive enthusiasts.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Information We Collect',
        content: [
          'We collect information essential to verify vehicle fitment and fulfill deliveries: Customer Name, WhatsApp/Phone Number, Delivery Address, Vehicle Details (Make, Model, Year, Variant), and any reference photos provided.',
          'We do not collect or store credit card or net banking credentials on our servers. All transaction confirmations are handled through official bank UPI and WhatsApp business channels.',
        ],
      },
      {
        heading: 'How Your Information is Used',
        content: [
          'To generate precision cut files tailored to your specific vehicle chassis.',
          'To communicate real-time proofs and order status updates via WhatsApp.',
        ],
      },
      {
        heading: 'Data Security',
        content: [
          'Your data is stored securely and accessible only to authorized WNK production and logistics personnel for fulfilling your order.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Operational terms governing your orders and studio commissions.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Order Placement & Confirmation',
        content: [
          'Submitting an order request via our website storefront initiates a pending order. An order is confirmed once vehicle fitment details are verified by our team on WhatsApp and advance payment is received.',
          'All prices listed are in Indian Rupees (₹ INR) inclusive of applicable taxes.',
        ],
      },
      {
        heading: 'Intellectual Property',
        content: [
          'All livery graphic compositions, styling names, and 3D vehicle template files are the intellectual property of WNK Automotive.',
          'Vehicle manufacturer logos and marks (e.g. BMW, Aprilia, KTM, Volkswagen) displayed on liveries are intended solely for motorsport styling reference and do not imply direct OEM sponsorship.',
        ],
      },
      {
        heading: 'Customer Fitment Responsibility',
        content: [
          'Customers are responsible for providing accurate vehicle model and year information. If aftermarket body kits, spoilers, or custom bumpers have been installed on the vehicle, customer must inform WNK studio prior to printing.',
        ],
      },
      {
        heading: 'AI-Generated Design References',
        content: [
          'AI-generated images submitted for custom wraps are treated as visual references only. The final design may differ in details, proportions, colours and graphic elements. WNK Automotive cannot guarantee a 100% accurate recreation of AI-generated designs.',
        ],
      },
    ],
  },
  'custom-wraps': {
    title: 'Custom Wraps & Livery Commission Policy',
    subtitle: 'Guidelines for one-of-a-kind bespoke livery builds.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: 'Commission Process',
        content: [
          'Bespoke livery commissions require an initial non-refundable design deposit before 3D digital concept mockups are initiated.',
          'Each custom commission includes two (2) complimentary revision rounds to refine colorways, sponsor placement, and livery flow.',
        ],
      },
      {
        heading: 'Customer Approvals',
        content: [
          'Prior to physical printing, a complete 2D/3D flat proof with color swatches is sent to the client for sign-off.',
          'Once written sign-off is provided on WhatsApp or email, no further modifications can be made to the print files.',
        ],
      },
      {
        heading: 'Exclusive Designs',
        content: [
          'Bespoke one-off liveries commissioned with full exclusivity rights will not be reprinted or released to the public catalogue without client consent.',
        ],
      },
    ],
  },
  warranty: {
    title: 'Installation & Material Care Guidelines',
    subtitle: 'Maximizing longevity, color brilliance, and paint protection.',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1-Year Material Warranty',
        content: [
          'WNK warrants our cast vinyl films against premature discoloration, cracking, peeling, or adhesive failure for 12 months under regular outdoor conditions when installed and maintained in accordance with our instructions.',
        ],
      },
      {
        heading: 'Recommended Washing & Maintenance',
        content: [
          'Hand-wash only using pH-balanced car shampoo and soft microfiber cloths.',
          'Do not use automated drive-through brush car washes as rotating nylon bristles can lift fine graphic edges.',
          'When using a pressure washer, maintain at least 45 cm (18 inches) distance from panels and avoid spraying perpendicular to decal borders.',
        ],
      },
      {
        heading: 'Paint Protection & Clean Removal',
        content: [
          'Our films protect factory OEM paint from rock chips and UV exposure. When removing the wrap after 3 to 5 years, apply mild heat from a heat gun or blow dryer to soften the adhesive, peeling back at a 45-degree angle.',
        ],
      },
    ],
  },
};

export const PolicyPage: React.FC = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const activeKey = policyId && POLICIES[policyId] ? policyId : 'shipping';
  const currentPolicy = POLICIES[activeKey];

  const policyNav = [
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'returns', label: 'Returns & Refunds' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
    { id: 'custom-wraps', label: 'Custom Wraps' },
    { id: 'warranty', label: 'Installation & Care' },
  ];

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Header */}
      <section className="border-b border-line py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
              LEGAL & OPERATIONAL STANDARDS
            </span>
            <span className="text-muted text-[11px]">•</span>
            <span className="font-mono text-[11px] text-ink uppercase">WNK AUTOMOTIVE</span>
          </div>
          <h1 className="font-sans font-medium text-[36px] sm:text-[46px] text-ink tracking-tight">
            {currentPolicy.title}<span className="text-red">.</span>
          </h1>
          <p className="font-sans text-[15px] sm:text-[16px] text-secondary mt-3 max-w-2xl">
            {currentPolicy.subtitle}
          </p>
        </div>
      </section>

      {/* Content Area with Navigation Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Policy Navigation (Left 4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 border border-line p-6 bg-surface">
                <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-4">
                  POLICY DIRECTORY
                </span>
                <nav className="flex flex-col gap-1.5">
                  {policyNav.map((item) => {
                    const isActive = item.id === activeKey;
                    return (
                      <Link
                        key={item.id}
                        to={`/policies/${item.id}`}
                        className={`px-3 py-2.5 font-mono text-[12px] uppercase transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-ink text-white font-medium'
                            : 'text-ink hover:bg-surface-2'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px]">{isActive ? '●' : '→'}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-line font-sans text-[13px] text-secondary">
                  <p className="font-medium text-ink mb-1">Questions on terms?</p>
                  <p>Our studio team is available on WhatsApp daily for policy clarifications.</p>
                  <a
                    href="https://wa.me/919284247387"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 font-mono text-[11px] uppercase text-ink underline"
                  >
                    Chat with Studio Desk →
                  </a>
                </div>
              </div>
            </div>

            {/* Main Policy Body (Right 8 cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between pb-6 border-b border-line mb-8">
                <span className="font-mono text-[11px] uppercase text-muted">
                  EFFECTIVE: {currentPolicy.lastUpdated}
                </span>
                <span className="font-mono text-[11px] uppercase text-muted">
                  PUNE / INDIA
                </span>
              </div>

              <div className="space-y-10">
                {currentPolicy.sections.map((sec, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-sans font-medium text-[20px] sm:text-[22px] text-ink">
                      {sec.heading}
                    </h3>
                    <div className="space-y-3 font-sans text-[15px] text-secondary leading-relaxed">
                      {sec.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

