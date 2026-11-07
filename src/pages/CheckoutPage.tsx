import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CustomerDetails, Order } from '../types';
import { Button } from '../components/common/Button';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discount, couponCode, deliveryFee, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="w-full bg-paper min-h-[60vh] flex items-center justify-center py-20">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="font-sans font-medium text-[28px] text-ink mb-3">
            Your cart is empty<span className="text-red">.</span>
          </h2>
          <p className="font-sans text-secondary text-[14px] mb-6">
            Please select a wrap design before proceeding to checkout.
          </p>
          <Link to="/shop">
            <Button variant="primary">Return to Catalogue →</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!customer.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = customer.phone.replace(/[\s\-+()]/g, '');
      if (cleanPhone.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
    }

    if (!customer.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!customer.addressLine1.trim()) {
      newErrors.addressLine1 = 'Street address is required';
    }

    if (!customer.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!customer.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!customer.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(customer.pincode.trim())) {
      newErrors.pincode = 'Please enter a 6-digit Indian PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to top of form
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // 1. Generate unique order reference: WNK-ORD-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
    const orderRef = `WNK-ORD-${randomSuffix}`;
    const createdAt = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 2. Format items list for WhatsApp
    const itemsFormatted = items
      .map((item, idx) => {
        const itemLineTotal = item.unitPrice * item.quantity;
        return `${idx + 1}. *${item.name}* (Qty: ${item.quantity})
   • Vehicle: ${item.vehicleMake} ${item.vehicleModel} ${item.vehicleYear} ${item.vehicleVariant ? `(${item.vehicleVariant})` : ''}
   • Specs: Color: ${item.colour} | Finish: ${item.finish} | Coverage: ${item.coverage}${item.wheelSize ? ` | Rim: ${item.wheelSize}` : ''}
   • Price: ₹${item.unitPrice.toLocaleString('en-IN')} × ${item.quantity} = ₹${itemLineTotal.toLocaleString('en-IN')}`;
      })
      .join('\n\n');

    // 3. Compose readable WhatsApp message
    const orderMessage = `*NEW ORDER REQUEST — WNK AUTOMOTIVE*
Order Ref: ${orderRef}
Date: ${createdAt}

*CUSTOMER DETAILS*
• Name: ${customer.fullName.trim()}
• Phone: ${customer.phone.trim()}
• Email: ${customer.email.trim()}
• Shipping Address:
  ${customer.addressLine1.trim()}${customer.addressLine2 ? `\n  ${customer.addressLine2.trim()}` : ''}
  ${customer.city.trim()}, ${customer.state.trim()} - ${customer.pincode.trim()}
${customer.notes ? `• Order Notes: ${customer.notes.trim()}` : ''}

*ORDER ITEMS*
${itemsFormatted}

--------------------------------
Subtotal: ₹${subtotal.toLocaleString('en-IN')}
${discount > 0 ? `Discount (${couponCode}): -₹${discount.toLocaleString('en-IN')}\n` : ''}Nationwide Shipping: FREE
*ESTIMATED TOTAL: ₹${total.toLocaleString('en-IN')}*
--------------------------------

*STATUS: PENDING CONFIRMATION*
_Note: This is an order request. Please confirm panel fitment and share UPI / payment transfer instructions._`;

    // 4. Save order object for Confirmation screen
    const orderRecord: Order = {
      orderRef,
      createdAt,
      customer,
      items: [...items],
      subtotal,
      deliveryFee,
      discount,
      total,
      couponCode: couponCode || undefined,
      status: 'PENDING_CONFIRMATION',
    };

    try {
      sessionStorage.setItem('wnk_last_order', JSON.stringify(orderRecord));
    } catch {
      // storage unavailable
    }

    // 5. Build WhatsApp URL and open
    const whatsappUrl = `https://wa.me/919284247387?text=${encodeURIComponent(orderMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // 6. Clear cart and navigate to confirmation
    clearCart();
    navigate('/confirmation', { state: { order: orderRecord } });
  };

  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Checkout Page Header */}
      <section className="border-b border-line py-10 lg:py-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted">
              CHECKOUT
            </span>
            <span className="text-muted text-[11px]">•</span>
            <span className="font-mono text-[11px] text-ink uppercase">WHATSAPP DIRECT ORDER</span>
          </div>
          <h1 className="font-sans font-medium text-[36px] sm:text-[46px] text-ink tracking-tight">
            Delivery Details & Order Request<span className="text-red">.</span>
          </h1>
        </div>
      </section>

      {/* Main Grid: Left 7 cols (Form), Right 5 cols (Order Summary) */}
      <section className="py-10 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[57.6px]">
          {/* Important Gateway Notice */}
          <div className="p-4 sm:p-5 bg-surface border-l-4 border-l-ink border border-line mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase font-semibold text-ink tracking-wider flex items-center gap-2">
                <span className="size-2 bg-amber-500 rounded-full inline-block" />
                <span>DIRECT STUDIO WHATSAPP ORDERING ACTIVE</span>
              </div>
              <p className="font-sans text-[13px] sm:text-[14px] text-secondary">
                To guarantee 100% chassis fitment, orders are reviewed directly by our Pune engineering studio before payment. Clicking <strong>Place Order via WhatsApp</strong> connects you immediately with our team.
              </p>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-muted uppercase">
              STUDIO DESK: +91 92842 47387
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Customer & Shipping Details Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handlePlaceOrder} className="space-y-8" noValidate>
                {/* 1. Contact Information */}
                <div>
                  <h2 className="font-mono text-[12px] uppercase tracking-[0.4px] text-ink font-semibold pb-3 border-b border-line mb-4">
                    1. CONTACT INFORMATION
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Vikram Malhotra"
                        className={`w-full bg-paper border ${
                          errors.fullName ? 'border-red' : 'border-line'
                        } px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                      />
                      {errors.fullName && (
                        <p className="font-sans text-[12px] text-red mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                          WhatsApp Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={customer.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 9876543210"
                          className={`w-full bg-paper border ${
                            errors.phone ? 'border-red' : 'border-line'
                          } px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                        />
                        {errors.phone ? (
                          <p className="font-sans text-[12px] text-red mt-1">{errors.phone}</p>
                        ) : (
                          <p className="font-mono text-[10px] text-muted mt-1">
                            We will send your order confirmation here
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={customer.email}
                          onChange={handleInputChange}
                          placeholder="vikram@example.com"
                          className={`w-full bg-paper border ${
                            errors.email ? 'border-red' : 'border-line'
                          } px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                        />
                        {errors.email && (
                          <p className="font-sans text-[12px] text-red mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div>
                  <h2 className="font-mono text-[12px] uppercase tracking-[0.4px] text-ink font-semibold pb-3 border-b border-line mb-4">
                    2. SHIPPING ADDRESS (NATIONWIDE DELIVERY)
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                        Address Line 1 (Flat / House No., Building Name, Street) *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={customer.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Flat 301, Silver Oak Residences, Senapati Bapat Road"
                        className={`w-full bg-paper border ${
                          errors.addressLine1 ? 'border-red' : 'border-line'
                        } px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                      />
                      {errors.addressLine1 && (
                        <p className="font-sans text-[12px] text-red mt-1">{errors.addressLine1}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                        Address Line 2 (Area, Landmark - Optional)
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={customer.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Near Symbiosis Institute"
                        className="w-full bg-paper border border-line px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={customer.city}
                          onChange={handleInputChange}
                          placeholder="Pune"
                          className={`w-full bg-paper border ${
                            errors.city ? 'border-red' : 'border-line'
                          } px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                        />
                        {errors.city && (
                          <p className="font-sans text-[12px] text-red mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={customer.state}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                          className={`w-full bg-paper border ${
                            errors.state ? 'border-red' : 'border-line'
                          } px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                        />
                        {errors.state && (
                          <p className="font-sans text-[12px] text-red mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={customer.pincode}
                          onChange={handleInputChange}
                          placeholder="411016"
                          maxLength={6}
                          className={`w-full bg-paper border ${
                            errors.pincode ? 'border-red' : 'border-line'
                          } px-3.5 py-2.5 font-mono text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60`}
                        />
                        {errors.pincode && (
                          <p className="font-sans text-[12px] text-red mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase text-muted mb-1.5">
                        Delivery Notes / Specific Instructions (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={customer.notes}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="e.g. Please call before delivery, or specify aftermarket spoiler/exhaust modifications..."
                        className="w-full bg-paper border border-line px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-ink rounded-none placeholder:text-muted/60"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Review & Submit Button */}
                <div className="pt-4 border-t border-line">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full py-4 text-[15px] flex items-center justify-center gap-2"
                  >
                    <span>Place Order Request via WhatsApp</span>
                    <span className="font-mono text-[14px]">↗</span>
                  </Button>

                  <p className="font-mono text-[11px] text-muted text-center mt-3">
                    By submitting, your order details are securely formatted and sent to WNK WhatsApp Desk. No online payment charged now.
                  </p>
                </div>
              </form>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="border border-line p-6 sm:p-8 bg-paper sticky top-28 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.4px] text-ink font-semibold">
                    YOUR ORDER ({items.length})
                  </h3>
                  <Link to="/cart" className="font-mono text-[11px] uppercase text-muted hover:text-ink underline">
                    Edit Cart
                  </Link>
                </div>

                {/* Items preview list */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 divide-y divide-surface-2">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3.5">
                      <img
                        src={item.image}
                        alt=""
                        className="size-16 object-cover bg-surface border border-line shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-sans font-medium text-[14px] text-ink truncate">
                          {item.name}
                        </div>
                        <div className="font-mono text-[11px] text-muted truncate">
                          {item.vehicleMake} {item.vehicleModel} ({item.vehicleYear})
                        </div>
                        <div className="font-mono text-[10px] text-secondary mt-1">
                          {item.colour} • {item.finish} • {item.coverage}
                        </div>
                        <div className="flex items-center justify-between mt-1.5 font-mono text-[12px]">
                          <span className="text-muted">Qty: {item.quantity}</span>
                          <span className="text-ink font-sans font-medium">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Totals */}
                <div className="pt-4 border-t border-line space-y-2.5 font-sans text-[14px]">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span className="font-mono text-ink">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">− ₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-secondary">
                    <span>Nationwide Shipping</span>
                    <span className="font-mono text-ink text-[12px] uppercase font-medium">FREE</span>
                  </div>

                  <div className="pt-3 border-t border-line flex items-baseline justify-between">
                    <div>
                      <span className="font-sans font-medium text-[16px] text-ink block">
                        Total Amount
                      </span>
                      <span className="font-mono text-[9px] text-muted">
                        GST INCLUDED / PENDING CONFIRMATION
                      </span>
                    </div>
                    <span className="font-sans font-medium text-[24px] text-ink">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Verification Process Card */}
                <div className="p-4 bg-surface border border-line space-y-2">
                  <div className="font-mono text-[10px] uppercase font-semibold text-ink">
                    WHAT HAPPENS NEXT?
                  </div>
                  <ol className="font-sans text-[12px] text-secondary space-y-1.5 list-decimal pl-4">
                    <li>WhatsApp opens with your pre-filled order request.</li>
                    <li>WNK studio specialist verifies chassis panel dimensions.</li>
                    <li>You receive UPI / QR payment instructions to confirm order.</li>
                    <li>Precision printing & dispatch within 2-3 business days.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

