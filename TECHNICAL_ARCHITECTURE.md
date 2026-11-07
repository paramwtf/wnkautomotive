# Technical Architecture — Phase 1 Proposal

## Confirmed project direction

The project owner supplied this target stack: Next.js + TypeScript + Tailwind CSS; Node.js + Express + TypeScript; PostgreSQL + Prisma; Razorpay. Figma informs the experience and component domains, not API shapes or schema. This is a boundary proposal to review before implementation, not a locked architecture.

## Proposed runtime boundaries

| Layer | Responsibility proposal | Decisions still open |
|---|---|---|
| Next.js storefront | Responsive pages, server-rendered catalogue/product content where appropriate, interactive search/filters/configurator/cart/checkout UI, accessibility, SEO metadata. | App Router vs Pages Router, rendering/cache strategy, hosting, CMS/admin needs. |
| Express API | Trusted business operations: catalogue/fitment lookup, cart validation, order/checkout orchestration, payment order creation and verification, webhook handling, custom-wrap/support request intake. | API versioning, auth/session approach, API deployment and ownership, exact endpoints/SLAs. |
| PostgreSQL + Prisma | Durable product/fitment/configuration, customer/order, payment-event, content, and request data as approved by business. | Source of truth, product variants, inventory model, guest PII retention, migrations/backups. |
| Razorpay | Payment provider, initialized and verified through server-side payment flow. | UPI/card/COD and other modes, capture/authorization behavior, refund handling, webhook events, reconciliation, test/live rollout. |
| Asset storage/CDN | Locally managed/exported design assets and production-managed catalogue media. | Storage provider, image processing, rights/retention and upload limits. |

## Design-derived domain areas (not schemas)

1. Catalogue designs and media, product type/category/series.
2. Vehicle fitment hierarchy: make, model, year, variant; bike/car distinctions.
3. Product option/compatibility groups: colour, finish, wrap coverage/type, wheel size.
4. Cart lines and selected configuration; quantity and price snapshot.
5. Checkout contact/delivery details; order lines and totals.
6. Payment attempts/events and provider references.
7. Custom-wrap and support requests with optional attachment metadata and callback preference.
8. Policy/help/showcase/review content.

These are candidate concepts implied by the designs, not a recommendation to build each as a separate table or service. Canonical source data, ownership, and relationships require business input.

## Trust boundary recommendation

For a production Razorpay checkout, treat the browser as untrusted: calculate/validate payable totals on the server, create provider orders server-side, verify payment signatures server-side, process provider webhooks idempotently, and only then mark order/payment state authoritative. Never rely on a client success callback alone. Exact Razorpay integration behavior and callback/event configuration must be confirmed against the selected account and current provider requirements during implementation.

## Data and security decisions before implementation

- Decide guest-only vs customer accounts, session/cart persistence and expiry.
- Define authoritative catalogue/fitment/product option data and who maintains it.
- Approve actual pricing, tax display, delivery fee/eligibility, discount and refund rules.
- Define personal-data minimization, access, encryption, retention/deletion, consent and operational access for Indian customers.
- Define validation and abuse controls for forms/uploads; storage, file types/sizes, malware scanning, retention and notification routing.
- Define order identifiers, status lifecycle, inventory reservation policy, duplicate-submit/idempotency strategy, and reconciliation/reporting.
- Define supported browsers, accessibility level, performance targets, monitoring and incident ownership.

## Integration plan after approval

1. Turn approved catalogue, fitment and pricing rules into stable domain contracts.
2. Define API and state lifecycle for browse, product configuration, cart, guest details, Razorpay payment, order confirmation, and support requests.
3. Model and review PostgreSQL/Prisma schema and data retention before migration creation.
4. Implement Figma-aligned responsive UI from exported, licensed assets and reusable component inventory.
5. Integrate Razorpay only after account modes, test credentials, server verification, webhooks, retries/refunds, and reconciliation rules are approved.

No application code or tests were created in Phase 1.
