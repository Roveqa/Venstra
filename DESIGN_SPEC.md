# Venstra Marketing Homepage — Design Spec

Extracted from Figma `get_design_context` code dump for node `3855:7598` ("Website"), file key `r2dbmly2FCs307sePH1Z9C`. Source dump saved at:
`/Users/yanbogdanov/.claude/projects/-Users-yanbogdanov-test-ds/b04576d4-b486-4b5a-aeb6-212e8cb6a245/tool-results/mcp-claude_ai_Figma-get_design_context-1784133124616.txt`

All values below are copied verbatim from Tailwind-style class names / inline styles in the dump (format: `class-value (resolved var → fallback hex)`). Where a section/value was not found in the dump, it is explicitly marked **not found in dump**.

---

## 0. Global / Root

| Property | Value |
|---|---|
| Root node | `data-node-id="3855:7598"`, `data-name="Website"` |
| Root background | `var(--surface/base/surface-low, #fefefe)` |
| Root layout | `flex flex-col items-start`, `padding-top: 160px` (space reserved for fixed header) |
| Header width (full bleed) | `1710px` (the `<Header>` block is `position: absolute; left:0; top:0; width:1710px`) — this is effectively the design frame / canvas width in Figma, **not necessarily the intended max page width for a responsive build** |
| Font family | `Inter` everywhere (`font-['Inter:Regular']`, `font-['Inter:Medium']`, `font-['Inter:Semi_Bold']`, and via variable `font-family/inter`) |
| Breakpoints | **Not found in dump** — this is a single fixed-width desktop Figma frame; no responsive/mobile variants present in the code dump |

### Effect / shadow styles referenced in dump

| Name | Definition |
|---|---|
| `Shadow/xl` | `drop-shadow(0px 2px 26px rgba(196,196,196,0.2))` — color `#C4C4C433`, offset (0,2), radius 26, spread 0 |
| `Shadow/md` | `drop-shadow(0px 2px 8px rgba(0,0,0,0.04))` — color `#0000000A`, offset (0,2), radius 8, spread 2 |
| `Shadow/sm` | two-layer: `drop-shadow(0px 0px 2px rgba(0,0,0,0.02)) drop-shadow(0px 1px 2px rgba(0,0,0,0.02))` (spread 4 / spread 1) |
| `Focus` | `drop-shadow(0px 0px 0px rgba(10,10,10,0.1))` spread 2 (focus ring style, used on inputs, not on this page) |

### Typography styles referenced in dump (design-system text styles, not all used on this specific page but listed as found)

| Style name | Font | Weight | Size token | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Label/Large-Compact | Inter Medium | 500 | Size/size-md | 1.16 | -1 |
| Title/Medium | Inter Medium | 500 | Size/size-lg | 1.40 | -1 |
| Label/Large | Inter Medium | 500 | Size/size-md | 1.40 | -1 |
| Body/Medium | Inter Regular | 400 | Size/size-md | 1.40 | -1 |
| Label/Large-NoTracking | Inter Medium | 500 | Size/size-md | 1.40 | -1 |
| Body/Medium-Compact | Inter Regular | 400 | Size/size-md | 1.16 | -1 |
| Label/Large-Badge | Inter Regular | 400 | Size/size-md | 1.16 | -2 |
| Body/Medium-Italic | Inter Italic | 400 | Size/size-md | 1.16 | -1 |
| Label/Medium | Inter Medium | 500 | Size/size-sm | 1.16 | -1 |

Note: these are component-library text styles (buttons, labels, badges), not the large marketing headings — the marketing headings below use raw pixel sizes, not these named styles.

---

## 1. Header / Nav bar

- Node: `data-node-id="4092:55898"`, `data-name="Header"`
- Position: `absolute; left:0; top:0; width:1710px`
- Background: `rgba(254,254,254,0.68)` with `backdrop-blur: 40px` (glassmorphism sticky header)
- Padding: `px-[244px] py-[16px]`
- Layout: `flex items-center justify-between`, full width

### Logo
- Text: **"Venstra"**
- Font: `Inter Semi Bold`, size `25.19px`, color `var(--neutral/solid/950, #040404)`, `letter-spacing: -0.7557px`, `line-height: normal (leading-none)`
- Logo mark: SVG image asset `imgUnion1` (see asset list), size `24.733px × 18.32px`

### Nav links (buttons, no fill, text-only)
All: `padding: 10px 12px` (`py-[var(--spacing-5,10px)] px-[var(--spacing-6,12px)]`), `border-radius: var(--md, 8px)`, text style `text-[color:var(--foreground/neutral/default/foreground-neutral,#0f0f0f)] text-[14px] tracking-[-0.14px] leading-[1.16]`, font `Inter Medium`.

Labels in order:
1. "Components"
2. "Foundations"
3. "Changelog"
4. "Docs"

### CTA button ("Open in Figma")
- Background: `var(--fill/primary/default/default/fill-primary, #0a61f9)`
- Padding: `12px 20px` (`py-[var(--spacing-6,12px)] px-[var(--spacing-10,20px)]`)
- Border-radius: `var(--md, 8px)`
- Icon: Figma logo icon (16px, asset `imgFigma16`), left of label
- Label: "Open in Figma", color `var(--foreground/primary/inverse/foreground-primary, #fefefe)`, `14px`, `tracking: -0.14px`, `line-height: 1.16`, `Inter Medium`

> Note: the brief's list mentions nav labels "Component, Foundation, Changelog, Blog" — the actual dump text is **"Components", "Foundations", "Changelog", "Docs"** (no "Blog" link found in header; "Docs" appears instead).

---

## 2. Hero section

- Node: `data-node-id="3855:7599"`, container `px-[120px]`, `gap: 12px`, `flex-col items-center`

### Eyebrow / badge text
- Text: **"Venstra 1.0 is live!"**
- Color: `var(--primary/default/500, #0a61f9)`
- Font: `Inter Semi Bold`, `16px`, `tracking: -0.48px`, `line-height: 1.25`, centered, container width `376px`

### Heading (uses image mask / gradient text effect — see `Component1`)
- Wrapper `3855:7602`, `gap: 16px`
- The heading itself is rendered via `Component1` (masked gradient image, `540px` height mask) — **exact heading text not present as plain text in this block** (it appears to be an image/mask-based headline, likely an animated/gradient text treatment). Actual visible copy per screenshot: "The design system built for real products" — **this exact string was not found as literal text at this specific node**; it does appear later, verbatim, as literal text in two other places (closing CTA `4098:57427` and implied hero per screenshot). Treat hero headline text as: **"The design system built for real products"** (confirmed literal string exists elsewhere in dump, see Section 9) but not literally present as a `<p>` at the very top hero position in this dump — likely because it's the masked/gradient `Component1` graphic layer.

### Subheading
- Text: **"Components that connect. Tokens that make sense. Themes that just work"**
- Color: `var(--neutral/solid/600, #5f5f5f)`
- Font: `Inter Regular`, `16px`, `tracking: -0.48px`, `line-height: 1.25`, centered, container width `376px`

### Buttons row
- Gap: `8px`
- Button 1 — "Open in Figma": background `var(--fill/primary/default/default/fill-primary, #0a61f9)`, icon `imgFigma16` (16px) + label, color `#fefefe`, `14px`/`1.16`/`-0.14px`, padding `12px 20px`, radius `8px`
- Button 2 — "View components": background `rgba(4,4,4,0.04)` (`var(--fill/neutral/overlay/default/fill-neutral)`), label color `var(--foreground/neutral/default/foreground-neutral, #0f0f0f)`, `14px`/`1.16`/`-0.14px`, padding `12px 20px`, radius `8px`

> Note: brief lists "Open Figma" as button label; actual dump text is **"Open in Figma"** (with "in").

---

## 3. Product mockup / dashboard composite (below hero)

- Node: `data-node-id="3855:7621"` (`motion.div`, animated), `flex gap-[20px] items-start`
- This is a composite of three columns of live component instances (not a single flattened screenshot):
  - Column 1 (`w-352px`): color-scale avatar stack card (`shadow: 0px 2px 26px 0px rgba(196,196,196,0.2)`, `border-radius:16px`, `background:#fff`), a checkbox card ("Make profile public" / "Anyone with the link can view your profile"), and a `TabsFill` tab bar with items **Tasks / Members / Files / Activity**.
  - Column 2 (`w-476px`): a `ToggleGroupFill` toolbar plus (per earlier structural read) a larger panel — table/list mockup content built from live design-system components (Table, TableHead, TableCell, Avatar, Badge, Pagination, Breadcrumb, Dialog, Switch cards, etc.), continuing to line ~1655 of the dump.
  - A bottom fade mask: `absolute bg-gradient-to-b from-rgba(255,255,255,0) to-white`, `height: 260px`, `width: 1221px` — fades the mockup into the page background.
- Card shadow used throughout mockup cards: `shadow-[0px_2px_26px_0px_rgba(196,196,196,0.2)]`, `border-radius: 16px`, background `#fff` / `bg-white`.
- Color swatch labels visible inside mockup: **"p500", "p400", "p300", "p200"** with backgrounds `#0a61f9`, `#3967ff`, `#8299fe`, `#aab7fe` respectively (primary color scale).
- **No single flattened "mockup screenshot" image URL exists for this block** — it is built from live nested components, not an exported PNG. (See Section 10 for actual image asset URLs found.)

---

## 4. Stats row ("What's inside")

- Node: `data-node-id="3855:7654"`, container `px-[244px]`, `gap: 60px`, section wrapper gap `240px`

### Section heading
- Text: **"What's inside"**
- Font: `Inter Medium`, `48px`, color `var(--neutral/solid/950, #040404)`, `tracking: -2.88px`, `line-height: 1.24`, centered

### Stats row
- Container: `1222px` wide, `flex gap-[20px] items-center`, each stat block `flex-1`, `padding: 12px 32px`, divided by vertical `imgLine11` divider lines
- Stat number style: `56px`, color `#040404`, `tracking: -1.68px`, `line-height: 1.2`, `Inter Medium`, `whitespace-nowrap`
- Stat label style: `16px`, color `rgba(4,4,4,0.44)`, `tracking: -0.48px`, `line-height: 1.2`

| Number | Label |
|---|---|
| 1440+ | Variants |
| 96 | Tokens |
| 27 | Components |
| 2 | Themes |

> Note: brief said stats are "1440+, 96, 27, 2" with generic labels — confirmed exact labels are **Variants / Tokens / Components / Themes**.

---

## 5. "34 components..." text section

- Node: `data-node-id="4134:57778"`, `padding: 120px 0`, centered, width `1036px`
- Above the heading: `Component2` — a masked gradient graphic (radial gradient blue→black, `540px` height mask) sitting behind/above the heading text, decorative.
- Heading text: **"34 components with full anatomy, all states, and semantic token bindings."**
  - Font: `Inter Medium`, `60px`, color `var(--neutral/solid/950, #040404)`, `tracking: -3.6px`, `line-height: 1.24`, centered, container width `1142px`

> Note: the brief's described copy — "Everything you need. Nothing you don't." — was **not found in the dump**. Only the "34 components with full anatomy..." string is present as the section's actual text.

---

## 6. "Light and dark. One token system" section + dashboard screenshot

- Node: `data-node-id="3855:7678"`, `gap: 60px`, centered

### Heading + subtext
- Heading: **"Light and dark. One token system"**
  - Font: `Inter Medium`, `48px`, color `var(--neutral/solid/950, #040404)`, `tracking: -2.88px`, `line-height: 1.24`, container width `min-content` (single line, centered)
- Subtext: **"Flip the switch — every component updates instantly. No separate files, no manual overrides. Variables handle everything."**
  - Font: `Inter Regular`, `16px`, color `var(--neutral/solid/600, #5f5f5f)`, `tracking: -0.48px`, `line-height: 1.25`, width `470px`

### Dashboard mockup panel
- Node: `data-node-id="4302:22740"`, `data-name="Concept final"` (`motion.div`)
- Container: `width: 1222px`, `height: 700.104px`, `background: #fff`, `border-radius: 20px`, `overflow: clip`
- Shadow: `0px 1.663px 21.614px 0px rgba(196,196,196,0.2)`
- Built from a live scaled-down dashboard UI mock (sidebar "Venstra" logo, search input "Search", sidebar nav items "Dashboard" + icon items, main content area) — all rendered from nested design-system component instances, not a flattened image.
- Sidebar: `170.571px` wide, background `#fff`, right border `0.636px solid #e8e8e8`, sticky (`position: sticky; top:0`)
- This entire panel is component-built, **no single screenshot asset URL** backs it.

---

## 7. Blue CTA banner ("Code components are on the way")

- Node: `data-node-id="3855:7838"`
- Container: `width: 1222px`, `height: 240px`, `border-radius: 20px`, `padding: 52px`, `flex items-center justify-between`
- Background: `linear-gradient(-72.03deg, rgb(47,120,248) 0%, rgb(10,97,249) 100%)` layered over `linear-gradient(90deg, rgb(248,248,248) 0%, rgb(248,248,248) 100%)`
  - i.e. effective gradient: **`#2f78f8` → `#0a61f9`** diagonal (-72.03°)
- Decorative shapes: two absolutely-positioned image assets (`img`, `img1` — see Section 10), positioned at `left:434px top:119.9px` (`228×183px`) and `left:707px bottom:76.1px` (`188×185px`)

### Heading
- Text: **"Code components are on the way"**
- Font: `Inter Medium`, `48px`, color `white` (`#ffffff`), `tracking: -2.88px`, `line-height: 1.08`, container width `433px`

### Subtext
- Text: **"In the meantime, the full design system is available in Figma"**
- Font: `Inter Regular`, `16px`, color `rgba(255,255,255,0.8)`, `tracking: -0.48px`, `line-height: 1.25`, width `230px`

### Button
- Label: **"Open in Figma →"**
- Background: `var(--fill/primary/default/inverse/fill-primary, #fefefe)` (white)
- Label color: `var(--foreground/primary/default/foreground-primary, #0a61f9)`
- Padding: `12px 20px`, radius `8px`, font `14px`/`1.16`/`-0.14px` Inter Medium

---

## 8. FAQ section

- Node: `data-node-id="3855:7846"`, `padding: 0 207px`, `gap: 60px`, centered

### Heading
- Text: **"Frequently asked questions"**
- Font: `Inter Medium`, `48px`, color `var(--neutral/solid/950, #040404)`, `tracking: -2.88px`, `line-height: 1.24`, full width, centered

### Accordion items ("Questions" component)
- Each item: `<button>`, background `var(--neutral/solid/100, #f8f8f8)`, `border-radius: 20px`, `padding: 32px`, `gap: 40px`, `flex items-center`, full width
- Question text style: `Inter Medium`, `18px`, color `#040404`, `tracking: -0.54px`, `line-height: 1.32`, left-aligned
- Right-side icon: `24px` plus/expand icon (`imgPlus24` — a squircle "+" icon), toggles presumably to a minus/collapse icon on open (only default/closed "Default" state present in dump — no expanded/answer-visible state or answer text found)

Exact question list (8 total, in order):

1. "What is Venstra?"
2. "Is Venstra really free?"
3. "Do I need a paid Figma account?"
4. "Can I use Venstra in commercial projects?"
5. "Will there be updates?"
6. "Will there be a code version?"
7. "What is the difference between a UI kit and a design system?"
8. "How do I install a Figma design system?"

> Answer text: **not found in dump** — only the `Questions` component in its collapsed/"Default" state (question + plus icon) is present; no expanded state with answer copy exists in this code dump.

---

## 9. Closing CTA

- Node: `data-node-id="4098:57430"`, `gap: 40px`, centered

### Logo mark
- Image asset `imgLogo`, size `80px × 60.741px` (standalone Venstra logomark, no wordmark)

### Heading
- Text: **"The design system built for real products"**
- Font: `Inter Medium`, `52px`, color `black` (`#000000` literal, not a token here), `tracking: -3.12px`, `line-height: 1.08`, width `500px`, centered

### Subtext
- Text: **"Free, open, and built to last. Follow for updates and new releases."**
- Font: `Inter Regular`, `16px`, color `rgba(0,0,0,0.8)`, `tracking: -0.48px`, `line-height: 1.25`, width `346px`, centered

### Button
- Label: **"Open in Figma"**
- Background: `var(--fill/primary/default/default/fill-primary, #0a61f9)`
- Icon: `imgFigma16` (16px) left of label
- Label color: `var(--foreground/primary/inverse/foreground-primary, #fefefe)`, `14px`/`1.16`/`-0.14px`, `Inter Medium`
- Padding `12px 20px`, radius `8px`

---

## 10. Footer

- Node: `data-node-id="4098:57768"`
- Border: `border-top: 1px solid var(--stroke/base/stroke, #ebebeb)`
- Padding: `padding-top: 60px; padding-bottom: 100px; padding-left/right: 244px`
- Layout: `flex items-start justify-between`, full width

### Logo (left)
- Text: **"Venstra"**, `Inter Semi Bold`, `25.19px`, color `var(--neutral/solid/950, #040404)`, `tracking: -0.7557px`
- Logo mark: `imgUnion1`, `24.733px × 18.32px`

### Columns (right, `gap: 20px` between columns)

**Column 1 — "Docs"** (width `228px`, heading `16px` Inter Medium `#040404`, links `16px` Inter Regular `var(--neutral/solid/700, #4a4a4a)`, `gap: 12px` heading→links, `gap: 8px` between links, `tracking: -0.48px`, `line-height: 1.25`)
- Introduction
- Theming
- Changelog

**Column 2 — "Foundations"** (width `228px`, same typography)
- Colors
- Typography
- Spacing
- Border Radius
- Effects

**Column 3 — "Quick links"** (width `229px`, same typography)
- Browse Components
- Open in Figma

**Column 4 — "Legal"** (width `104px`, same typography)
- License

> Note: no copyright line text (e.g. "© 2026 Venstra") was found in the dump — footer ends after the Legal/License column. Copyright string is **not found in dump**.

---

## 11. Color palette summary (all hex/rgba values found in dump)

| Token / usage | Value |
|---|---|
| `surface/base/surface-low` (page background) | `#fefefe` |
| `surface/base/surface-subtle` | `#f8f8f8` |
| `surface/base/surface-elevated` | `#fefefe` |
| `neutral/solid/100` (FAQ card bg, badge bg) | `#f8f8f8` |
| `neutral/solid/200` | `#f2f2f2` |
| `neutral/solid/600` (body/subtext gray) | `#5f5f5f` |
| `neutral/solid/700` (footer link gray) | `#4a4a4a` |
| `neutral/solid/950` (heading black) | `#040404` |
| `foreground/foreground` | `#040404` |
| `foreground/foreground-weak` | `#5f5f5f` |
| `foreground/foreground-subtle` | `#4a4a4a` |
| `foreground/foreground-muted` | `#b3b3b3` |
| `foreground/neutral/default/foreground-neutral` | `#0f0f0f` |
| `foreground/primary/default/foreground-primary` | `#0a61f9` |
| `foreground/primary/inverse/foreground-primary` | `#fefefe` |
| `primary/default/500` (eyebrow text, brand blue) | `#0a61f9` |
| `primary/default/400` | `#3967ff` |
| `primary/default/300` | `#8299fe` |
| `primary/default/200` | `#aab7fe` |
| `fill/primary/default/default/fill-primary` (primary buttons) | `#0a61f9` |
| `fill/primary/default/inverse/fill-primary` (white CTA button) | `#fefefe` |
| `fill/neutral/overlay/default/fill-neutral` (secondary button bg) | `rgba(4,4,4,0.04)` |
| `fill/neutral/overlay/default/fill-neutral-hover` | `rgba(4,4,4,0.08)` |
| `stroke/base/stroke` (footer border, table borders) | `#ebebeb` |
| `stroke/base/stroke-subtle` | `#d0d0d0` |
| CTA banner gradient | `linear-gradient(-72.03deg, #2f78f8 0%, #0a61f9 100%)` |
| CTA subtext | `rgba(255,255,255,0.8)` |
| Closing CTA heading | `#000000` (literal black, not a var) |
| Closing CTA subtext | `rgba(0,0,0,0.8)` |
| Stat number | `#040404` |
| Stat label | `rgba(4,4,4,0.44)` |
| Header background (glass) | `rgba(254,254,254,0.68)` + `backdrop-blur(40px)` |
| Hero mockup fade mask | `linear-gradient(to bottom, rgba(255,255,255,0) → #ffffff)` |
| Component1 hero graphic gradient (radial) | stops: `rgba(10,97,249,1)` → `rgba(9,74,188,1)` → `rgba(7,51,127,1)` → `rgba(6,39,96,1)` → `rgba(6,27,65,1)` → `rgba(5,16,35,1)` → `rgba(4,10,19,1)` → `rgba(4,4,4,1)` |

**Dark mode colors: not found in dump.** No dark-theme variants, `dark:` classes, or alternate color tokens were present anywhere in the 428k-character dump — only one (light) theme is represented.

---

## 12. Border-radius scale (as used on this page)

| Element | Radius |
|---|---|
| Nav/CTA buttons | `var(--md, 8px)` |
| FAQ accordion items | `20px` |
| CTA banner | `20px` |
| Dashboard mockup panel | `20px` |
| Hero mockup cards (avatar stack, checkbox card) | `16px` |
| Color swatch pills | `73px` (effectively fully round at that size) |
| Table / list card | `var(--xxl, 16px)` |
| Small chips/badges | `var(--full, 9999px)` |

---

## 13. Image / asset URLs found in dump

All Figma MCP asset URLs expire 7 days from generation — re-fetch via `get_design_context`/`download_assets` before use. Full list of `const img... = "https://www.figma.com/api/mcp/asset/..."` declarations found at the top of the dump (lines 1–49); the ones actually **used** in the visible marketing page (as opposed to internal component library icons only referenced by nested subcomponents) are:

| Const name | URL | Used for |
|---|---|---|
| `imgFigma16` | `https://www.figma.com/api/mcp/asset/ab2de96d-ba19-4fee-8a18-50d0f737b9dc` | Figma icon in "Open in Figma" buttons (header, hero, closing CTA) |
| `imgPlus24` | `https://www.figma.com/api/mcp/asset/4f7e2a54-1c97-4263-993c-a4bfb4933300` | FAQ accordion "+" icon |
| `imgLine11` | `https://www.figma.com/api/mcp/asset/fe07ebda-d765-4af4-aac6-5db51192eb10` | Vertical divider lines in stats row |
| `imgLogo` | `https://www.figma.com/api/mcp/asset/99ac86af-b514-44b1-9df2-49700d5034e3` | Standalone logomark in closing CTA |
| `imgUnion1` | `https://www.figma.com/api/mcp/asset/5fb5d855-0f8a-4f37-a64f-6f53ec4365e7` | "Venstra" wordmark logo icon (header + footer) |
| `img` | `https://www.figma.com/api/mcp/asset/666e08f5-388f-4edc-8478-cf8ba08cecef` | Decorative shape in blue CTA banner ("/ {-}") |
| `img1` | `https://www.figma.com/api/mcp/asset/2d627cda-ede7-48c1-be5c-b17cd832266b` | Decorative shape in blue CTA banner ("\\<") |
| `imgSearch16` | `https://www.figma.com/api/mcp/asset/163862c9-374e-4f54-8f92-5ce2029704d3` | Search icon inside dashboard mockup sidebar |
| `imgHouse16` | `https://www.figma.com/api/mcp/asset/f49b8b67-a614-4b26-b739-e9aa0dd93e69` | Dashboard nav icon in mockup |

Additional icon assets exist in the dump (`imgUs`, `imgSquircle16/17`, `imgChevronDown16/17/18/19`, `imgEllipsis16/17`, `imgChevronRight16/17/18/19`, `imgGripVertical16/17`, `imgEllipsisVertical16/17`, `imgChevronFirst16/17`, `imgChevronLeft16/17`, `imgChevronLast16/17`, `imgVariantHorizontally/Vertically`, `imgCheck10`, `imgIconsX`, `imgVector1`, `imgUnion`, `imgUsersRound16`, `imgFolders16`, `imgChartLine16`, `imgSettings16`, `imgPanelLeft24`, `imgLine5`, `imgEllipse10`, `imgDotLeft/1/2`) — these all belong to the nested dashboard-mockup component library (breadcrumbs, tables, pagination, sidebar nav, toggles) rather than being page-level marketing assets. Not itemized individually here since they're internal to reused DS components, not unique marketing imagery.

**No single flattened "hero mockup screenshot" or "dashboard screenshot" PNG/JPG asset exists** — both composite visuals (Section 3 and Section 6) are built live from nested component instances in the dump, not exported images. If pixel-perfect matching of those composites is required, the best options are: (a) rebuild them from the documented sub-components/colors above, or (b) use `get_screenshot` on the specific sub-node IDs (`3855:7621` for hero mockup, `4302:22740` for dashboard mockup) to get a rendered PNG export.

---

## 14. Layout structure summary

- Overall page: single-column `flex-col`, `align-items: center` for most sections, sections separated by large vertical gaps (`280px` top-level, `240px`/`160px`/`60px` nested).
- Container padding pattern: hero `px-120px`, stats/mid-sections `px-244px`, FAQ `px-207px`, footer `px-244px`, header `px-244px`.
- Fixed-width Figma frame — content blocks use explicit pixel widths (e.g. `1222px`, `1160px`, `1036px`, `1142px`) rather than percentage/fluid widths. No CSS Grid usage detected on the marketing sections (grid only appears in the "Mask group" gradient-graphic wrapper technique, which is a Figma export artifact, not a layout grid).
- No `@media` queries, no responsive breakpoint classes, no mobile layout variant present anywhere in the 428k-character dump.
