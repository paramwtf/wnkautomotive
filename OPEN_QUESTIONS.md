# Open Questions for Business Approval

The Figma file supplies a detailed visual prototype, but several values are explicitly sample or demo-only. These answers are needed before production implementation can be considered complete.

## Catalogue, fitment, and products

1. Which product categories and product types are in the initial launch: full wraps, partial wraps, pre-cut kits, decals, rim stripes, accessories, or others?
2. What is the source of truth for SKU/design copy, photos, availability, price, tax, and product status? Who maintains it?
3. Which vehicle makes/models/years/variants are supported at launch? The Figma examples are sample data and must not be treated as the approved fitment catalogue.
4. What does “vehicle matched,” “mismatch,” “unavailable,” and “missing” mean operationally? Should unsupported vehicles be blocked, shown with a warning, or routed to a custom request?
5. Which configurator fields apply to each product type, which are mandatory, and what are the valid values and compatibility rules (including wheel diameter, finish, colour, wrap coverage)?
6. Are displayed prices final, tax-inclusive, quantity-based, or option-dependent? The screens mark prices as samples awaiting approval.
7. What are inventory and made-to-order rules, lead times, and reservation behavior?

## Search and shopping behavior

8. Which filters/sorts are approved, and how do filters combine? Is result pagination/infinite loading expected, and should query/filter state persist in URLs?
9. Should guests have persistent carts across devices/sessions? Is login/account creation in scope, or is the launch guest-only?
10. Are wishlist, coupon/discount, recommendations, or saved vehicle features in scope? A coupon component is visible, but no applied/invalid behavior is established.

## Checkout, shipping, and Razorpay

11. Confirm launch payment methods through Razorpay: UPI and cards are shown; are netbanking, wallets, EMI, or Cash on Delivery supported?
12. What is the intended payment/order lifecycle: authorize vs capture, when the order is accepted, what customer sees for pending/failure/cancel/retry, and how duplicate submissions are handled?
13. Which Razorpay webhooks and reconciliation process will be configured? Who owns credentials, account configuration, refunds, chargebacks, and support escalation?
14. What delivery fee, free-shipping threshold, serviceable PIN codes, estimates, carrier/tracking integration, and address validation apply?
15. What are cancellation, returns, exchanges, refunds, and custom-product exception rules? The policy pages require approved copy.
16. What is the production confirmation content/order reference and how are receipts/invoices delivered? Current confirmation explicitly says no payment was made.

## Custom work, support, and content

17. Where should custom-wrap/support requests and attachments go? What file types/size limits, retention, notification recipients, callback hours, quote turnaround, and consent text apply? Current success is a non-submitting demo.
18. Approve FAQ, contact channels, shipping/returns/privacy/terms/custom-wrap/installation-care-warranty copy and accountable owners.
19. Are the review/testimonial examples placeholders only? Provide approved review text, customer consent, attribution and vehicle details before launch.
20. What content-management process is required for showcase stories, policies, banners, hero artwork, and FAQs?

## Platform and launch

21. Which domain, hosting environments/regions, CDN/object storage, email/SMS provider, analytics and consent tooling will be used?
22. Confirm privacy, data-retention, accessibility, localization, GST invoice, and operational/security requirements for the Indian launch.
23. Confirm admin/catalogue operations: who can manage products, fitment data, orders, payment reconciliation, support requests, and policy content?
24. The numbered route inventory moves from section 07 to 09. Is section 08 intentionally absent, or is there a missing page family?
25. Confirm the required breakpoint behavior between the provided Desktop 1440, Tablet 960, and Mobile 390 canvases.

## Approval gate

Please review these six Phase 1 documents and resolve the launch-critical questions—especially product/fitment data, approved prices/tax/shipping, payment modes and order lifecycle, and form submission handling—before implementation starts. The next step is implementation only after your approval.
