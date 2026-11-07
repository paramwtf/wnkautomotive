# WNK Automotive — Production Storefront

Official production storefront for **WNK Automotive** ([wnkautomotive.com](https://wnkautomotive.com)), a precision-engineered automotive and motorcycle livery studio based in Pune, India.

Built directly from the master Figma design system:
- **Figma File:** [WNK Automotive Master Design](https://www.figma.com/design/CgP9ixSFm4l8tpM8WShBvT/WNK-Automotive?node-id=2047-18105)
- **Design Aesthetic:** Swiss Editorial / Technical Monochrome
- **Core Visual Tokens:** Sharp `0px` radius (`rounded-none`), `#010101` Ink, `#FFFFFF` Paper, `#F4F4F2` Surface, `#F93030` Red Accent Dot (`.`), and strict grid discipline.
- **Typography:** `Archivo` (Headings & Body) paired with `JetBrains Mono` (Metadata, Specs, Currency & Tags).

---

## 🚀 Technology Stack

- **Framework:** React 18 + TypeScript + Vite
- **Routing:** React Router v6 (SPA with `ScrollToTop` restoration and Vercel rewrite configuration)
- **Styling:** Tailwind CSS with custom design tokens (`tailwind.config.js`)
- **State Management:**
  - `CartContext`: LocalStorage-persisted cart state with quantity steppers, item configuration hashes, and promo code engine (`WNK10`, `WNK20`, `LAUNCH10`).
  - `VehicleFilterContext`: Global garage selection (`Make` → `Model` → `Year` → `Variant`) linked to catalogue filtering.
- **Asset Pipeline:** Custom vector SVG icons and multi-resolution automotive livery photography.
- **Checkout Engine:** Phase 3 Studio WhatsApp Ordering (`+91 92842 47387`) with real-time specification formatting.

---

## 📁 Repository Structure

```
wnkautomotive/
├── data/
│   ├── product-data-template.csv     # Master CSV schema template (25 columns)
│   └── products.csv                  # Real production catalogue data
├── public/
│   ├── assets/
│   │   ├── icons/                    # Figma SVG vectors (logo, search, cart, arrows, etc.)
│   │   └── images/                   # High-res vehicle photography & livery mockups
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── import-products.mjs           # Automated CSV validation & catalog build script
├── src/
│   ├── components/
│   │   ├── common/                   # WnkLogo, Button, Header, Footer, SearchOverlay, ProductCard, CookieBanner
│   │   ├── home/                     # CurvedHeroGallery, VehicleFinder, ReviewCarousel, ProcessSection
│   │   ├── product/                  # ProductGallery, ProductConfigurator
│   │   └── shop/                     # FilterSidebar, FilterDrawer
│   ├── context/
│   │   ├── CartContext.tsx           # Cart state, item hashing, coupons, persistent storage
│   │   └── VehicleFilterContext.tsx  # Global vehicle filter context
│   ├── data/
│   │   ├── catalog.json              # Compiled JSON catalogue
│   │   ├── faqs.ts                   # Categorized fitment & studio FAQs
│   │   ├── products.ts               # Typed product catalogue with helper lookup methods
│   │   ├── reviews.ts                # Verified enthusiast customer reviews
│   │   ├── showcase.ts               # Feature stories with specifications
│   │   └── vehicles.ts               # Vehicle hierarchical dataset (Makes, Models, Years, Trims)
│   ├── pages/
│   │   ├── HomePage.tsx              # Curved hero, vehicle finder, featured collections, reviews
│   │   ├── ShopPage.tsx              # Catalogue with filters (Type, Make, Finish, Price), search, sorting
│   │   ├── ProductDetailPage.tsx     # PDP with gallery, interactive configurator, fitment badges
│   │   ├── CustomWrapPage.tsx        # Bespoke livery inquiry workflow with WhatsApp trigger
│   │   ├── ShowcasePage.tsx          # Studio feature showcase & gallery
│   │   ├── HelpContactPage.tsx       # FAQ accordion + Studio inquiry form + Pune address/hours
│   │   ├── AboutPage.tsx             # Brand manifesto, 4 craftsmanship pillars, studio timeline
│   │   ├── PolicyPage.tsx            # Dynamic policy directory (Shipping, Returns, Privacy, Terms, Warranty)
│   │   ├── CartPage.tsx              # Line items, quantity steppers, coupons, summary
│   │   ├── CheckoutPage.tsx          # Customer delivery validation & WhatsApp order generator
│   │   ├── ConfirmationPage.tsx      # Order request pending confirmation screen with ref code
│   │   └── NotFoundPage.tsx          # 404 page
│   ├── types/
│   │   └── index.ts                  # CartItem, CustomerDetails, Order, FAQ, Review, Showcase
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vercel.json                       # Vercel SPA routing rewrite configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Product Catalogue Pipeline (Phase 2 & New Assets)

Products are managed in `data/products.csv` using the 25-column schema defined in `data/product-data-template.csv`:

```bash
# Re-run catalogue import script
node scripts/import-products.mjs
```

### Integrated Asset Collections:
1. **Aprilia RS 457:** 7 dedicated products with dual-angle studio renders (`01.png` profile & `02.png` dynamic 3/4) in `public/assets/images/rs457/`:
   - Lightning McQueen 95 Edition
   - Marlboro Racing Heritage Edition
   - Mayhem Neon Edition
   - Monza Blue Trophy Edition
   - Miles Morales Spider-Man Edition
   - Venom Dark Edition
   - Corsa Frost Edition
2. **KTM:** Dedicated products including the KTM 390 Adventure Punisher Tactical Edition in `public/assets/images/ktm/`, plus Duke 390 Corsa Apex, Duke 250 Stealth, and 390 Adventure Rally.
3. **Hero Curved Showcase:** 9 official 3:4 editorial posters in `public/assets/images/hero/` continuously drifting in the interactive animated hero gallery.
4. **Maintainable Asset Configuration:** Managed through [`src/data/productAssets.ts`](src/data/productAssets.ts) and [`data/products.csv`](data/products.csv).


The script:
1. Validates CSV rows against mandatory fields (`id`, `sku`, `title`, `base_price_inr`, `vehicle_type`, `make`, `model`, etc.).
2. Resolves primary images and multi-angle gallery photos in `public/assets/images/`.
3. Parses comma-separated array fields (`color_options`, `finish_options`, `coverage_options`, `kit_contents`).
4. Generates both `src/data/catalog.json` and typed `src/data/products.ts`.

---

## 💬 WhatsApp Checkout Workflow (Phase 3)

Because Razorpay is temporarily disabled, all storefront transactions use our structured **WhatsApp Ordering Engine** connected directly to the studio desk at **`+91 92842 47387`**:

1. **Validation:** Customer inputs Name, WhatsApp Mobile, Email, and 6-digit Indian PIN code delivery address.
2. **Order Reference:** Generates a unique tracking reference (e.g. `WNK-ORD-849201`).
3. **Structured Payload:** Compiles a formatted message including vehicle fitment, colorway, finish, coverage, kit quantities, discount deductions, and delivery address.
4. **URL Dispatch:** Automatically launches `https://wa.me/919284247387?text=...`.
5. **Confirmation View:** Displays order confirmation status explicitly as **`ORDER REQUEST PENDING CONFIRMATION`** (never marked as paid). WNK studio specialists verify panel dimensions and provide UPI transfer instructions.

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm (or pnpm)

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## ☁️ Deployment to Vercel (Phase 4)

This project is pre-configured for seamless zero-configuration deployment to [Vercel](https://vercel.com):

1. **Push to GitHub / GitLab:**
   ```bash
   git add .
   git commit -m "feat: complete WNK automotive production storefront"
   git push origin main
   ```
2. **Import into Vercel:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **SPA Routing:**
   - Pre-configured in `vercel.json` with wildcard rewrites to `/index.html` ensuring all deep links (`/product/:slug`, `/policies/:policyId`, etc.) route properly.

---

## 📜 Studio Contact

- **Studio Address:** WNK Automotive Studio, Uttam Nagar, Bavdhan, Pune, Maharashtra 411021
- **WhatsApp Helpline:** [+91 92842 47387](https://wa.me/919284247387)
- **Studio Email:** wnkautomotive01@gmail.com
- **Instagram:** [@wnkautomotive](https://instagram.com/wnkautomotive)

