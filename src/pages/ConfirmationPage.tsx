import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Order } from '../types';
import { Button } from '../components/common/Button';

export const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Retrieve order from route state or sessionStorage
  let order: Order | null = (location.state as { order?: Order })?.order || null;

  if (!order) {
    try {
      const saved = sessionStorage.getItem('wnk_last_order');
      if (saved) {
        order = JSON.parse(saved);
      }
    } catch {
      order = null;
    }
  }

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  const handleCopyRef = () => {
    navigator.clipboard.writeText(order!.orderRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reOpenWhatsApp = () => {
    if (!order) return;
    const itemsFormatted = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${(
            item.unitPrice * item.quantity
          ).toLocaleString('en-IN')}`
      )
      .join('\n');

    const msg = `*ORDER REQUEST INQUIRY — WNK AUTOMOTIVE*
Order Ref: ${order.orderRef}
Customer: ${order.customer.fullName}
Phone: ${order.customer.phone}

*Items:*
${itemsFormatted}

*Total:* ₹${order.total.toLocaleString('en-IN')}

_Checking status of my order request._`;

    window.open(`https://wa.me/919284247387?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full bg-paper min-h-screen py-12 lg:py-20">
      <div className="max-w-[960px] mx-auto px-5 sm:px-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-surface border border-line mb-6">
          <span className="size-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
            ORDER REQUEST PENDING CONFIRMATION
          </span>
        </div>

        {/* Title */}
        <h1 className="font-sans font-medium text-[36px] sm:text-[48px] text-ink tracking-tight mb-4 leading-tight">
          Thank you. Your order request has been received<span className="text-red">.</span>
        </h1>

        <p className="font-sans text-[16px] text-secondary leading-relaxed mb-8 max-w-2xl">
          We have registered your wrap kit configuration. Because our liveries are precision-engineered to vehicle panels, our studio specialists in Pune will verify your model specifications before finalizing payment.
        </p>

        {/* Order Reference Card */}
        <div className="border border-line p-6 sm:p-8 bg-surface mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
              UNIQUE ORDER REFERENCE
            </span>
            <div className="font-mono text-[24px] sm:text-[28px] font-semibold text-ink tracking-wide">
              {order.orderRef}
            </div>
            <span className="font-mono text-[11px] text-muted block mt-1">
              Generated: {order.createdAt}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyRef}
              className="px-4 py-2.5 border border-line bg-paper font-mono text-[12px] uppercase text-ink hover:border-ink transition-colors"
            >
              {copied ? '✓ Copied Reference' : 'Copy Reference'}
            </button>
            <button
              onClick={reOpenWhatsApp}
              className="px-5 py-2.5 bg-ink text-white font-mono text-[12px] uppercase hover:bg-charcoal transition-colors flex items-center gap-2"
            >
              <span>Open WhatsApp Desk</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Next Steps Guide */}
        <div className="border border-line p-6 sm:p-8 bg-paper mb-10 space-y-4">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.4px] text-ink font-semibold">
            WHAT TO EXPECT NEXT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5">
              <span className="font-mono text-[13px] text-muted font-bold">01 / FITMENT VERIFICATION</span>
              <p className="font-sans text-[13px] text-secondary">
                Our design desk reviews your vehicle make, model, year, and variant to verify panel geometry.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[13px] text-muted font-bold">02 / PAYMENT INSTRUCTIONS</span>
              <p className="font-sans text-[13px] text-secondary">
                We confirm the order total on WhatsApp (+91 92842 47387) and provide official UPI / bank transfer details.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[13px] text-muted font-bold">03 / TUBE DISPATCH</span>
              <p className="font-sans text-[13px] text-secondary">
                Your kit is precision-cut, packaged in heavy-duty cylindrical mailing tubes, and dispatched with courier tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="border border-line p-6 sm:p-8 bg-paper mb-10 space-y-6">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.4px] text-ink font-semibold pb-3 border-b border-line">
            ORDER SPECIFICATIONS
          </h2>

          <div className="divide-y divide-surface-2">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="size-16 object-cover bg-surface border border-line shrink-0"
                  />
                  <div>
                    <h3 className="font-sans font-medium text-[15px] text-ink">{item.name}</h3>
                    <div className="font-mono text-[11px] text-muted mt-0.5">
                      {item.vehicleMake} {item.vehicleModel} ({item.vehicleYear}) {item.vehicleVariant && `• ${item.vehicleVariant}`}
                    </div>
                    <div className="font-mono text-[11px] text-secondary mt-1">
                      Color: {item.colour} | Finish: {item.finish} | Coverage: {item.coverage}
                      {item.wheelSize && ` | Rim: ${item.wheelSize}`}
                    </div>
                  </div>
                </div>

                <div className="text-right sm:self-center font-mono text-[13px]">
                  <span className="text-muted block text-[11px]">Qty {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}</span>
                  <span className="text-ink font-medium text-[15px]">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-line space-y-2 font-sans text-[14px]">
            <div className="flex justify-between text-secondary">
              <span>Subtotal</span>
              <span className="font-mono text-ink">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount ({order.couponCode})</span>
                <span className="font-mono">− ₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-secondary">
              <span>Nationwide Shipping</span>
              <span className="font-mono text-ink text-[12px] uppercase font-medium">FREE</span>
            </div>
            <div className="pt-3 border-t border-line flex justify-between items-baseline">
              <span className="font-medium text-[16px] text-ink">Total Amount Pending Confirmation</span>
              <span className="font-medium text-[22px] text-ink font-sans">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div className="pt-4 border-t border-line">
            <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
              DISPATCH ADDRESS
            </span>
            <div className="font-sans text-[14px] text-ink">
              <div className="font-medium">{order.customer.fullName}</div>
              <div className="text-secondary">{order.customer.phone} • {order.customer.email}</div>
              <div className="text-secondary mt-1">
                {order.customer.addressLine1}
                {order.customer.addressLine2 && `, ${order.customer.addressLine2}`}
                <br />
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </div>
              {order.customer.notes && (
                <div className="text-muted text-[12px] mt-2 italic">
                  Note: "{order.customer.notes}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/shop">
            <Button variant="secondary" size="md">
              ← Return to Catalogue
            </Button>
          </Link>
          <a
            href="https://wa.me/919284247387"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase text-ink hover:underline"
          >
            <span>Need Help? Chat with Studio Support</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

