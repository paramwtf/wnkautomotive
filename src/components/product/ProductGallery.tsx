import React, { useState, useMemo } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

// Common shared third motorcycle image path located in public/assets/images/common-third/
export const COMMON_THIRD_IMAGE_PATH = '/assets/images/common-third/wrap-installation-2400x2400.png';

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // The first two images remain product-specific; the third image is the shared angled/side-view image
  const displayImages = useMemo(() => {
    const base = images.length > 0 ? images.slice(0, 2) : ['/assets/images/rs457/web/rs457-mayhem-01.webp'];
    if (!base.includes(COMMON_THIRD_IMAGE_PATH)) {
      return [...base, COMMON_THIRD_IMAGE_PATH];
    }
    return base;
  }, [images]);

  const activeImage = displayImages[activeImageIndex] || displayImages[0];

  return (
    <div className="w-full space-y-4">
      {/* Primary Display Frame */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-[#f4f4f2] border border-line overflow-hidden shadow-sm">
        <img
          src={activeImage}
          alt={alt}
          className="size-full object-cover object-center transition-opacity duration-300"
        />
      </div>

      {/* Thumbnail Track - Always 3 synchronized thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`size-[72px] sm:size-[84px] shrink-0 border overflow-hidden transition-all bg-[#f4f4f2] cursor-pointer ${
                idx === activeImageIndex
                  ? 'border-ink ring-2 ring-ink'
                  : 'border-line opacity-75 hover:opacity-100 hover:border-field'
              }`}
              aria-label={`Select photo ${idx + 1}`}
            >
              <img
                src={img}
                alt=""
                className="size-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

