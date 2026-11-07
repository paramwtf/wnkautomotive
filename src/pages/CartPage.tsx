import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    subtotal,
    deliveryFee,
    discount,
    total,
    totalQuantity,
  } = useCart();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyCoupon(promoInput);
    setPromoMessage({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleRemovePromo = () => {
    removeCoupon();
    setPromoMessage(null);
  };

  if (items.length === 0) {
    return (
      <div className="w-full bg-paper min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="size-16 mx-auto mb-6 border border-line flex items-center justify-center bg-surface">
            <img src="/assets/icons/icon-cart.svg" alt="" className="size-7 opacity-40" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
            YOUR SELECTION
          </span>
          <h1 className="font-sans font-medium text-[32px] sm:text-[38px] text-ink tracking-tight mb-4">
            Your cart is empty<span className="text-red">.</span>
          </h1>
          <p className="font-sans text-[15px] text-secondary leading-relaxed mb-8">
            You haven't added any wrap kits or decals yet. Explore our precision-fit motorcycle and automotive catalogue.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Explore Wrap Catalogue →
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Header */}
      <section className="border-b border-line py-10 lg:py-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
                  CHECKOUT BAG
                </span>
                <span className="text-muted text-[11px]">•</span>
                <span className="font-mono text-[11px] text-ink uppercase">
                  {totalQuantity} {totalQuantity === 1 ? 'ITEM' : 'ITEMS'}
                </span>
              </div>
              <h1 className="font-sans font-medium text-[36px] sm:text-[46px] text-ink tracking-tight">
                Review Your Cart<span className="text-red">.</span>
              </h1>
            </div>

            <button
              onClick={clearCart}
              className="font-mono text-[12px] uppercase text-muted hover:text-red transition-colors underline underline-offset-4 hidden sm:block"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>

      {/* Main Cart Grid: Left 8 cols (Line items), Right 4 cols (Summary) */}
      <section className="py-10 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border border-line bg-paper divide-y divide-line">
                {items.map((item) => {
                  const lineTotal = item.unitPrice * item.quantity;
                  return (
                    <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5">
                      {/* Product Thumbnail */}
                      <Link
                        to={`/product/${item.slug}`}
                        className="size-24 sm:size-28 shrink-0 bg-surface border border-line overflow-hidden block"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="font-mono text-[10px] uppercase text-muted tracking-wider block">
                                {item.vehicleMake} / {item.vehicleModel} ({item.vehicleYear})
                              </span>
                              <Link
                                to={`/product/${item.slug}`}
                                className="font-sans font-medium text-[18px] text-ink hover:text-secondary transition-colors"
                              >
                                {item.name}
                              </Link>
                              {item.vehicleVariant && (
                                <span className="block font-sans text-[12px] text-muted mt-0.5">
                                  Trim: {item.vehicleVariant}
                                </span>
                              )}
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="size-8 flex items-center justify-center text-muted hover:text-red transition-colors"
                              title="Remove item"
                              aria-label={`Remove ${item.name}`}
                            >
                              ✕
                            </button>
                          </div>

                          {/* Selected Specifications Pill Row */}
                          <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-mono">
                            <span className="px-2 py-1 bg-surface border border-line text-ink">
                              Color: {item.colour}
                            </span>
                            <span className="px-2 py-1 bg-surface border border-line text-ink">
                              Finish: {item.finish}
                            </span>
                            <span className="px-2 py-1 bg-surface border border-line text-ink">
                              Coverage: {item.coverage}
                            </span>
                            {item.wheelSize && (
                              <span className="px-2 py-1 bg-surface border border-line text-ink">
                                Rim: {item.wheelSize}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-2">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-line">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="size-8 flex items-center justify-center font-mono text-[14px] text-ink hover:bg-surface transition-colors focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-10 text-center font-mono text-[13px] text-ink font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="size-8 flex items-center justify-center font-mono text-[14px] text-ink hover:bg-surface transition-colors focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-sans font-medium text-[18px] text-ink">
                              ₹{lineTotal.toLocaleString('en-IN')}
                            </div>
                            {item.quantity > 1 && (
                              <div className="font-mono text-[10px] text-muted">
                                ₹{item.unitPrice.toLocaleString('en-IN')} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Clear Cart */}
              <div className="sm:hidden text-right">
                <button
                  onClick={clearCart}
                  className="font-mono text-[12px] uppercase text-muted hover:text-red underline underline-offset-4"
                >
                  Clear Cart
                </button>
              </div>

              {/* Promo Code Box */}
              <div className="border border-line p-6 bg-paper">
                <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-3">
                  PROMOTIONAL / VIP CODE
                </span>

                {couponCode ? (
                  <div className="flex items-center justify-between p-3.5 bg-surface border border-line">
                    <div className="flex items-center gap-2.5">
                      <span className="size-2 bg-green-600 rounded-full inline-block" />
                      <span className="font-mono text-[13px] font-medium text-ink uppercase">
                        {couponCode} ({couponDiscountPercent}% OFF APPLIED)
                      </span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="font-mono text-[12px] uppercase text-red hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try WNK10 or WNK20"
                      className="flex-1 bg-paper border border-line px-3.5 py-2.5 font-mono text-[13px] uppercase text-ink focus:outline-none focus:border-ink rounded-none placeholder:normal-case placeholder:text-muted/60"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-ink text-white font-mono text-[12px] uppercase hover:bg-charcoal transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p
                    className={`font-sans text-[12px] mt-2.5 ${
                      promoMessage.type === 'success' ? 'text-green-700' : 'text-red'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Order Summary Sticky Card */}
            <div className="lg:col-span-4">
              <div className="border border-line p-6 sm:p-8 bg-paper sticky top-28 space-y-6">
                <h2 className="font-mono text-[12px] uppercase tracking-[0.4px] text-ink font-semibold pb-4 border-b border-line">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-3 font-sans text-[14px]">
                  <div className="flex items-center justify-between text-secondary">
                    <span>Subtotal ({totalQuantity} items)</span>
                    <span className="text-ink font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-green-700">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">− ₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-secondary">
                    <span>Nationwide Shipping</span>
                    <span className="font-mono text-ink uppercase text-[12px] font-medium">FREE</span>
                  </div>

                  <div className="pt-4 border-t border-line flex items-baseline justify-between">
                    <div>
                      <span className="font-sans font-medium text-[16px] text-ink block">
                        Estimated Total
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        GST INCLUDED / PRE-FITMENT VERIFICATION
                      </span>
                    </div>
                    <span className="font-sans font-medium text-[24px] text-ink">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-center"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout →
                </Button>

                {/* Guarantees & Notes */}
                <div className="pt-4 border-t border-line space-y-2.5 font-sans text-[12px] text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-ink">✓</span>
                    <span>100% Precision fitment scan verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-ink">✓</span>
                    <span>Shipped in reinforced cylindrical postal tubes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-ink">✓</span>
                    <span>WhatsApp order confirmation desk</span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/shop"
                    className="font-mono text-[11px] uppercase text-muted hover:text-ink underline"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

