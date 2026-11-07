# Component Inventory

## Foundations and reusable design language

- Colors, typography styles, spacing scale, layout margins, border study.
- Logo (black/white), header/navigation, footer, navigation active/hover states, cart icon.
- Buttons (primary/secondary, default/hover/focused/disabled); icon buttons; text links; badge; divider; eyebrow; page title.
- Search field, search panel, filter pill/chip, result count, sort control.
- FAQ toggle and accordion open/closed.

## Component-library page groups

| Group | Components observed |
|---|---|
| Icons | Arrow, chevron, search, close, menu, plus, minus, check, cart, attachment, remove. |
| Actions & typography | Button, icon button, text link, badge, divider, eyebrow, page title. |
| Form controls | Text field, textarea, select, checkbox, radio, segmented option, field message, search field, file item, upload zone, callback group. |
| Navigation | Logo, nav link, header, mobile menu, search panel, breadcrumb item, checkout step, checkout stepper, footer. |
| Catalogue/configuration | Category tab, filter chip, result count, vehicle filters, sort control, product media, product card, product gallery, no-results state, vehicle fitment, colour/finish/coverage groups, price block, product configurator, wrap-type filter. |
| Cart & checkout | Quantity stepper, cart item, summary row, order summary, cart pattern, guest form, delivery details, payment option, payment methods, confirmation, tracking step, demo tracking, request confirmation. |
| Content/support | Showcase card, story metadata/block, FAQ row, notice, support form, custom-wrap form, process step, about block, policy section, empty state, home split hero, custom banner, FAQ section. |

## Important components and observed intent

- **Header/cart:** shared responsive navigation with active-page variants and mobile hamburger. Figma description says cart is a 44×44 control; quantity badge is hidden at zero and counts total item quantity; accessible label includes item count.
- **Product card:** vehicle-first; collection/design name, vehicle fitment, price, availability, media/type badge, and View design action. Component description says the full card navigates to the product. Compact form is intended for mobile.
- **Vehicle finder:** dependent Make → Model → Year → Variant selectors. Desktop/tablet/mobile compositions and many states are drawn. Reference demo contains sample Volkswagen Virtus, Kawasaki Ninja 300, and Mahindra Thar paths; these are not confirmed live catalogue data.
- **Product configurator:** design and product screens represent vehicle year/variant, colour, finish, and wrap type/coverage. Rim stripe decal flow adds 17-inch/19-inch wheel-size selection. Select states include placeholder, selected, open, focus, error, and disabled.
- **Catalogue filtering:** car/bike and wrap-type categories include Full, Partial, Pre-cut and Decals in particular frames. Search, sort, vehicle fitment, and price range states are present. Exact allowed values and filtering logic remain unapproved.
- **Cart/checkout:** item quantity, remove, order summary, guest contact/delivery form, UPI/card selection, confirmation and mixed-cart scenarios are represented.
- **Forms:** file attachment, callback request, validation error, and success states appear in support/custom-wrap flows. The custom-wrap success design explicitly says the displayed request preview has not actually been sent or uploaded.
- **Motion/content:** hero gallery description calls for pause on hover, stop while out of view, and respect reduced-motion preference. Home review carousel description calls for loop, five-second auto-advance, arrows, drag, and pause/play; review data is placeholder.

## Component state coverage

Explicit states include button default/hover/focused/disabled; nav default/hover/active; cart default/filled; accordion open/closed; select placeholder/selected/open/focused/error/disabled and option default/hover/selected/disabled; product available/unavailable/missing image and incomplete/configured/added product pages; filter default/selected; cart empty/one/two/mixed; checkout empty/filled/error, UPI/card, quantity variants; forms empty/filled/callback/attached/error/success; 404 and loading.

## Asset and export notes

- The context responses contain Figma-hosted temporary URLs for PNG/JPG-like placed images and SVG icons/logos. Figma describes downloadable assets as: whole-node render, original source images in a node subtree (capped at 20), and SVG exports for vector layers (capped at 20).
- Use original image assets for photography/product and vehicle art; use SVG for logos/icons/simple vector artwork where available. Preserve transparency and intrinsic proportions, and inspect each export for its intended slot. A node export is useful as a visual reference, not a substitute for the individual production assets.
- Temporary asset URLs expire (context notes a seven-day availability window). During implementation, export required assets promptly through the Figma asset workflow and store them locally; do not hard-code temporary Figma URLs as runtime sources.
- The audit did not bulk-export or verify all asset names, licensing/usage rights, formats, resolutions, or variants. Those remain an implementation asset handoff task.
