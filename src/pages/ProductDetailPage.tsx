import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductConfigurator } from '../components/product/ProductConfigurator';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'install'>('details');

  if (!slug) {
    return <Navigate to="/shop" replace />;
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 text-center">
        <h1 className="font-sans font-medium text-[32px] text-ink mb-4">
          Product Not Found<span className="text-red">.</span>
        </h1>
        <p className="font-sans text-secondary mb-8">
          The requested livery design could not be found in our catalogue.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-ink text-white font-mono text-[13px]"
        >
          Return to Catalogue →
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.vehicleType === product.vehicleType || p.make === product.make)
  ).slice(0, 3);

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-line py-3.5 bg-surface-2">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] flex items-center gap-2 font-mono text-[11px] text-muted overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-ink">
            HOME
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ink">
            SHOP
          </Link>
          <span>/</span>
          <Link to={`/shop?type=${product.vehicleType}`} className="hover:text-ink">
            {product.vehicleType.toUpperCase()}S
          </Link>
          <span>/</span>
          <span className="text-ink font-medium uppercase">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px] py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.galleryImages.length > 0 ? product.galleryImages : [product.cardImage]}
              alt={product.imageAlt || product.name}
            />

            {/* Information Tabs */}
            <div className="mt-10 pt-8 border-t border-line">
              <div className="flex items-center gap-6 border-b border-line pb-2 mb-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`font-mono text-[12px] uppercase tracking-[0.4px] pb-2 transition-colors ${
                    activeTab === 'details'
                      ? 'text-ink font-medium border-b-2 border-ink -mb-[10px]'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`font-mono text-[12px] uppercase tracking-[0.4px] pb-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'text-ink font-medium border-b-2 border-ink -mb-[10px]'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('install')}
                  className={`font-mono text-[12px] uppercase tracking-[0.4px] pb-2 transition-colors ${
                    activeTab === 'install'
                      ? 'text-ink font-medium border-b-2 border-ink -mb-[10px]'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Installation & Care
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="space-y-4 font-sans text-[15px] text-secondary leading-relaxed">
                  <p>{product.description}</p>
                  <div className="p-4 bg-surface border border-line">
                    <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-ink font-medium block mb-2">
                      INCLUDED IN THE BOX:
                    </span>
                    <p className="text-[14px] text-secondary">{product.kitContents}</p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-[14px]">
                  <div className="p-3 bg-surface border border-line">
                    <span className="font-mono text-[10px] text-muted block uppercase">Material Grade</span>
                    <span className="text-ink font-medium mt-0.5 block">Dual-Cast Automotive Vinyl</span>
                  </div>
                  <div className="p-3 bg-surface border border-line">
                    <span className="font-mono text-[10px] text-muted block uppercase">Adhesive Technology</span>
                    <span className="text-ink font-medium mt-0.5 block">Micro Air-Release Bubble Free</span>
                  </div>
                  <div className="p-3 bg-surface border border-line">
                    <span className="font-mono text-[10px] text-muted block uppercase">Film Thickness</span>
                    <span className="text-ink font-medium mt-0.5 block">90–110 Micron with UV Barrier</span>
                  </div>
                  <div className="p-3 bg-surface border border-line">
                    <span className="font-mono text-[10px] text-muted block uppercase">Outdoor Durability</span>
                    <span className="text-ink font-medium mt-0.5 block">3 to 5 Years Outdoor Rated</span>
                  </div>
                  <div className="p-3 bg-surface border border-line">
                    <span className="font-mono text-[10px] text-muted block uppercase">Removability</span>
                    <span className="text-ink font-medium mt-0.5 block">Clean release without paint residue</span>
                  </div>
                  <div className="p-3 bg-surface border border-line">
                    <span className="font-mono text-[10px] text-muted block uppercase">Manufacturing Origin</span>
                    <span className="text-ink font-medium mt-0.5 block">Precision Laser Cut in Pune, India</span>
                  </div>
                </div>
              )}

              {activeTab === 'install' && (
                <div className="space-y-3 font-sans text-[14px] text-secondary leading-relaxed">
                  <p>
                    <strong>Surface Preparation:</strong> Wash panels thoroughly with alcohol-based surface wipe to remove wax, dirt, and road oils.
                  </p>
                  <p>
                    <strong>Application Technique:</strong> Dry application with included felt-edge squeegee. Start from panel center and sweep outward to vent air.
                  </p>
                  <p>
                    <strong>Post-Heat Pass:</strong> Heat vinyl edges to 85°C–90°C using heat gun to eliminate plastic memory at recessed contours.
                  </p>
                  <p>
                    <strong>Wash & Maintenance:</strong> Hand wash with pH-neutral shampoo. Avoid high-pressure water nozzles closer than 18 inches.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Configurator (5 cols) */}
          <div className="lg:col-span-5">
            <ProductConfigurator product={product} />
          </div>
        </div>

        {/* Related Designs Shelf */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-line">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-muted block mb-1">
                  COMPATIBLE ALTERNATIVES
                </span>
                <h3 className="font-sans font-medium text-[24px] text-ink">
                  Related Designs<span className="text-red">.</span>
                </h3>
              </div>
              <Link to="/shop" className="font-mono text-[13px] text-ink underline underline-offset-4">
                View all catalogue →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

