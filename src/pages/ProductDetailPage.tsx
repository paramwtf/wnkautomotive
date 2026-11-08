import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductConfigurator } from '../components/product/ProductConfigurator';
import { ProductFeaturesSection } from '../components/product/ProductFeaturesSection';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

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
          </div>

          {/* Right Column: Interactive Configurator (5 cols) */}
          <div className="lg:col-span-5">
            <ProductConfigurator product={product} />
          </div>
        </div>

        {/* Features & Benefits + Installation, Care, Materials & Colour note */}
        <ProductFeaturesSection />

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

