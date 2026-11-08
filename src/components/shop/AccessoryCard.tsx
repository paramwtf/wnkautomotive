import React, { useState } from 'react';
import { Accessory } from '../../data/accessories';
import { useCart } from '../../context/CartContext';

interface AccessoryCardProps {
  accessory: Accessory;
}

export const AccessoryCard: React.FC<AccessoryCardProps> = ({ accessory }) => {
  const { items, addToCart, removeFromCart } = useCart();
  const [added, setAdded] = useState(false);

  // Check if this accessory is already in cart as standalone item
  const cartItem = items.find((i) => i.sku === accessory.sku);
  const isInCart = Boolean(cartItem);

  const handleToggle = () => {
    if (isInCart && cartItem) {
      removeFromCart(cartItem.id);
    } else {
      addToCart({
        productId: 900 + Math.abs(accessory.sku.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 100),
        sku: accessory.sku,
        name: accessory.name,
        slug: accessory.id,
        vehicleMake: 'Universal',
        vehicleModel: 'Universal Fitment',
        vehicleYear: '2024–2026',
        vehicleVariant: 'Standard',
        colour: 'Standard',
        finish: 'Matte/Gloss',
        coverage: 'Decals & Accessories',
        unitPrice: accessory.price,
        quantity: 1,
        image: accessory.image,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  return (
    <div className="bg-paper border border-line p-5 sm:p-6 flex flex-col justify-between transition-all hover:border-ink/60 group">
      <div>
        <span className="font-mono text-[9px] uppercase tracking-[0.3px] text-muted block mb-3">
          DECALS & ACCESSORIES
        </span>

        {/* Product Image Frame */}
        <div className="w-full aspect-[4/3] bg-[#f4f4f6] border border-line/60 flex items-center justify-center p-3 mb-4 overflow-hidden">
          <img
            src={accessory.image}
            alt={accessory.name}
            className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title & Description */}
        <h3 className="font-sans font-medium text-[17px] sm:text-[18px] text-ink leading-snug mb-1">
          {accessory.name}
        </h3>
        <p className="font-sans text-[12px] text-secondary leading-relaxed mb-4">
          {accessory.description}
        </p>
      </div>

      {/* Bottom Price & Add/Remove Control */}
      <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] text-muted block uppercase">PRICE</span>
          <span className="font-sans font-medium text-[18px] text-ink">
            ₹{accessory.price.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`h-[40px] px-4 font-mono text-[12px] uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
            isInCart
              ? 'bg-[#171717] text-white border border-[#171717]'
              : 'bg-white text-ink border border-field hover:border-ink hover:bg-surface'
          }`}
          aria-label={isInCart ? `Remove ${accessory.name} from cart` : `Add ${accessory.name} to cart`}
        >
          {isInCart ? (
            <>
              <span>In Cart</span>
              <span>✓</span>
            </>
          ) : (
            <>
              <span>{added ? 'Added' : 'Add to cart'}</span>
              <span>+</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

