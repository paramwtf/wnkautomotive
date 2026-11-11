import React, { useRef, useState, useEffect } from 'react';

export const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          video.muted = true;
          video.play().catch(() => setIsPlaying(false));
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 my-2 sm:my-4 bg-white">
      {/* 
        Container with overflow-hidden and seamless edge feathering
        Completely eliminates all video compression edge lines, borders, and subpixel seams
      */}
      <div
        className="relative w-full flex items-center justify-center bg-white overflow-hidden"
        style={{
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          WebkitMaskImage: 'radial-gradient(ellipse 98.5% 97.5% at 50% 50%, black 93%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 98.5% 97.5% at 50% 50%, black 93%, transparent 100%)',
        }}
      >
        <video
          ref={videoRef}
          src="/assets/videos/animo-cover-ring-2160p.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="relative w-full h-auto max-h-[580px] lg:max-h-[660px] object-cover bg-white block select-none pointer-events-none"
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            // 2% scale pushes any encoder 1px border compression lines outside the overflow-hidden boundary
            transform: 'scale(1.02)',
            transformOrigin: 'center center',
          }}
        />

        {/* Minimal borderless play/pause indicator */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          className="absolute bottom-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-muted hover:text-ink flex items-center justify-center font-mono text-[10px] shadow-sm transition-all cursor-pointer"
          title={isPlaying ? 'Pause animation' : 'Play animation'}
          style={{ border: 'none', outline: 'none' }}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
    </div>
  );
};
