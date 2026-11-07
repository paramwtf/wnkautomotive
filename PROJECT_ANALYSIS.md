# WNK Automotive — Phase 1 Design Audit

## Audit scope and access

- Figma file: [WNK Automotive — Complete Storefront](https://www.figma.com/design/CgP9ixSFm4l8tpM8WShBvT/WNK-Automotive-%E2%80%94-Complete-Storefront?node-id=2029-907)
- Figma MCP access: successful, read-only. Session inspected on 2026-11-05.
- Pages exposed by Figma: `01 / Foundations & references`, `02 / Component library`, `03 / WNK Site`.
- The storefront page contains 451 top-level canvas objects, including 99 numbered screen/state designs, each with Desktop, Tablet, and Mobile versions (297 named responsive route frames). The remaining objects include component studies, screen overlays/drawers, support components, and image/hero archives.
- Inspected representative design-context output and screenshots for Home desktop/mobile, Shop/product/detail variants, rim-stripe mobile, cart, checkout, confirmation, loading, and a custom-wrap success state. The frames are design references, not proof of live behavior or backend requirements.
- No Figma section was inaccessible during the inspected page and node reads. The full raw metadata response for the storefront exceeded the MCP response limit; a targeted Plugin API query was used to enumerate frame names and responsive coverage. This kept structural access usable. Individual linked source-image files were not bulk-exported during this audit.

## Product and experience summary

The visual system presents WNK as a vehicle-wrap and decal storefront. The customer journey represented in the file is:

1. Discover the brand on the home page or browse the shop.
2. Browse catalogue categories and use search, vehicle fitment, product-type, and price filters.
3. Open a product, choose its required fitment/configuration options, and add it to cart.
4. Review an empty, single-item, multi-item, or mixed cart.
5. Continue as a guest, enter delivery/contact details, select a payment method shown as UPI or card, and reach a demo confirmation.
6. Separately, customers can request a custom wrap, attach artwork, request a callback, and see error/success states; support and policy content is also designed.

The design makes vehicle fitment central. The vehicle finder uses dependent Make, Model, Year, and Variant controls. Product configurations add fields such as colour, finish, wrap type/coverage, and—in the rim stripe decal flow—wheel size (17 or 19 inches). Bike coverage choices and wrap-type filtering are also represented.

## Visual language and tokens

- **Typography:** Archivo for display/headings/body; JetBrains Mono for labels, metadata, and technical captions. Named styles include Display (64/70), Heading (36/42), Title (24/30), Body (16/26), Helper (13/20), Label (15/22), and Meta (12/18). Values are Figma style values; responsive screen instances may use different sizes.
- **Palette:** Canvas `#FFFFFF`, ink `#010101`, charcoal `#171717`, surface `#F4F4F4`, muted `#666666`, border `#DEDEDE`, field `#CECECE`, and accent red `#F93030` (visible as punctuation/accent in the storefront). The foundations page also shows legacy/review labels such as `#F4F4F2` and `#454545`; confirm canonical token mapping before implementation.
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96 px. Foundation notes show 56 px desktop page margins at 1440 and 20 px mobile margins at 390.
- **Shape and rules:** white/near-black surfaces, thin gray dividers/borders, sharp corners, restrained surfaces, editorial whitespace.
- **Responsive frame sizes:** Desktop 1440×900, Tablet 960×1024, Mobile 390×844. These are design canvases; breakpoint behavior between them is unspecified.

## Reusable system

The component library includes icons, buttons, fields, selects, checkboxes/radios, navigation, search, filters, product card/gallery, fitment/configurator controls, cart/summary, guest checkout, payment options, confirmation, tracking, FAQ/support/custom-wrap forms, notices, content blocks, and empty states. See [COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md).

Documented interaction guidance includes accessible cart naming and quantity badge behavior, whole-card navigation, vehicle-first product cards, a looping/pauseable home review carousel, and a hero carousel that pauses on hover, stops off-screen, and honors reduced-motion preferences. These are Figma component descriptions, not verified shipped behavior.

## Production-readiness observations

- Product and checkout screens repeatedly state `SAMPLE PRICE · TAX INCLUDED` and/or `SAMPLE PRICES / AWAITING WNK APPROVAL`.
- Confirmation screens explicitly state `DEMO ORDER CONFIRMATION / NO PAYMENT MADE` and say that no payment was collected.
- Custom-wrap success content says the request is a demo and that no details or attachments have been uploaded or emailed.
- Home reviews are documented as placeholders requiring approved customer feedback.
- Vehicle examples and product configuration values are present in design context, but they are not confirmed production catalogue or fitment data.
- Figma shows UPI and card choices. It does not define Razorpay wiring, payment lifecycle, settlement, refunds, retries, webhooks, or which other payment modes are allowed.

## Technical direction (requested)

Target stack supplied by the project owner: Next.js + TypeScript + Tailwind CSS; Node.js + Express + TypeScript; PostgreSQL + Prisma; Razorpay. This document records the intended stack only. No application code, API contract, database schema, or business rules were inferred from appearance. See [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) for a proposed responsibility boundary and decisions needed before implementation.

## Phase 1 outcome

Figma is accessible and sufficiently structured for an implementation plan after business clarifications. Do not treat sample content or demo states as approved production data. The six requested audit artifacts are the complete Phase 1 deliverable. Implementation is a separate phase and awaits owner approval.
