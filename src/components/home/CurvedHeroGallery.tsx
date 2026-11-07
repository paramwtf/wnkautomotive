import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface HeroPoster {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  slug: string;
}

export const HERO_POSTERS: HeroPoster[] = [
  {
    id: 'hero-1',
    image: '/assets/images/hero/web/corsa-frost-edition-aprilia-rs457.webp',
    title: 'Corsa Frost Edition',
    subtitle: 'Aprilia RS 457',
    slug: 'corsa-frost-aprilia-rs457',
  },
  {
    id: 'hero-2',
    image: '/assets/images/hero/web/hornet-edition-f-450gs.webp',
    title: 'Hornet Edition',
    subtitle: 'BMW F 450GS',
    slug: 'hornet-edition-bmw-f450gs',
  },
  {
    id: 'hero-3',
    image: '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
    title: 'Nightshade Edition',
    subtitle: 'Kawasaki Ninja 300',
    slug: 'nightshade-violet',
  },
  {
    id: 'hero-4',
    image: '/assets/images/hero/web/lighning-mcqueen-edition-aprilia-rs457.webp',
    title: 'Lightning McQueen 95',
    subtitle: 'Aprilia RS 457',
    slug: 'lightning-mcqueen-aprilia-rs457',
  },
  {
    id: 'hero-5',
    image: '/assets/images/hero/web/swoosh-collection.webp',
    title: 'Swoosh Collection 001',
    subtitle: 'Volkswagen Virtus',
    slug: 'swoosh-monochrome',
  },
  {
    id: 'hero-6',
    image: '/assets/images/hero-posters/poster-08-center.png',
    title: 'Swoosh Monochrome 004',
    subtitle: 'Volkswagen Virtus',
    slug: 'swoosh-monochrome',
  },
  {
    id: 'hero-7',
    image: '/assets/images/hero/web/top-gun-edition-f-450gs.webp',
    title: 'Top Gun Edition',
    subtitle: 'BMW F 450GS',
    slug: 'hornet-edition-bmw-f450gs',
  },
  {
    id: 'hero-8',
    image: '/assets/images/hero/web/gs-dynamic-edition-f-450gs.webp',
    title: 'GS Dynamic Edition',
    subtitle: 'BMW F 450GS',
    slug: 'hornet-edition-bmw-f450gs',
  },
  {
    id: 'hero-9',
    image: '/assets/images/hero/web/glacier-ridge-edition.webp',
    title: 'Glacier Ridge Edition',
    subtitle: 'BMW R 1250GS',
    slug: 'glacier-ridge-bmw-r1250gs',
  },
  {
    id: 'hero-10',
    image: '/assets/images/hero/web/hilux-martini-collection.webp',
    title: 'Martini Racing Collection',
    subtitle: 'Toyota Hilux',
    slug: 'martini-racing-toyota-hilux',
  },
  {
    id: 'hero-11',
    image: '/assets/images/hero-posters/poster-09.png',
    title: 'Swoosh Lime Glow',
    subtitle: 'Volkswagen Virtus',
    slug: 'swoosh-monochrome',
  },
  {
    id: 'hero-12',
    image: '/assets/images/hero-posters/poster-10.png',
    title: 'Nightfall GT Livery',
    subtitle: 'Volkswagen Virtus',
    slug: 'swoosh-monochrome',
  },
  {
    id: 'hero-13',
    image: '/assets/images/hero-posters/poster-11.png',
    title: 'Marina Racing Blue',
    subtitle: 'Volkswagen Virtus',
    slug: 'swoosh-monochrome',
  },
];

// Spacing & scale anchor coordinates derived from Figma node 2425:70136
const ANCHORS = [
  { x: 0, scale: 1.0, opacity: 1.0 },       // Slot 0 (center)
  { x: 152, scale: 0.81, opacity: 1.0 },     // Slot 1
  { x: 288, scale: 0.656, opacity: 1.0 },    // Slot 2
  { x: 402, scale: 0.53, opacity: 1.0 },     // Slot 3
  { x: 506, scale: 0.43, opacity: 0.98 },    // Slot 4
  { x: 598, scale: 0.35, opacity: 0.88 },    // Slot 5
  { x: 678, scale: 0.28, opacity: 0.45 },    // Slot 6
  { x: 760, scale: 0.20, opacity: 0.0 },     // Slot 7 (fade off screen)
];

export const CurvedHeroGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  // Offset state: starts at 5.0 (Swoosh Collection) so it is centered initially
  const offsetRef = useRef(5.0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(5.0);
  const dragDistanceRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [activeCenterIndex, setActiveCenterIndex] = useState(5);

  // Speed: slow continuous drift (slots per second)
  const DRIFT_SPEED = 0.20; // ~5 seconds per card position
  const TOTAL_CARDS = HERO_POSTERS.length;

  // Responsive calculations
  const getLayoutDimensions = useCallback(() => {
    const width = containerRef.current?.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 1440);
    let baseCardW = 270;
    let baseCardH = 360;
    let spacingFactor = 1.0;

    if (width < 640) {
      // Mobile
      baseCardW = Math.min(220, Math.round(width * 0.52));
      baseCardH = Math.round(baseCardW * (4 / 3));
      spacingFactor = width / 780;
    } else if (width < 1024) {
      // Tablet
      baseCardW = Math.min(250, Math.round(width * 0.32));
      baseCardH = Math.round(baseCardW * (4 / 3));
      spacingFactor = width / 1150;
    } else if (width < 1440) {
      spacingFactor = width / 1440;
    }

    return { width, baseCardW, baseCardH, spacingFactor };
  }, []);

  // Update card positions directly via DOM transform for 60fps/120fps hardware-accelerated performance
  const applyTransforms = useCallback(() => {
    const { baseCardW, spacingFactor } = getLayoutDimensions();
    const currentOffset = offsetRef.current;
    let closestIndex = 0;
    let minDiffAbs = 999;

    for (let i = 0; i < TOTAL_CARDS; i++) {
      const el = cardsRef.current[i];
      if (!el) continue;

      let diff = i - currentOffset;
      // Wrap diff into [-TOTAL_CARDS / 2, TOTAL_CARDS / 2]
      while (diff > TOTAL_CARDS / 2) diff -= TOTAL_CARDS;
      while (diff < -TOTAL_CARDS / 2) diff += TOTAL_CARDS;

      const diffAbs = Math.abs(diff);

      if (diffAbs < minDiffAbs) {
        minDiffAbs = diffAbs;
        closestIndex = i;
      }

      // Interpolate from ANCHORS table
      let x = 0;
      let scale = 0.2;
      let opacity = 0;

      if (diffAbs >= 7) {
        opacity = 0;
        scale = 0.18;
        x = (760 + (diffAbs - 7) * 75) * spacingFactor;
      } else {
        const idx = Math.floor(diffAbs);
        const frac = diffAbs - idx;
        const a1 = ANCHORS[idx];
        const a2 = ANCHORS[idx + 1];

        x = (a1.x * (1 - frac) + a2.x * frac) * spacingFactor;
        scale = a1.scale * (1 - frac) + a2.scale * frac;
        opacity = a1.opacity * (1 - frac) + a2.opacity * frac;
      }

      const finalX = diff >= 0 ? x : -x;
      const zIndex = Math.round((10 - Math.min(diffAbs, 9.9)) * 10);
      const isCenter = diffAbs < 0.45;

      // Subtle 3D perspective rotation towards center
      const rotY = Math.max(-12, Math.min(12, diff * -2.2));

      el.style.transform = `translate3d(calc(-50% + ${finalX.toFixed(2)}px), -50%, 0) scale(${scale.toFixed(3)}) rotateY(${rotY.toFixed(1)}deg)`;
      el.style.zIndex = `${zIndex}`;
      el.style.opacity = `${opacity.toFixed(3)}`;
      el.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';

      // Elevated shadow for prominent center card
      if (isCenter) {
        el.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 12px 24px -8px rgba(0, 0, 0, 0.2)';
      } else {
        el.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.16), 0 4px 8px -4px rgba(0, 0, 0, 0.1)';
      }
    }

    setActiveCenterIndex(closestIndex);
  }, [getLayoutDimensions, TOTAL_CARDS]);

  // Main animation frame loop
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      applyTransforms();
      return;
    }

    let isRunning = true;

    const animate = (time: number) => {
      if (!isRunning) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Only advance offset if not paused and not dragging
      if (!isPausedRef.current && !isDraggingRef.current && delta < 0.1) {
        offsetRef.current = (offsetRef.current + DRIFT_SPEED * delta) % TOTAL_CARDS;
        if (offsetRef.current < 0) offsetRef.current += TOTAL_CARDS;
      }

      applyTransforms();
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [applyTransforms, TOTAL_CARDS]);

  // Pause when off-screen via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            isPausedRef.current = true;
          } else {
            isPausedRef.current = false;
            lastTimeRef.current = null;
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => applyTransforms();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyTransforms]);

  // Card click: navigate if already center card, or smoothly center card if on side
  const handleCardClick = (index: number) => {
    if (dragDistanceRef.current > 6) return; // Ignore clicks during swipe

    if (index === activeCenterIndex) {
      const poster = HERO_POSTERS[index];
      navigate(`/product/${poster.slug}`);
    } else {
      // Smoothly animate towards this index
      let targetDiff = index - offsetRef.current;
      while (targetDiff > TOTAL_CARDS / 2) targetDiff -= TOTAL_CARDS;
      while (targetDiff < -TOTAL_CARDS / 2) targetDiff += TOTAL_CARDS;

      const startTime = performance.now();
      const startOffset = offsetRef.current;
      const duration = 650; // ms

      isPausedRef.current = true;

      const tween = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        offsetRef.current = (startOffset + targetDiff * ease) % TOTAL_CARDS;
        if (offsetRef.current < 0) offsetRef.current += TOTAL_CARDS;
        applyTransforms();

        if (progress < 1) {
          requestAnimationFrame(tween);
        } else {
          isPausedRef.current = false;
        }
      };

      requestAnimationFrame(tween);
    }
  };

  // Touch & Drag gestures
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartXRef.current = clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);

    const slotDelta = deltaX / 160;
    offsetRef.current = (dragStartOffsetRef.current - slotDelta) % TOTAL_CARDS;
    if (offsetRef.current < 0) offsetRef.current += TOTAL_CARDS;
    applyTransforms();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const { baseCardW, baseCardH } = getLayoutDimensions();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
        isDraggingRef.current = false;
      }}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Automotive wrap livery carousel"
    >
      {/* Curved Gallery Track: All cards positioned absolutely around center (50%, 50%) */}
      <div className="absolute inset-0 size-full pointer-events-none">
        {HERO_POSTERS.map((poster, index) => {
          const isCenter = index === activeCenterIndex;
          return (
            <div
              key={poster.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleCardClick(index)}
              className="absolute left-1/2 top-1/2 rounded-[4px] bg-paper overflow-hidden transition-[box-shadow] duration-300 group cursor-pointer border border-black/5"
              style={{
                width: `${baseCardW}px`,
                height: `${baseCardH}px`,
                willChange: 'transform, opacity, z-index',
              }}
              title={isCenter ? `View ${poster.title}` : `Focus ${poster.title}`}
            >
              {/* Poster Artwork Image */}
              <div className="relative size-full overflow-hidden bg-surface">
                <img
                  src={poster.image}
                  alt={`${poster.title} - ${poster.subtitle}`}
                  className="size-full object-cover rounded-[4px] pointer-events-none"
                  loading="eager"
                  draggable={false}
                />

                {/* Subtle highlight overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none rounded-[4px]" />

                {/* Center Badge Indicator */}
                {isCenter && (
                  <div className="absolute bottom-3 left-3 right-3 bg-paper/95 backdrop-blur-sm border border-line px-3 py-1.5 flex items-center justify-between shadow-sm transition-opacity duration-300">
                    <div className="truncate pr-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted block truncate">
                        {poster.subtitle}
                      </span>
                      <span className="font-sans font-medium text-[12px] text-ink block truncate leading-tight">
                        {poster.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-ink shrink-0 font-medium">
                      View ↗
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Screen reader live announcement */}
      <div className="sr-only" aria-live="polite">
        Current active wrap: {HERO_POSTERS[activeCenterIndex]?.title} for{' '}
        {HERO_POSTERS[activeCenterIndex]?.subtitle}
      </div>
    </div>
  );
};
