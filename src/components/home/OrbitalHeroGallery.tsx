import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface OrbitalHeroCard {
  id: string;
  image: string;
  title: string;
  vehicle: string;
  slug: string;
  badge?: string;
}

export const HERO_ORBITAL_CARDS: OrbitalHeroCard[] = [
  {
    id: 'hero-card-1',
    image: '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
    title: 'Nightshade Edition',
    vehicle: 'Kawasaki Ninja 300',
    slug: 'nightshade-violet',
    badge: 'Center Livery',
  },
  {
    id: 'hero-card-2',
    image: '/assets/images/hero/web/corsa-frost-edition-aprilia-rs457.webp',
    title: 'Corsa Frost Edition',
    vehicle: 'Aprilia RS 457',
    slug: 'corsa-frost-aprilia-rs457',
    badge: 'Aprilia Racing',
  },
  {
    id: 'hero-card-3',
    image: '/assets/images/hero/web/hornet-edition-f-450gs.webp',
    title: 'Hornet Edition',
    vehicle: 'BMW F 450GS',
    slug: 'hornet-edition-bmw-f450gs',
    badge: 'Adventure Enduro',
  },
  {
    id: 'hero-card-4',
    image: '/assets/images/hero/web/lighning-mcqueen-edition-aprilia-rs457.webp',
    title: 'Lightning McQueen 95',
    vehicle: 'Aprilia RS 457',
    slug: 'lightning-mcqueen-edition-aprilia-rs457',
    badge: 'Piston Cup Livery',
  },
  {
    id: 'hero-card-5',
    image: '/assets/images/hero/web/gs-dynamic-edition-f-450gs.webp',
    title: 'GS Dynamic Edition',
    vehicle: 'BMW F 450GS',
    slug: 'hornet-edition-bmw-f450gs',
    badge: 'Dual Sport',
  },
  {
    id: 'hero-card-6',
    image: '/assets/images/hero/web/swoosh-collection.webp',
    title: 'Swoosh Monochrome',
    vehicle: 'Volkswagen Virtus',
    slug: 'swoosh-monochrome',
    badge: 'Precision Sedan',
  },
  {
    id: 'hero-card-7',
    image: '/assets/images/hero/web/top-gun-edition-f-450gs.webp',
    title: 'Top Gun Edition',
    vehicle: 'BMW F 450GS',
    slug: 'hornet-edition-bmw-f450gs',
    badge: 'Aero Fighter',
  },
  {
    id: 'hero-card-8',
    image: '/assets/images/hero/web/hilux-martini-collection.webp',
    title: 'Martini Racing',
    vehicle: 'Toyota Hilux',
    slug: 'martini-racing-toyota-hilux',
    badge: 'Heritage 4x4',
  },
  {
    id: 'hero-card-9',
    image: '/assets/images/hero/web/glacier-ridge-edition.webp',
    title: 'Glacier Ridge Edition',
    vehicle: 'BMW R 1250GS',
    slug: 'glacier-ridge-bmw-r1250gs',
    badge: 'Alpine Expedition',
  },
];

export const OrbitalHeroGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Orbital state
  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0.07); // Base continuous drift speed (deg/frame)
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isTargetingRef = useRef<boolean>(false);
  const targetRotationRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ cardW: number; cardH: number; radius: number }>({
    cardW: 300,
    cardH: 320,
    radius: 460,
  });

  const TOTAL_CARDS = HERO_ORBITAL_CARDS.length;
  const STEP_ANGLE = 360 / TOTAL_CARDS; // 40 degrees

  // Calculate responsive radius and card sizes
  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) {
      // Mobile
      const cardW = Math.min(220, Math.round(w * 0.58));
      const cardH = Math.round(cardW * 1.08);
      const radius = Math.round(cardW / (2 * Math.sin((Math.PI / TOTAL_CARDS))));
      setDimensions({ cardW, cardH, radius: Math.min(radius, 320) });
    } else if (w < 1024) {
      // Tablet
      const cardW = 260;
      const cardH = 280;
      const radius = Math.round(cardW / (2 * Math.sin((Math.PI / TOTAL_CARDS))));
      setDimensions({ cardW, cardH, radius: Math.min(radius, 400) });
    } else {
      // Desktop
      const cardW = 320;
      const cardH = 340;
      const radius = Math.round(cardW / (2 * Math.sin((Math.PI / TOTAL_CARDS))));
      setDimensions({ cardW, cardH, radius: Math.min(radius, 480) });
    }
  }, [TOTAL_CARDS]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Main 3D orbital animation loop
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPaused(true);
      return;
    }

    const stageEl = containerRef.current?.querySelector<HTMLDivElement>('.orbital-stage');

    const animate = () => {
      if (!isDraggingRef.current) {
        if (isTargetingRef.current) {
          // Spring smoothly to target card angle
          const diff = targetRotationRef.current - rotationRef.current;
          rotationRef.current += diff * 0.08;
          if (Math.abs(diff) < 0.1) {
            rotationRef.current = targetRotationRef.current;
            isTargetingRef.current = false;
          }
        } else if (!isHoveredRef.current && !isPaused) {
          // Natural orbital rotation
          rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
        } else if (Math.abs(velocityRef.current) > 0.01) {
          // Inertia damping after drag release
          rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
          velocityRef.current *= 0.94;
        }
      }

      // Compute which card is closest to the front (angle ~ 0)
      // Card angle in world coords = (i * STEP_ANGLE + rotationRef.current) % 360
      const currentRot = rotationRef.current;
      let minAngleDist = 999;
      let centerIdx = 0;

      for (let i = 0; i < TOTAL_CARDS; i++) {
        let cardAngle = ((i * STEP_ANGLE + currentRot) % 360 + 360) % 360;
        if (cardAngle > 180) cardAngle -= 360; // range [-180, 180]
        const dist = Math.abs(cardAngle);
        if (dist < minAngleDist) {
          minAngleDist = dist;
          centerIdx = i;
        }
      }

      setActiveCardIndex((prev) => (prev !== centerIdx ? centerIdx : prev));

      // Apply transform directly to 3D cylinder stage for maximum 60fps performance
      if (stageEl) {
        stageEl.style.transform = `rotateY(${-rotationRef.current}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [TOTAL_CARDS, STEP_ANGLE, isPaused]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    isTargetingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = rotationRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Map pixels to rotation degrees (drag left -> rotate right)
    const sensitivity = 0.28;
    rotationRef.current = dragStartRotRef.current - deltaX * sensitivity;

    // Track instant velocity for flick
    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    const dx = e.clientX - lastDragXRef.current;
    velocityRef.current = -(dx / dt) * 1.5;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Cap inertia
    if (Math.abs(velocityRef.current) > 2.5) {
      velocityRef.current = Math.sign(velocityRef.current) * 2.5;
    } else if (Math.abs(velocityRef.current) < 0.05) {
      velocityRef.current = 0.07; // restore gentle orbit
    }
  };

  // Rotate specifically to bring card index i to front
  const rotateToCard = (index: number) => {
    // Current stage rotation is -rotationRef.current
    // We want (index * STEP_ANGLE + rotationRef.current) % 360 == 0
    // => targetRotation = -index * STEP_ANGLE
    const currentRot = rotationRef.current;
    const targetBase = -index * STEP_ANGLE;
    // Find closest equivalent angle
    let delta = ((targetBase - currentRot) % 360 + 540) % 360 - 180;
    targetRotationRef.current = currentRot + delta;
    isTargetingRef.current = true;
  };

  const handlePrev = () => {
    const nextIdx = (activeCardIndex - 1 + TOTAL_CARDS) % TOTAL_CARDS;
    rotateToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeCardIndex + 1) % TOTAL_CARDS;
    rotateToCard(nextIdx);
  };

  const activeCard = HERO_ORBITAL_CARDS[activeCardIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none py-4 sm:py-8"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 3D Perspective Viewport */}
      <div
        className="relative mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
          height: `${dimensions.cardH + 80}px`,
          maxWidth: '1440px',
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(240, 242, 246, 0.45) 50%, transparent 80%)',
          }}
        />

        {/* Floor 3D Orbital Geometry Rings */}
        <div
          className="absolute pointer-events-none opacity-30 flex items-center justify-center"
          style={{
            width: `${dimensions.radius * 2.2}px`,
            height: `${dimensions.radius * 2.2}px`,
            transform: 'rotateX(76deg) translateZ(-80px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-[#a0a5ad]" />
          <div className="absolute inset-[15%] rounded-full border border-[#cbd5e1]" />
          <div className="absolute inset-[32%] rounded-full border border-dotted border-[#94a3b8]" />
        </div>

        {/* 3D Cylindrical Orbital Carousel Stage */}
        <div
          className="orbital-stage relative w-0 h-0"
          style={{
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : undefined,
          }}
        >
          {HERO_ORBITAL_CARDS.map((card, index) => {
            const cardAngle = index * STEP_ANGLE;
            const isCenter = index === activeCardIndex;

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCenter) {
                    rotateToCard(index);
                  } else {
                    navigate('/shop');
                  }
                }}
                className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[#f0f2f5] border border-black/5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] transition-all duration-300 flex flex-col items-center justify-center p-3 cursor-pointer group ${
                  isCenter
                    ? 'ring-2 ring-black/20 shadow-[0_24px_55px_-12px_rgba(0,0,0,0.28)]'
                    : 'hover:brightness-105'
                }`}
                style={{
                  width: `${dimensions.cardW}px`,
                  height: `${dimensions.cardH}px`,
                  transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                  WebkitBackfaceVisibility: 'visible',
                }}
              >
                {/* Vehicle Image Container */}
                <div className="relative w-full h-full rounded-[14px] bg-[#e6e8ec] overflow-hidden flex items-center justify-center p-2">
                  {/* Subtle Inner Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-black/5 pointer-events-none" />

                  {/* Card Vehicle Image */}
                  <img
                    src={card.image}
                    alt={`${card.title} - ${card.vehicle}`}
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_14px_rgba(0,0,0,0.22)] transform group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    loading="eager"
                  />

                  {/* Subtle Top-Left Category Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 font-mono text-[9px] uppercase tracking-wider text-muted font-medium">
                    {card.badge || 'Studio Livery'}
                  </div>

                  {/* Bottom Active Information Pill */}
                  <div
                    className={`absolute bottom-2 inset-x-2 rounded-lg bg-black/85 backdrop-blur-md px-3 py-2 text-white flex items-center justify-between transition-opacity duration-300 ${
                      isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans font-medium text-[11px] leading-tight truncate">
                        {card.title}
                      </p>
                      <p className="font-mono text-[9px] text-[#a0a5ad] uppercase truncate">
                        {card.vehicle}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-white/80 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Spotlight Live Status & Direct Quick Action */}
      <div className="relative max-w-md mx-auto mt-2 px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e61919] animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-secondary">
            Orbital Spotlight: <strong className="text-ink font-sans font-medium">{activeCard.title}</strong> ({activeCard.vehicle})
          </span>
        </div>

        {/* Carousel Navigation & Control Strip */}
        <div className="flex items-center gap-4 mt-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous vehicle"
            className="w-8 h-8 rounded-full border border-black/15 bg-white/80 hover:bg-white flex items-center justify-center text-ink transition-colors shadow-sm"
          >
            <span className="font-mono text-sm">←</span>
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {HERO_ORBITAL_CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => rotateToCard(i)}
                aria-label={`Jump to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeCardIndex
                    ? 'w-5 h-1.5 bg-ink'
                    : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next vehicle"
            className="w-8 h-8 rounded-full border border-black/15 bg-white/80 hover:bg-white flex items-center justify-center text-ink transition-colors shadow-sm"
          >
            <span className="font-mono text-sm">→</span>
          </button>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? 'Resume auto orbit' : 'Pause auto orbit'}
            className="w-8 h-8 rounded-full border border-black/15 bg-white/80 hover:bg-white flex items-center justify-center text-secondary hover:text-ink text-[11px] font-mono transition-colors shadow-sm"
            title={isPaused ? 'Resume auto orbit' : 'Pause orbit'}
          >
            {isPaused ? '▶' : '❚❚'}
          </button>
        </div>
      </div>
    </div>
  );
};

