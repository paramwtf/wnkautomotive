# Customer Journey and User Flows

All flows below are reconstructed from the named screens, visible components, and Figma component descriptions. They describe the intended design journey; they do not prove connected production behavior.

## 1. Discover and browse

Home → Explore the shop → browse All wraps, Cars, Bikes, Series, Abstract, Theme-based designs, or Decals. The responsive header provides Shop, Custom Wrap, Showcase, Help & Contact, search, and cart navigation. The home page also provides a custom-wrap entry point and a vehicle gallery/review/process content.

## 2. Find a product

Shop → optionally search → optionally choose vehicle (Make → Model → Year → Variant), category/product type, price range, or sort order → review matching product cards → open a product. Drawn states cover query empty/populated/no results; filter drawer default/selected; category and price ranges; vehicle matched; result expansion/page 2/last; loading/empty; and unavailable, mismatch, or missing catalogue cases.

Mobile and tablet use dedicated filter drawers and compact catalogue cards. The precise URL/query persistence, filter-combination semantics, pagination behavior, and result update timing are not specified.

## 3. Configure a wrap or decal

Product → choose required options for fitment/configuration → view configured state and price → Add to cart → added state. Example car-wrap configuration includes model year and variant, colour, finish, and wrap type. The decal flow includes wheel size (17 or 19 inches). Product states explicitly include incomplete, configured, and added; error/disabled selector states are also represented in the component library.

Do not infer which options are required for every SKU, compatibility rules, live stock behavior, or whether price changes by option from the visuals alone.

## 4. Review cart

Cart → empty cart may return to shop; populated cart can contain one item, two items, or a mixed cart → adjust quantity/remove items as represented → review subtotal, delivery, and total → continue to guest checkout. Header badge count is specified in component guidance as total item quantity.

## 5. Guest checkout and payment

Checkout details → enter contact and delivery information → validation-error and filled states → select UPI or card → review order summary → proceed to confirmation. Steps are labeled Details, Payment, Confirmation. Mixed cart variants are also designed.

Checkout designs are prototypes: prices are marked sample/awaiting approval and confirmation says no payment was made. No actual payment provider flow, payment-failure state, webhook, or order creation behavior is established by these screens.

## 6. Custom-wrap request

Custom Wrap → provide vehicle/idea/artwork details → optionally attach artwork or request a callback → submit → see validation error or success/request preview. The visible success screen explicitly says no details/attachments have been uploaded or emailed, so production submission, storage, notifications, and response commitments require confirmation.

## 7. Help and trust content

Help & Contact → view FAQ closed/open states, submit support form (filled/callback/attached/error/success), or open Contact. Footer/policy links cover shipping, returns, privacy, terms, custom wraps, and installation/care/warranty. The content exists in design, but policy wording and operational commitments need business/legal approval.

## 8. Exceptional screens

- Loading: skeleton product cards and a back-to-shop action.
- Empty/no-results: catalogue and cart-specific empty cases.
- Product data: unavailable, mismatch, and missing-image cases.
- Form errors and success confirmation: custom-wrap and support flows.
- Page not found: 404 layout with back-to-shop action.

## Journey gaps

The screens do not establish account creation/sign-in, saved vehicles, wishlist, coupon application behavior, address validation/PIN-code service, delivery estimates, COD, payment failure/cancel/retry, order tracking for a real order, cancellation/refund, inventory reservation, or post-purchase support SLA. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).
