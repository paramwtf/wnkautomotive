# Page and Frame Inventory

## Figma pages

| Page | ID | Observed purpose |
|---|---:|---|
| 01 / Foundations & references | `0:1` | Palette/type foundation, header/footer/button/select/search/filter/accordion/vehicle-finder reference studies. |
| 02 / Component library | `188:15` | Reusable site components grouped into icon, action/type, form, navigation, catalogue, cart/checkout, content/support, and policy/home sections. |
| 03 / WNK Site | `2029:907` | Storefront canvases, responsive route states, component reviews, overlays/drawers, vehicle finder, and hero/image archives. |

## Numbered storefront screen inventory

Every numbered screen label below has Desktop (1440×900), Tablet (960×1024), and Mobile (390×844) variants, unless noted. This yields 99 screen labels × 3 viewport frames = 297 numbered responsive route frames. Additional standalone component and overlay studies are listed afterward.

| Section | Screen labels |
|---|---|
| 01 | Home |
| 02 — Shop/catalogue (36) | Shop: all wraps; cars; bikes; series; abstract; theme-based; decals/empty; search results; no results; price sort; vehicle matched. Catalogue expansion: Page 2; last; filtered; empty; loading; cars/Page 2; cars/last; bikes/Page 2; bikes/last. Price high to low; price range/Bikes; price range/Cars; price range/Empty. Product type and vehicle combinations: Full/All; Partial/All; Decals/All; Full/Cars; Partial/Cars; Decals/Cars; Full/Bikes; Pre-cut/Bikes; Decals/Bikes; Full/Virtus; Partial/Virtus; Decals/Virtus. |
| 03 — Product/configuration (15) | Product: swoosh/incomplete, configured, added; nightshade/incomplete, configured, added; terrain/incomplete, configured, added; rim stripe decal set/incomplete, configured, added. Catalogue expansion: unavailable; mismatch; missing. |
| 04 | Showcase; Showcase/swoosh; Showcase/nightshade; Showcase/terrain |
| 05 | Custom wrap/empty; filled; callback; attached; error; success |
| 06 | Help & Contact/FAQs closed; FAQ expanded; Support form/filled; callback; attached; error; success; Contact |
| 07 | About WNK |
| 09 | Policies/shipping; returns; privacy; terms; custom wraps; installation care warranty |
| 10 | Cart/empty; one; two; mixed |
| 11 | Checkout/details/empty; details/filled; details/error; details/quantity two; UPI/quantity 1; card/quantity 1; UPI/quantity 2; card/quantity 2; Mixed cart — details/empty; details/filled; details/error; UPI/two products; card/two products |
| 12 | Confirmation/quantity one; quantity two; Mixed cart — two products |
| 13 | Page not found; Loading state |

There is no numbered section 08 in the inspected numbered route-frame set. The design file does include unnumbered showcase/review/process content and standalone references. Whether section 08 was intentionally omitted is a business/design clarification.

## Responsive and overlay frames beyond the route matrix

- Search overlay: Desktop, Tablet, Mobile; empty, several sample query/result states (swoosh, nightshade, terrain), and no-results state.
- Catalogue filter drawers: Tablet and Mobile; default, selected, Full, Partial, and Decals variants.
- Price filter drawers: Tablet and Mobile; Bikes, Cars, Empty states.
- Shop search panel: Desktop/Tablet/Mobile; empty and query-entered states.
- Home hero: curved vehicle gallery and alternate/archived motion explorations; desktop/tablet/mobile references.
- Vehicle finder: Desktop/Tablet/Mobile plus a reference demo with idle, make/model/year/variant selections, and completed vehicle paths.
- Header, mobile menu, cookie consent/preferences, select option lists, and wheel-size/bike-coverage controls have separate component-state canvases.

## Anchor frame IDs inspected

| Experience | Example frame IDs |
|---|---|
| Home Desktop / Mobile | `2030:907` / `2030:1033` |
| Shop all wraps Desktop / Mobile | `2030:908` / `2030:1034` |
| Product swoosh incomplete Desktop | `2030:919` |
| Rim stripe incomplete Mobile | `2269:64643` |
| Custom-wrap success Desktop | `2030:937` |
| Cart empty Desktop | `2030:954` |
| Checkout UPI Desktop | `2030:962` |
| Confirmation Desktop | `2030:966` |
| 404 Desktop / loading Desktop | `2030:968` / `2030:969` |

## Audit access note

The raw full-page XML for the 451-object WNK Site canvas exceeded the Figma MCP response-size limit. Page metadata and targeted Plugin API queries succeeded; the inventory above is based on the enumerated top-level frame names, not a claim that every nested layer or every route screenshot was individually inspected. No inaccessible page or named section was encountered. Source assets were identified in design-context responses but were not all downloaded/exported.
