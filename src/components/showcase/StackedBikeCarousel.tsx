import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

export interface ShowcaseBikeItem {
  id: string;
  title: string;
  subtitle: string;
  vehicle: string;
  make: string;
  model: string;
  priceInr: number;
  finish: string;
  coverage: string;
  image: string;
  secondaryImage?: string;
  slug: string;
  storyText: string;
  specs: { label: string; value: string }[];
}

export const SHOWCASE_BIKES: ShowcaseBikeItem[] = [
  {
    id: 'bike-rs457-mayhem',
    title: 'Mayhem Edition',
    subtitle: 'Cyberpunk street chaos on factory Aprilia fairings',
    vehicle: 'Aprilia RS 457 (2024)',
    make: 'Aprilia',
    model: 'RS 457',
    priceInr: 7000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/rs457/web/rs457-mayhem-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-mayhem-02.webp',
    slug: 'mayhem-edition-aprilia-rs457',
    storyText:
      'Bold cyan and magenta graphics bring controlled chaos to the Aprilia RS 457’s sharp bodywork. High-voltage street graphics contrast against dark satin bodywork, laser-aligned with Aprilia’s twin-spar frame tension points.',
    specs: [
      { label: 'Vehicle Model', value: 'Aprilia RS 457 (2024)' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'Cast Vinyl with Air-Release' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-rs457-venom',
    title: 'Venom Edition',
    subtitle: 'Aggressive alien symbiote contours tailored for the RS 457',
    vehicle: 'Aprilia RS 457 (2024)',
    make: 'Aprilia',
    model: 'RS 457',
    priceInr: 7000,
    finish: 'Gloss / Matte',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/rs457/web/rs457-venom-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-venom-02.webp',
    slug: 'venom-edition-aprilia-rs457',
    storyText:
      'Unleash a darker side with an aggressive, predatory look tailored to the RS 457’s lines. Razor-sharp symbiote tooth contours flow across the lower fairing with jagged crimson tendrils wrapping the muscular fuel tank.',
    specs: [
      { label: 'Vehicle Model', value: 'Aprilia RS 457 (2024)' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'High-Gloss Dual-Cast' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-rs457-marlboro',
    title: 'Marlboro Edition',
    subtitle: 'Timeless Grand Prix chevron racing heritage',
    vehicle: 'Aprilia RS 457 (2024)',
    make: 'Aprilia',
    model: 'RS 457',
    priceInr: 7000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/rs457/web/rs457-marlboro-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-marlboro-02.webp',
    slug: 'marlboro-edition-aprilia-rs457',
    storyText:
      'A legendary racing livery reimagined for the RS 457, channeling pure track nostalgia. Classic red and white geometric chevron design paying tribute to iconic Grand Prix championship podium machines.',
    specs: [
      { label: 'Vehicle Model', value: 'Aprilia RS 457 (2024)' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'UV-Protected Motorsport Cast' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-rs457-mcqueen',
    title: 'Lightning McQueen Edition',
    subtitle: 'Pure racing spirit with vibrant red and iconic lightning bolts',
    vehicle: 'Aprilia RS 457 (2024)',
    make: 'Aprilia',
    model: 'RS 457',
    priceInr: 7000,
    finish: 'Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/rs457/web/rs457-lightning-mcqueen-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-lightning-mcqueen-02.webp',
    slug: 'lightning-mcqueen-edition-aprilia-rs457',
    storyText:
      'Pure racing spirit meets playful character with vibrant red and iconic lightning bolts. High-gloss Rust-eze racing red paired with dynamic 95 side-fairing numbers and rear quarter flame graphics.',
    specs: [
      { label: 'Vehicle Model', value: 'Aprilia RS 457 (2024)' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'High-Gloss Racing Cast' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-rs457-miles',
    title: 'Spiderman Miles Edition',
    subtitle: 'Stealth spider-suit aesthetic with dimensional crimson webbing',
    vehicle: 'Aprilia RS 457 (2024)',
    make: 'Aprilia',
    model: 'RS 457',
    priceInr: 7000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/rs457/web/rs457-miles-morales-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-miles-morales-02.webp',
    slug: 'spiderman-miles-edition-aprilia-rs457',
    storyText:
      'Inspired by Miles Morales’ suit, featuring bold red web graphics on deep black panels. Satin deep black fairing panels meet sharp reflective crimson web lines and signature spider emblem.',
    specs: [
      { label: 'Vehicle Model', value: 'Aprilia RS 457 (2024)' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'Satin & Reflective Overlay' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-rs457-monza',
    title: 'Monza Blue Edition',
    subtitle: 'Clean lines and a calm blue-grey palette for a composed look',
    vehicle: 'Aprilia RS 457 (2024)',
    make: 'Aprilia',
    model: 'RS 457',
    priceInr: 7000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/rs457/web/rs457-monza-blue-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-monza-blue-02.webp',
    slug: 'monza-blue-edition-aprilia-rs457',
    storyText:
      'Clean lines and a calm blue-grey palette create a composed, technical look. Italian supersport aesthetic with crisp speed lines and subtle yellow highlight darts.',
    specs: [
      { label: 'Vehicle Model', value: 'Aprilia RS 457 (2024)' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'Dual-Cast Air-Release' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-ktm-punisher',
    title: 'Punisher Edition',
    subtitle: 'Tactical distressed skull livery for all-terrain exploration',
    vehicle: 'KTM 390 Adventure (R: 2026, X: 2025)',
    make: 'KTM',
    model: '390 Adventure',
    priceInr: 6000,
    finish: 'Matte',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/ktm/web/ktm-adv390-punisher-01.webp',
    secondaryImage: '/assets/images/ktm/web/ktm-adv390-punisher-02.webp',
    slug: 'punisher-edition-ktm-390-adventure',
    storyText:
      'Dark, tactical, and uncompromising — designed to match the aggressive stance of the 390 Adventure. High-impact weathered skull graphics with heavy textured laminate that resists trail gravel and scuffing.',
    specs: [
      { label: 'Vehicle Model', value: 'KTM 390 Adventure' },
      { label: 'Wrap Discipline', value: 'Pre-cut Adventure Kit' },
      { label: 'Film Type', value: 'Heavy Duty 110µm Textured Cast' },
      { label: 'Base Wrap Price', value: '₹6,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-ktm-pikepeak',
    title: 'Pike Peak Edition',
    subtitle: 'Hill climb motorsport competition livery for the 390 Adventure',
    vehicle: 'KTM 390 Adventure (R: 2026, X: 2025)',
    make: 'KTM',
    model: '390 Adventure',
    priceInr: 6000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/ktm/web/ktm-adv390-pikepeak-01.png',
    secondaryImage: '/assets/images/ktm/web/ktm-adv390-pikepeak-02.png',
    slug: 'pike-peak-edition-ktm-390-adventure',
    storyText:
      'Race-bred performance aesthetics inspired by the world’s most demanding hill climb. Engineered for the KTM 390 Adventure chassis with aerodynamic speed lines and high-altitude mountain contour motifs.',
    specs: [
      { label: 'Vehicle Model', value: 'KTM 390 Adventure' },
      { label: 'Wrap Discipline', value: 'Pre-cut Adventure Kit' },
      { label: 'Film Type', value: 'UV-Protected Motorsport Cast' },
      { label: 'Base Wrap Price', value: '₹6,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-ktm-meridian',
    title: 'Meridian Edition',
    subtitle: 'Topographic expedition livery for cross-country exploration',
    vehicle: 'KTM 390 Adventure (R: 2026, X: 2025)',
    make: 'KTM',
    model: '390 Adventure',
    priceInr: 6000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/ktm/web/ktm-adv390-meridian-01.png',
    secondaryImage: '/assets/images/ktm/web/ktm-adv390-meridian-02.png',
    slug: 'meridian-edition-ktm-390-adventure',
    storyText:
      'Contour-mapped expedition aesthetics inspired by longitudinal global adventures. High-durability cast vinyl precision-cut for the KTM 390 Adventure bodywork, featuring topographic speed vectors and UV-stable livery graphics.',
    specs: [
      { label: 'Vehicle Model', value: 'KTM 390 Adventure' },
      { label: 'Wrap Discipline', value: 'Pre-cut Adventure Kit' },
      { label: 'Film Type', value: 'High-Durability Cast Vinyl' },
      { label: 'Base Wrap Price', value: '₹6,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-ninja-nightshade',
    title: 'Nightshade Edition',
    subtitle: 'Ultraviolet dark aesthetics for the twin-cylinder supersport',
    vehicle: 'Kawasaki Ninja 300',
    make: 'Kawasaki',
    model: 'Ninja 300',
    priceInr: 7000,
    finish: 'Matte / Gloss',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
    secondaryImage: '/assets/images/vehicle-06-ninja300.jpg',
    slug: 'nightshade-violet',
    storyText:
      'Deep charcoal base with ultraviolet violet accents tailored to the sharp supersport fairings of the Kawasaki Ninja 300. Laser scanned and patterned to fit each panel section with zero stretching.',
    specs: [
      { label: 'Vehicle Model', value: 'Kawasaki Ninja 300' },
      { label: 'Wrap Discipline', value: 'Pre-cut Full Fairing Kit' },
      { label: 'Film Type', value: 'Polymeric Cast with Gloss Laminate' },
      { label: 'Base Wrap Price', value: '₹7,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
  {
    id: 'bike-bmw-hornet',
    title: 'Hornet Edition',
    subtitle: 'Dynamic adventure enduro styling with high-contrast trail aesthetics',
    vehicle: 'BMW F 450GS',
    make: 'BMW',
    model: 'F 450GS',
    priceInr: 6000,
    finish: 'Matte',
    coverage: 'Pre-cut wrap',
    image: '/assets/images/hero/web/hornet-edition-f-450gs.webp',
    secondaryImage: '/assets/images/hero/web/gs-dynamic-edition-f-450gs.webp',
    slug: 'hornet-edition-bmw-f450gs',
    storyText:
      'Enduro competition livery for the BMW F 450GS. High-durability laminate prevents scuffing from riding boots and luggage tie-downs on rough trail excursions across the Western Ghats.',
    specs: [
      { label: 'Vehicle Model', value: 'BMW F 450GS' },
      { label: 'Wrap Discipline', value: 'Pre-cut Adventure Kit' },
      { label: 'Film Type', value: 'Matte Adventure Cast' },
      { label: 'Base Wrap Price', value: '₹6,000' },
      { label: 'Production Time', value: '3 Business Days' },
    ],
  },
];

export const StackedBikeCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const total = SHOWCASE_BIKES.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeBike = SHOWCASE_BIKES[activeIndex];

  // OriginKit Stacked Carousel Depth Calculation
  // Determines style based on relative offset from active index
  const getCardStyle = (index: number) => {
    // Relative index in circular buffer: 0 (front), 1 (behind-1), 2 (behind-2), etc.
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total; // e.g. -1 for previous card

    // Only render front card and up to 3 cards behind / 1 card peeking left
    if (diff < -1 || diff > 3) {
      return { display: 'none' };
    }

    if (diff === 0) {
      // Front active card
      const tx = dragOffset;
      const rot = dragOffset * 0.05;
      return {
        zIndex: 30,
        transform: `translate3d(${tx}px, 0px, 0px) scale(1) rotate(${rot}deg)`,
        opacity: 1,
        transition: isDraggingRef.current ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
      };
    } else if (diff === -1) {
      // Peeking card to the left
      return {
        zIndex: 10,
        transform: `translate3d(-50px, 12px, -60px) scale(0.9) rotate(-4deg)`,
        opacity: 0.45,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
      };
    } else {
      // Stacked cards behind to the right (diff = 1, 2, 3)
      const tx = diff * 32;
      const ty = diff * 8;
      const rot = diff * 2.8;
      const scale = 1 - diff * 0.06;
      const opacity = Math.max(0.2, 0.9 - diff * 0.25);
      const zIndex = 30 - diff * 5;

      return {
        zIndex,
        transform: `translate3d(${tx}px, ${ty}px, -${diff * 40}px) scale(${scale}) rotate(${rot}deg)`,
        opacity,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
      };
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (dragOffset > 70) {
      handlePrev();
    } else if (dragOffset < -70) {
      handleNext();
    }
    setDragOffset(0);
  };

  return (
    <div className="w-full">
      {/* Top Header & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
            STACKED STUDIO SHOWCASE / ACTIVE MOTORCYCLE BUILDS
          </span>
          <h2 className="font-sans font-medium text-[32px] sm:text-[44px] text-ink leading-tight">
            Flagship Bike Liveries<span className="text-red">.</span>
          </h2>
        </div>

        {/* Counter and Controls */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12px] text-muted tracking-widest mr-2">
            <strong className="text-ink font-medium">0{activeIndex + 1}</strong> / 0{total}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Previous bike livery"
            className="w-10 h-10 border border-line bg-white hover:bg-surface text-ink font-mono text-sm flex items-center justify-center transition-colors shadow-sm"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Next bike livery"
            className="w-10 h-10 border border-line bg-white hover:bg-surface text-ink font-mono text-sm flex items-center justify-center transition-colors shadow-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Stacked Deck + Detail Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left: OriginKit Stacked Cards Deck (7 cols) */}
        <div
          className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] cursor-grab active:cursor-grabbing select-none py-6"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'pan-y', perspective: '1200px' }}
        >
          {/* Subtle Stage Base Backdrop */}
          <div className="absolute inset-x-8 bottom-0 h-12 bg-black/10 blur-2xl rounded-full pointer-events-none" />

          {SHOWCASE_BIKES.map((bike, idx) => {
            const style = getCardStyle(idx);
            const isFront = idx === activeIndex;

            return (
              <div
                key={bike.id}
                onClick={() => {
                  if (!isFront) setActiveIndex(idx);
                }}
                className={`absolute w-[85%] sm:w-[80%] max-w-[500px] aspect-[4/3] rounded-2xl bg-[#f0f2f5] border border-black/10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.22)] p-3 overflow-hidden ${
                  isFront ? 'ring-2 ring-black/15 cursor-default' : 'cursor-pointer hover:brightness-105'
                }`}
                style={style}
              >
                {/* Vehicle Canvas */}
                <div className="relative w-full h-full rounded-xl bg-[#e5e8ed] flex items-center justify-center p-4 overflow-hidden">
                  {/* Subtle Inner Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-black/10 pointer-events-none" />

                  {/* Bike Image */}
                  <img
                    src={bike.image}
                    alt={`${bike.title} ${bike.vehicle}`}
                    className="w-full h-full object-contain filter drop-shadow-[0_16px_18px_rgba(0,0,0,0.25)] pointer-events-none"
                    loading="eager"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 font-mono text-[10px] uppercase tracking-wider text-muted font-medium">
                      {bike.make}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-wider">
                      ₹{bike.priceInr.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Bottom Title Bar */}
                  <div className="absolute bottom-3 inset-x-3 rounded-lg bg-black/85 backdrop-blur-md px-3.5 py-2 text-white flex items-center justify-between pointer-events-none">
                    <div className="overflow-hidden">
                      <p className="font-sans font-medium text-[13px] leading-tight truncate">
                        {bike.title}
                      </p>
                      <p className="font-mono text-[10px] text-[#a0a5ad] uppercase truncate">
                        {bike.vehicle}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-[#e61919] font-medium">
                      PRE-CUT
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Bike Spec & Narrative Sheet (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-surface p-6 sm:p-8 border border-line">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e61919]" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                STUDIO PRODUCTION BUILD
              </span>
            </div>
            <h3 className="font-sans font-medium text-[28px] sm:text-[34px] text-ink leading-tight mb-2">
              {activeBike.title}
            </h3>
            <p className="font-sans text-[15px] sm:text-[16px] text-secondary leading-relaxed">
              {activeBike.subtitle}
            </p>
          </div>

          <div className="font-sans text-[14px] text-secondary leading-relaxed border-t border-line pt-4">
            <p>{activeBike.storyText}</p>
          </div>

          {/* Specs Table */}
          <div className="space-y-2 border-t border-line pt-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-2">
              BUILD SPECIFICATIONS
            </span>
            {activeBike.specs.map((spec, i) => (
              <div key={i} className="flex items-center justify-between text-[13px] py-1 border-b border-line/50 last:border-b-0">
                <span className="font-mono text-muted">{spec.label}</span>
                <span className="font-sans font-medium text-ink">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to={`/product/${activeBike.slug}`}
              className="h-[48px] px-6 bg-ink text-white font-mono text-[13px] hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore this wrap</span>
              <span className="font-mono">→</span>
            </Link>
            <a
              href={`https://wa.me/919284247387?text=${encodeURIComponent(
                `Hi WNK Studio, I am interested in the ${activeBike.title} for ${activeBike.vehicle} (₹${activeBike.priceInr}). Please share ordering details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[48px] px-6 bg-white border border-[#25D366] text-[#128C7E] font-mono text-[13px] hover:bg-[#25D366]/5 transition-colors flex items-center justify-center gap-2"
            >
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

