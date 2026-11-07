import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface OrbitalBike {
  id: string;
  name: string;
  model: string;
  make: string;
  image: string;
  slug: string;
}

// Strictly MOTORCYCLES only (No cars, no trucks)
export const ORBITAL_BIKES: OrbitalBike[] = [
  {
    id: 'bike-1',
    name: 'Nightshade Edition',
    model: 'Ninja 300',
    make: 'Kawasaki',
    image: '/assets/images/hero/web/nightshade-edition-kawasaki-ninja-300.webp',
    slug: 'nightshade-violet',
  },
  {
    id: 'bike-2',
    name: 'Mayhem Edition',
    model: 'RS 457',
    make: 'Aprilia',
    image: '/assets/images/rs457/web/rs457-mayhem-01.webp',
    slug: 'mayhem-edition-aprilia-rs457',
  },
  {
    id: 'bike-3',
    name: 'Hornet Edition',
    model: 'F 450GS',
    make: 'BMW',
    image: '/assets/images/hero/web/hornet-edition-f-450gs.webp',
    slug: 'hornet-edition-bmw-f450gs',
  },
  {
    id: 'bike-4',
    name: 'Spiderman Miles Edition',
    model: 'RS 457',
    make: 'Aprilia',
    image: '/assets/images/rs457/web/rs457-miles-morales-01.webp',
    slug: 'spiderman-miles-edition-aprilia-rs457',
  },
  {
    id: 'bike-5',
    name: 'Punisher Edition',
    model: '390 Adventure',
    make: 'KTM',
    image: '/assets/images/ktm/web/ktm-adv390-punisher-01.webp',
    slug: 'punisher-edition-ktm-390-adventure',
  },
  {
    id: 'bike-6',
    name: 'Venom Edition',
    model: 'RS 457',
    make: 'Aprilia',
    image: '/assets/images/rs457/web/rs457-venom-01.webp',
    slug: 'venom-edition-aprilia-rs457',
  },
  {
    id: 'bike-7',
    name: 'Lightning McQueen 95',
    model: 'RS 457',
    make: 'Aprilia',
    image: '/assets/images/rs457/web/rs457-lightning-mcqueen-01.webp',
    slug: 'lightning-mcqueen-edition-aprilia-rs457',
  },
  {
    id: 'bike-8',
    name: 'Monza Blue Edition',
    model: 'RS 457',
    make: 'Aprilia',
    image: '/assets/images/rs457/web/rs457-monza-blue-01.webp',
    slug: 'monza-blue-edition-aprilia-rs457',
  },
  {
    id: 'bike-9',
    name: 'Glacier Ridge Edition',
    model: 'R 1250GS',
    make: 'BMW',
    image: '/assets/images/hero/web/glacier-ridge-edition.webp',
    slug: 'glacier-ridge-bmw-r1250gs',
  },
  {
    id: 'bike-10',
    name: 'Marlboro Edition',
    model: 'RS 457',
    make: 'Aprilia',
    image: '/assets/images/rs457/web/rs457-marlboro-01.webp',
    slug: 'marlboro-edition-aprilia-rs457',
  },
];

export const PureBikeOrbitalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const TOTAL_BIKES = ORBITAL_BIKES.length;
  const STEP_ANGLE = 360 / TOTAL_BIKES; // 36 degrees per bike

  // Physics & Animation state refs (60fps without React re-renders)
  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0.075); // Gentle continuous orbit speed (deg/frame)
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isTargetingRef = useRef<boolean>(false);
  const targetRotRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Responsive dimensions for the 3D ring
  const [layout, setLayout] = useState<{ cardW: number; cardH: number; radius: number }>({
    cardW: 280,
    cardH: 240,
    radius: 460,
  });

  const updateLayout = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) {
      // Mobile
      const cardW = Math.min(200, Math.round(w * 0.52));
      const cardH = Math.round(cardW * 0.85);
      const radius = 290;
      setLayout({ cardW, cardH, radius });
    } else if (w < 1024) {
      // Tablet
      const cardW = 240;
      const cardH = 205;
      const radius = 380;
      setLayout({ cardW, cardH, radius });
    } else {
      // Desktop
      const cardW = 290;
      const cardH = 245;
      const radius = 480;
      setLayout({ cardW, cardH, radius });
    }
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  // Main 3D Continuous Orbital Loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPaused(true);
      return;
    }

    const animate = () => {
      if (!isDraggingRef.current) {
        if (isTargetingRef.current) {
          const diff = targetRotRef.current - rotationRef.current;
          rotationRef.current += diff * 0.08;
          if (Math.abs(diff) < 0.1) {
            rotationRef.current = targetRotRef.current;
            isTargetingRef.current = false;
          }
        } else if (!isHoveredRef.current && !isPaused) {
          rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
        } else if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
          velocityRef.current *= 0.94; // inertia friction
        }
      }

      // Calculate which bike is currently closest to the front (0 deg)
      const currentRot = rotationRef.current;
      let minAngleDist = 999;
      let centerIdx = 0;

      for (let i = 0; i < TOTAL_BIKES; i++) {
        let bikeAngle = ((i * STEP_ANGLE + currentRot) % 360 + 360) % 360;
        if (bikeAngle > 180) bikeAngle -= 360;
        const dist = Math.abs(bikeAngle);
        if (dist < minAngleDist) {
          minAngleDist = dist;
          centerIdx = i;
        }
      }

      setActiveIdx((prev) => (prev !== centerIdx ? centerIdx : prev));

      // Direct GPU transform update on the 3D cylindrical stage
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateY(${-rotationRef.current}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [TOTAL_BIKES, STEP_ANGLE, isPaused]);

  // Drag / Swipe Gestures
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
    rotationRef.current = dragStartRotRef.current - deltaX * 0.28;

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
    if (Math.abs(velocityRef.current) > 2.2) {
      velocityRef.current = Math.sign(velocityRef.current) * 2.2;
    } else if (Math.abs(velocityRef.current) < 0.05) {
      velocityRef.current = 0.075;
    }
  };

  // Rotate smoothly to bring a specific bike to the front
  const rotateToBike = (index: number) => {
    const currentRot = rotationRef.current;
    const targetBase = -index * STEP_ANGLE;
    let delta = ((targetBase - currentRot) % 360 + 540) % 360 - 180;
    targetRotRef.current = currentRot + delta;
    isTargetingRef.current = true;
  };

  const activeBike = ORBITAL_BIKES[activeIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none py-2 sm:py-6"
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
      {/* 3D Viewport with Perspective */}
      <div
        className="relative mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
          height: `${layout.cardH + 70}px`,
          maxWidth: '1440px',
        }}
      >
        {/* Soft Radial Ambient Studio Light (Matching animo video aesthetic) */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(244, 244, 245, 0.5) 50%, transparent 80%)',
          }}
        />

        {/* 3D Cylindrical Ring Stage */}
        <div
          ref={stageRef}
          className="relative w-0 h-0"
          style={{
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : undefined,
          }}
        >
          {ORBITAL_BIKES.map((bike, index) => {
            const cardAngle = index * STEP_ANGLE;
            const isCenter = index === activeIdx;

            return (
              <div
                key={bike.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCenter) {
                    rotateToBike(index);
                  } else {
                    navigate(`/shop?q=${encodeURIComponent(bike.name)}`);
                  }
                }}
                className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-[#eceef1] border border-black/5 transition-all duration-300 flex items-center justify-center p-3 cursor-pointer group ${
                  isCenter
                    ? 'shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)] ring-1 ring-black/15'
                    : 'shadow-[0_10px_25px_-8px_rgba(0,0,0,0.12)] opacity-85 hover:opacity-100 hover:brightness-105'
                }`}
                style={{
                  width: `${layout.cardW}px`,
                  height: `${layout.cardH}px`,
                  transform: `rotateY(${cardAngle}deg) translateZ(${layout.radius}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                  WebkitBackfaceVisibility: 'visible',
                }}
              >
                {/* Clean Bike Artwork Container (Video Frame Appearance) */}
                <div className="relative w-full h-full rounded-[14px] bg-[#e3e6ea] overflow-hidden flex items-center justify-center p-2.5">
                  {/* Subtle Top-Down Lighting Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-black/5 pointer-events-none" />

                  {/* Bike Livery Image */}
                  <img
                    src={bike.image}
                    alt={`${bike.name} - ${bike.make} ${bike.model}`}
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_14px_rgba(0,0,0,0.22)] transform group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    loading="eager"
                  />

                  {/* Minimal Subtle Badge on Active Card */}
                  {isCenter && (
                    <div className="absolute bottom-2 inset-x-2 rounded-lg bg-black/85 backdrop-blur-md px-3 py-1.5 text-white flex items-center justify-between">
                      <div className="overflow-hidden">
                        <p className="font-sans font-medium text-[11px] leading-tight truncate">
                          {bike.name}
                        </p>
                        <p className="font-mono text-[9px] text-[#a0a5ad] uppercase truncate">
                          {bike.make} {bike.model}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-white/80">→</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Strip & Active Bike Indicator */}
      <div className="relative max-w-sm mx-auto mt-1 px-4 flex flex-col items-center text-center">
        <p className="font-mono text-[10px] tracking-wider uppercase text-muted mb-2">
          FEATURED: <strong className="text-ink font-sans font-medium">{activeBike.name}</strong> ({activeBike.make} {activeBike.model})
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => rotateToBike((activeIdx - 1 + TOTAL_BIKES) % TOTAL_BIKES)}
            aria-label="Previous bike"
            className="w-7 h-7 rounded-full border border-black/15 bg-white hover:bg-surface flex items-center justify-center text-ink text-xs font-mono shadow-sm"
          >
            ←
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1">
            {ORBITAL_BIKES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => rotateToBike(i)}
                aria-label={`Go to bike ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIdx ? 'w-4 h-1.5 bg-ink' : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => rotateToBike((activeIdx + 1) % TOTAL_BIKES)}
            aria-label="Next bike"
            className="w-7 h-7 rounded-full border border-black/15 bg-white hover:bg-surface flex items-center justify-center text-ink text-xs font-mono shadow-sm"
          >
            →
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
            className="w-7 h-7 rounded-full border border-black/15 bg-white hover:bg-surface flex items-center justify-center text-muted hover:text-ink text-[10px] font-mono shadow-sm ml-1"
            title={isPaused ? 'Resume rotation' : 'Pause rotation'}
          >
            {isPaused ? '▶' : '❚❚'}
          </button>
        </div>
      </div>
    </div>
  );
};

