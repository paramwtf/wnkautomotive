import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'PRECISION SCANNING',
      desc: 'Every kit begins with millimeter-accurate 3D laser scans of factory body panels. Seams, curves, vents, and badges are matched so the graphic flows naturally across bodywork.',
    },
    {
      num: '02',
      title: 'MULTI-CAST VINYL',
      desc: 'We strictly print on automotive multi-cast vinyl films with microscopic air-release channels. This guarantees bubble-free application, extreme stretch recovery, and zero peel.',
    },
    {
      num: '03',
      title: 'UV CAST OVERLAMINATES',
      desc: 'India’s harsh ultraviolet radiation degrades cheap vinyl within months. Our proprietary cast overlaminates shield pigments against UV bleaching, chemical washes, and rock chips for 3-5 years.',
    },
    {
      num: '04',
      title: 'OEM PAINT PRESERVATION',
      desc: 'Clean-release acrylic adhesive systems bond tenaciously to clear coats while removing cleanly when desired, leaving factory OEM paint pristine without residue.',
    },
  ];

  const milestones = [
    { year: '2022', title: 'Pune Studio Founded', desc: 'Started with custom motorcycle livery prototyping and track bike graphics.' },
    { year: '2023', title: 'Car Pre-cut Kit Expansion', desc: 'Developed modular side graphics and hood accents for modern performance sedans and SUVs.' },
    { year: '2024', title: 'Digital Fleet & Bespoke Studio', desc: 'Over 500+ bespoke and pre-cut vehicles delivered across India with precision fitment.' },
    { year: '2026', title: 'Direct-to-Customer Storefront', desc: 'Streamlined nationwide online catalogue with vehicle-specific filtering and studio WhatsApp ordering.' },
  ];

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-line py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
              WNK AUTOMOTIVE STUDIO / ABOUT
            </span>
            <span className="text-muted text-[11px]">•</span>
            <span className="font-mono text-[11px] text-ink uppercase">ENGINEERED IDENTITY</span>
          </div>

          <h1 className="font-sans font-medium text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.05] text-ink tracking-tight max-w-4xl">
            Automotive aesthetics engineered with precision<span className="text-red">.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 pt-8 border-t border-line">
            <div className="md:col-span-4">
              <span className="font-mono text-[12px] uppercase text-muted tracking-wide">
                THE MANIFESTO
              </span>
            </div>
            <div className="md:col-span-8 space-y-5 text-secondary font-sans text-[16px] sm:text-[18px] leading-relaxed">
              <p>
                WNK Automotive was founded on a simple conviction: automotive graphics shouldn't be generic stickers or poorly adapted templates. They should be engineered with the same precision and aerodynamic respect as the machines they dress.
              </p>
              <p>
                Operating out of our dedicated studio in Pune, India, we bridge the gap between European motorsport livery design and daily-driven street resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Image Banner */}
      <section className="w-full border-b border-line bg-surface">
        <div className="max-w-[1440px] mx-auto">
          <div className="aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden relative">
            <img
              src="/assets/images/virtus-swoosh.png"
              alt="WNK Automotive Studio Livery"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-paper/90 backdrop-blur-sm px-4 py-2 border border-line">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink">
                STUDIO PRODUCTION / BAVDHAN, PUNE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Principles */}
      <section className="py-16 lg:py-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
                FOUR PILLARS
              </span>
              <h2 className="font-sans font-medium text-[32px] sm:text-[42px] text-ink tracking-tight">
                Craftsmanship & Material Science<span className="text-red">.</span>
              </h2>
            </div>
            <p className="font-sans text-[14px] text-secondary max-w-md">
              We never cut corners on raw vinyl stock. Every batch is verified for thermal stability and shear strength.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div key={p.num} className="border border-line p-6 sm:p-8 flex flex-col justify-between bg-paper hover:border-ink transition-colors">
                <div>
                  <div className="font-mono text-[13px] text-muted mb-6">{p.num}</div>
                  <h3 className="font-sans font-medium text-[18px] text-ink mb-3">{p.title}</h3>
                  <p className="font-sans text-[14px] text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Timeline */}
      <section className="py-16 lg:py-24 border-b border-line bg-surface">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
              OUR JOURNEY
            </span>
            <h2 className="font-sans font-medium text-[32px] sm:text-[42px] text-ink tracking-tight">
              Evolution of the Studio<span className="text-red">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="bg-paper border border-line p-6">
                <div className="font-mono text-[24px] font-medium text-ink mb-2">{m.year}</div>
                <h4 className="font-sans font-medium text-[16px] text-ink mb-2">{m.title}</h4>
                <p className="font-sans text-[13px] text-secondary leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] text-center flex flex-col items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted mb-3">
            START YOUR BUILD
          </span>
          <h2 className="font-sans font-medium text-[36px] sm:text-[48px] text-ink tracking-tight max-w-2xl mb-6">
            Transform your vehicle with studio-engineered livery<span className="text-red">.</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Explore Wrap Catalogue →
              </Button>
            </Link>
            <Link to="/custom-wrap">
              <Button variant="secondary" size="lg">
                Commission Custom Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

