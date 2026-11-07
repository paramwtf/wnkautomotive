import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ShowcaseProject {
  id: string;
  tag: string;
  title: string;
  vehicle: string;
  image: string;
  secondaryImage?: string;
  slug: string;
  description: string;
  isDetail?: boolean;
}

// Strictly the 4 bike projects specified by Yogesh Gurele WNK:
// Aprilia: Mayhem, Spiderman, Venom
// KTM 390: Pike Peak
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'proj-mayhem',
    tag: '01 / MAYHEM',
    title: 'Mayhem Edition',
    vehicle: 'Aprilia / RS 457',
    image: '/assets/images/rs457/web/rs457-mayhem-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-mayhem-02.webp',
    slug: 'mayhem-edition-aprilia-rs457',
    description:
      'Bold cyan and magenta graphics bring controlled chaos to the Aprilia RS 457’s sharp bodywork, with fine details up close.',
  },
  {
    id: 'proj-spiderman',
    tag: '02 / SPIDERMAN',
    title: 'Spiderman Miles Edition',
    vehicle: 'Aprilia / RS 457',
    image: '/assets/images/rs457/web/rs457-miles-morales-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-miles-morales-02.webp',
    slug: 'spiderman-miles-edition-aprilia-rs457',
    description:
      'Bold red web graphics on deep satin black panels inspired by Miles Morales’ suit, following aerodynamic chassis lines.',
  },
  {
    id: 'proj-venom',
    tag: '03 / VENOM',
    title: 'Venom Edition',
    vehicle: 'Aprilia / RS 457',
    image: '/assets/images/rs457/web/rs457-venom-01.webp',
    secondaryImage: '/assets/images/rs457/web/rs457-venom-02.webp',
    slug: 'venom-edition-aprilia-rs457',
    description:
      'Unleash a darker side with razor-sharp symbiote tooth contours across the lower fairing and blood crimson tendrils on the fuel tank.',
  },
  {
    id: 'proj-pikepeak',
    tag: '04 / PIKE PEAK',
    title: 'Pike Peak Edition',
    vehicle: 'KTM / 390 Adventure',
    image: '/assets/images/ktm/web/ktm-adv390-punisher-01.webp',
    secondaryImage: '/assets/images/ktm/web/ktm-adv390-punisher-02.webp',
    slug: 'pike-peak-edition-ktm-390-adventure',
    description:
      'Race-bred performance aesthetics inspired by the world’s most demanding hill climb, tailored to the KTM 390 Adventure chassis.',
  },
];

// Stack panel slices representing file folders in a drawer
const STACK_PANELS = [
  {
    id: 's-0',
    tag: '01 / MAYHEM',
    edition: 'MAYHEM EDITION',
    project: SHOWCASE_PROJECTS[0],
    image: '/assets/images/rs457/web/rs457-mayhem-01.webp',
    isDetail: false,
  },
  {
    id: 's-1',
    tag: '02 / SPIDERMAN',
    edition: 'SPIDERMAN MILES EDITION',
    project: SHOWCASE_PROJECTS[1],
    image: '/assets/images/rs457/web/rs457-miles-morales-01.webp',
    isDetail: false,
  },
  {
    id: 's-2',
    tag: '03 / VENOM',
    edition: 'VENOM EDITION',
    project: SHOWCASE_PROJECTS[2],
    image: '/assets/images/rs457/web/rs457-venom-01.webp',
    isDetail: false,
  },
  {
    id: 's-3',
    tag: '04 / PIKE PEAK',
    edition: 'PIKE PEAK EDITION',
    project: SHOWCASE_PROJECTS[3],
    image: '/assets/images/ktm/web/ktm-adv390-punisher-01.webp',
    isDetail: false,
  },
  {
    id: 's-4',
    tag: '01 / MAYHEM · DETAIL',
    edition: 'MAYHEM · DETAIL',
    project: SHOWCASE_PROJECTS[0],
    image: '/assets/images/rs457/web/rs457-mayhem-02.webp',
    isDetail: true,
  },
  {
    id: 's-5',
    tag: '02 / SPIDERMAN · DETAIL',
    edition: 'SPIDERMAN · DETAIL',
    project: SHOWCASE_PROJECTS[1],
    image: '/assets/images/rs457/web/rs457-miles-morales-02.webp',
    isDetail: true,
  },
  {
    id: 's-6',
    tag: '03 / VENOM · DETAIL',
    edition: 'VENOM · DETAIL',
    project: SHOWCASE_PROJECTS[2],
    image: '/assets/images/rs457/web/rs457-venom-02.webp',
    isDetail: true,
  },
  {
    id: 's-7',
    tag: '04 / PIKE PEAK · DETAIL',
    edition: 'PIKE PEAK · DETAIL',
    project: SHOWCASE_PROJECTS[3],
    image: '/assets/images/ktm/web/ktm-adv390-punisher-02.webp',
    isDetail: true,
  },
];

export const PerspectiveStack: React.FC = () => {
  // Default to index 0 (Mayhem Edition) open
  const [activeStackIdx, setActiveStackIdx] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const navigate = useNavigate();

  const handlePrev = () => {
    setActiveStackIdx((prev) => (prev > 0 ? prev - 1 : STACK_PANELS.length - 1));
  };

  const handleNext = () => {
    setActiveStackIdx((prev) => (prev < STACK_PANELS.length - 1 ? prev + 1 : 0));
  };

  const scrollToAllProjects = () => {
    const el = document.getElementById('all-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeStackItem = STACK_PANELS[activeStackIdx];

  return (
    <div className="relative w-full bg-white flex flex-col items-center">
      {/* Custom Keyframes for Elastic Stretch-to-Clear Transition */}
      <style>{`
        @keyframes stretchToClear {
          0% {
            transform: scale(1.18, 0.78) translateY(-8px);
            filter: blur(3px) contrast(1.15);
            opacity: 0.75;
          }
          45% {
            transform: scale(0.97, 1.06) translateY(2px);
            filter: blur(0.6px);
            opacity: 0.95;
          }
          75% {
            transform: scale(1.01, 0.99) translateY(-1px);
            filter: blur(0px);
            opacity: 1;
          }
          100% {
            transform: scale(1, 1) translateY(0);
            filter: blur(0px);
            opacity: 1;
          }
        }
        .anim-stretch-clear {
          animation: stretchToClear 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, filter, opacity;
        }
      `}</style>

      {/* 1. Perspective Archive Section (Figma node 2177:54715 / media_1794049460486_95ae0454.jpg) */}
      <div className="w-full max-w-[1440px] px-5 sm:px-8 lg:px-[57.6px] py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center min-h-[640px] lg:min-h-[740px]">
          {/* Left: Editorial Rail */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3px] uppercase text-muted">
              SHOWCASE / DESIGN IN MOTION
            </span>
            <h1 className="font-sans font-medium text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.72px] text-ink">
              Built to<br />
              stand apart<span className="text-[#e61919]">.</span>
            </h1>
            <p className="font-sans text-[14px] text-secondary leading-relaxed pt-2">
              Explore motorcycle livery builds documented by WNK studio. Precision-measured for factory Aprilia and KTM bodywork.
            </p>
            {activeStackItem && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(activeStackItem.project)}
                  className="inline-flex items-center gap-2 font-mono text-[12px] text-ink hover:text-muted underline underline-offset-4 cursor-pointer"
                >
                  <span>Open {activeStackItem.project.title} window</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </div>

          {/* Center: Interactive Expanding Drawer Stack (Exact match to media_1794049460486_95ae0454.jpg) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-2.5 w-full max-w-[580px] mx-auto py-6">
            {STACK_PANELS.map((panel, idx) => {
              const isExpanded = idx === activeStackIdx;

              return (
                <div
                  key={panel.id}
                  onMouseEnter={() => setActiveStackIdx(idx)}
                  onClick={() => {
                    setActiveStackIdx(idx);
                    if (isExpanded) {
                      setSelectedProject(panel.project);
                    }
                  }}
                  className={`group relative overflow-hidden cursor-pointer text-left ${
                    isExpanded
                      ? 'w-full max-w-[560px] h-[355px] sm:h-[385px] bg-[#e9eaec] border border-line shadow-xl z-20'
                      : 'w-[94%] max-w-[500px] h-[48px] sm:h-[52px] hover:h-[56px] hover:w-[98%] bg-surface border-0 z-10'
                  }`}
                  style={{
                    clipPath: isExpanded
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                      : 'polygon(24px 0%, calc(100% - 24px) 0%, 100% 100%, 0% 100%)',
                    WebkitClipPath: isExpanded
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                      : 'polygon(24px 0%, calc(100% - 24px) 0%, 100% 100%, 0% 100%)',
                    transition:
                      'height 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.45s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease, background-color 0.3s ease',
                  }}
                  title={isExpanded ? 'Click to view project details' : `Hover to expand ${panel.tag}`}
                >
                  {/* Top-Left Category Badge */}
                  <div
                    className={`absolute z-20 transition-all duration-300 ${
                      isExpanded
                        ? 'left-[16px] top-[14px] px-2.5 py-1 bg-white border border-line shadow-xs'
                        : 'left-[20px] top-[4px] px-2 py-0.5 bg-white text-ink border border-line/60 shadow-xs group-hover:bg-ink group-hover:text-white group-hover:border-ink'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.27px] font-normal whitespace-nowrap">
                      {panel.tag}
                    </span>
                  </div>

                  {/* Artwork Container: Flush edge-to-edge, zero awkward padding gaps */}
                  <div
                    className={`w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden p-0 ${
                      isExpanded
                        ? 'h-[285px] sm:h-[315px]'
                        : 'h-[48px] sm:h-[52px]'
                    }`}
                  >
                    {isExpanded ? (
                      <img
                        key={`expanded-${panel.id}-${activeStackIdx}`}
                        src={panel.image}
                        alt={panel.tag}
                        className="w-full h-full object-cover object-center anim-stretch-clear"
                      />
                    ) : (
                      <img
                        key={`collapsed-${panel.id}`}
                        src={panel.image}
                        alt={panel.tag}
                        className="w-full h-full object-cover object-center scale-105 opacity-90 group-hover:opacity-100 transition-all duration-300"
                      />
                    )}
                  </div>

                  {/* Dark subtle depth shading on collapsed slits */}
                  <div
                    className={`absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none ${
                      isExpanded ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                    }`}
                  />

                  {/* Bottom Metadata Bar: Edition, Vehicle, Explore project → */}
                  <div
                    className={`w-full px-5 py-3.5 bg-white border-t border-line/70 flex items-end justify-between gap-4 transition-all duration-300 ease-out ${
                      isExpanded
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none h-0 p-0 overflow-hidden border-0'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3px] text-muted block mb-0.5">
                        {panel.edition}
                      </span>
                      <h3 className="font-sans font-medium text-[20px] sm:text-[23px] text-ink leading-tight">
                        {panel.project.vehicle}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(panel.project);
                      }}
                      className="font-sans text-[13px] text-ink hover:text-muted underline underline-offset-4 cursor-pointer pb-0.5 whitespace-nowrap"
                    >
                      Explore project →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Archive Controls */}
          <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between lg:h-[480px] w-full pt-4 lg:pt-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.3px] text-ink text-right">
              04 PROJECTS
            </span>

            {/* Navigation buttons: Next/Prev cycle active expanded card */}
            <div className="flex lg:flex-col items-center gap-1.5 my-auto">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project slice"
                className="w-11 h-11 border border-line bg-white hover:bg-surface text-ink flex items-center justify-center transition-colors shadow-sm cursor-pointer active:scale-95"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project slice"
                className="w-11 h-11 border border-line bg-white hover:bg-surface text-ink flex items-center justify-center transition-colors shadow-sm cursor-pointer active:scale-95"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {/* View all projects */}
            <button
              type="button"
              onClick={scrollToAllProjects}
              className="font-sans text-[12px] text-ink hover:text-muted underline underline-offset-4 text-right cursor-pointer"
            >
              View all projects
            </button>
          </div>
        </div>
      </div>

      {/* 2. ALL PROJECTS Gallery Section (Mayhem, Spiderman, Venom, Pike Peak) */}
      <section
        id="all-projects"
        className="w-full border-t border-line py-16 lg:py-20 bg-paper"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.3px] text-muted block mb-8">
            ALL PROJECTS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOWCASE_PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col space-y-3 cursor-pointer"
              >
                <div className="aspect-[16/10] bg-[#f4f4f2] border border-line overflow-hidden relative shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 font-mono text-[11px] bg-white px-3 py-1 border border-line shadow-sm transition-opacity">
                      Open window →
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.27px] text-muted">
                  {project.tag}
                </span>
                <h3 className="font-sans font-medium text-[20px] text-ink group-hover:text-muted transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-[13px] text-muted">
                  {project.vehicle}
                </p>
                <span className="font-sans text-[13px] text-ink underline underline-offset-4">
                  Explore project →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Exact Figma Project Window Modal (Figma node 2030:929 / media_1794046057803_fbc82b70.png) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white w-full max-w-[1100px] border border-line shadow-2xl relative my-auto p-6 sm:p-10 lg:p-14 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-muted hover:text-ink font-mono text-xl w-9 h-9 flex items-center justify-center border border-line bg-surface hover:bg-surface-2 transition-colors cursor-pointer"
              title="Close window"
            >
              ✕
            </button>

            {/* Page Title & Category (Figma node 2041:9398) */}
            <div className="flex flex-col gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3px] text-muted">
                SHOWCASE / PROJECT
              </span>
              <h2 className="font-sans font-medium text-[36px] sm:text-[54px] lg:text-[72px] leading-[1.05] tracking-[-1.6px] text-ink">
                {selectedProject.title}
              </h2>
              <p className="font-sans text-[18px] sm:text-[20px] text-ink">
                {selectedProject.vehicle}
              </p>
            </div>

            {/* Large Vehicle Artwork Image (Figma node 2041:9402) */}
            <div className="w-full h-[320px] sm:h-[460px] lg:h-[520px] bg-[#f2f4f7] border border-line flex items-center justify-center mb-8 overflow-hidden relative shadow-sm">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} ${selectedProject.vehicle}`}
                className="w-full h-full object-cover object-center filter drop-shadow-[0_16px_22px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Story Text Row: "Every line has a purpose." (Figma node 2041:9403) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 border-t border-line">
              <div className="md:col-span-6">
                <h3 className="font-sans font-medium text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-1.2px] text-ink">
                  Every line<br />
                  has a purpose<span className="text-[#e61919]">.</span>
                </h3>
              </div>

              <div className="md:col-span-6 flex flex-col space-y-6">
                <p className="font-sans text-[16px] sm:text-[18px] text-secondary leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/product/${selectedProject.slug}`);
                    }}
                    className="h-[52px] px-8 bg-[#010101] text-white font-sans text-[14px] hover:bg-charcoal transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Configure this wrap</span>
                    <span className="font-mono">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="h-[52px] px-6 bg-white border border-[#cecece] text-ink font-sans text-[14px] hover:border-ink transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Back to Showcase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
