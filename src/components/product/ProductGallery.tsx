import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ['/assets/images/virtus-swoosh.png'];
  const activeImage = displayImages[activeImageIndex] || displayImages[0];

  return (
    <div className="w-full space-y-4">
      {/* Primary Display Frame */}
      <div className="relative aspect-[4/3] bg-surface border border-line overflow-hidden">
        <img
          src={activeImage}
          alt={alt}
          className="size-full object-cover transition-opacity duration-300"
        />
        <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-sm border border-line px-3 py-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-ink">
            PHOTOGRAPHY / STUDIO PUNE
          </span>
        </div>
      </div>

      {/* Thumbnail Track */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`size-[72px] sm:size-[84px] shrink-0 border overflow-hidden transition-all ${
                idx === activeImageIndex
                  ? 'border-ink ring-1 ring-ink'
                  : 'border-line opacity-70 hover:opacity-100 hover:border-field'
              }`}
              aria-label={`Select photo ${idx + 1}`}
            >
              <img src={img} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

