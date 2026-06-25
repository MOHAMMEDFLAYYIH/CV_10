# Portfolio UI/UX Prompt — Personal Developer Showcase

## Role

Act as a **senior product designer + frontend engineer**. Design and build a single-page personal portfolio website for a Flutter/Dart mobile developer. The output must feel globally competitive — a site that would impress a Berlin or London tech lead reviewing candidates. Do **not** default to generic AI-portfolio aesthetics.

---

## Context (the developer)

- **[FILL IN: Name]** — Flutter & Dart mobile developer
- 3rd-year Computer Engineering student (Information Systems track), currently based in **Iraq → Germany**
- Ships real production apps for clients via Figma-to-code workflows
- Architecture discipline: **Clean Architecture + BLoC/Cubit**, Offline-first (Hive), `go_router`, `get_it`
- Real projects to feature:
  1. **NewsLingo** — AI-assisted language learning through news, Flutter + BLoC + Firebase + Google ML Kit (Translation, OCR)
  2. **ملج / Malej** — Campus community app for University of Information Technology and Communications, Flutter + BLoC + Firebase, group system for students, academic staff, and alumni
  3. **SplitEase** — Real-time expense-splitting app with multi-currency support and bill-scanning OCR, Flutter + BLoC + FastAPI + PostgreSQL
  4. **[FILL IN: optional 4th project]**
- Long-term goal: career in **Germany / EU** mobile development market
- Site purpose: **pure personal showcase** — no hard sales CTA, but must read as serious, credible, and technically excellent

---

## Design Direction — Do NOT Use These Clichés

| ❌ Avoid | ✅ Instead |
|---|---|
| Cream + serif + terracotta ('modern artisan' cliché) | High-contrast, precise, digital-native palette |
| Near-black + single neon cyan/magenta accent (generic dark dev) | Sophisticated dark that Flutter devs would respect |
| Broadsheet / hairline typographic newspaper layout | App-like, mobile-first layout — fitting a mobile developer |

---

## Token System (build this)

### Color Palette

Tokens that feel **inspired by Flutter's design sensibility** (Material-inspired but refined, not generic Bootstrap):

```css
--color-bg:        #FAFAFA          /* near-white, clean */
--color-bg-alt:    #F0F0F0          /* subtle section separator */
--color-surface:   #FFFFFF
--color-border:    #E2E2E2          /* fine, precise lines */
--color-text:      #1A1A1A
--color-text-muted:#6B6B6B
--color-accent:    #2563EB          /* blue — precise, confident, Flutter-blue-ish */
--color-accent-soft:#E8F0FE
--color-accent-dark:#1D4ED8
```

Dark mode toggle (must have):

```css
--color-bg:        #0A0A0A
--color-bg-alt:    #141414
--color-surface:   #1E1E1E
--color-border:    #2A2A2A
--color-text:      #F5F5F5
--color-text-muted:#888888
--color-accent:    #3B82F6
--color-accent-soft:#1E293B
--color-accent-dark:#60A5FA
```

### Typography

| Role | Font | Why |
|---|---|---|
| Display (hero, major headings) | **Inter** (ExtraBold 800, weight 700-800) | High legibility at all sizes, precise, modern — Flutter's design language affinity |
| Body (paragraphs, labels) | **Inter** (Regular 400, Medium 500) | Same family, clean hierarchy |
| Mono (code snippets, tech badges) | **JetBrains Mono** | Developer-credible, pairs well with Inter |
| Arabic (RTL mode) | **IBM Plex Sans Arabic** or **Noto Kufi Arabic** | Matches Inter's geometry well; ensure proper Arabic numeral support |

Scale: `clamp()` based fluid type — hero 3.5-5rem, headings 1.5-2.5rem, body 1rem, small 0.875rem.

### Layout Concept: "Mobile-Dev-Nav"

Take structural inspiration from how a mobile developer thinks about UI:

- **Navigation**: A thin, bottom-anchored tab bar (desktop: left sidebar that collapses). Not a generic top navbar. This immediately signals "this is a mobile person's site."
- **Content**: Card-based, with generous whitespace. Think of each section as a screen in an app.
- **Grid**: Use a subtle column grid (12-col on desktop, 4-col on mobile) that feels intentional, not automatic.

---

## Signature Element — Interactive Phone Mockup

This is the **visual hook** that makes the site unforgettable and uniquely his as a mobile developer. Include a CSS-rendered phone frame (no images needed) that:

1. Sits prominently in the **hero section** (or hero-adjacent), angled slightly or flat, as a mockup "screen"
2. Cycles through 3-4 **real app screens** (NewsLingo, Malej, SplitEase, [4th]) using CSS/simple JS transitions
3. Each "screen" shows:
   - App name + short tagline
   - A simplified UI mockup rendered in CSS/HTML (e.g., a list view, a card, a chart — abstracted but recognizable)
   - A subtle gradient/color that matches each app's personality (language learning=green tint, expense split=amber tint, campus=purple tint)
4. Transition: smooth crossfade or slide every 4-5 seconds, pause on hover
5. The phone frame itself: rounded corners, notch/dynamic island hint, thin bezel — all CSS, no images

This element does double duty: it **proves he's a mobile developer** without saying it, and it **previews his actual work** inside the portfolio itself.

---

## Content Architecture (Sections)

### 1. Hero
- Full-viewport height
- Name, role tagline ("Flutter Developer · Clean Architecture · Problem Solver")
- The phone mockup (signature piece)
- Minimal navigation (just the bottom bar / sidebar)
- Quick stat: "X shipped apps · Y years building"

### 2. About
- Short paragraph: who he is, his approach (real, specific — no generic filler)
- Photo placeholder `[FILL IN: photo URL]`
- Flag/hint of Iraq ↔ Germany journey
- Download CV button (plain PDF link)

### 3. Skills / Stack
- Visual, not a boring list
- Grouped: **Core** (Flutter, Dart) · **Architecture** (BLoC, Clean Architecture, get_it) · **Backend** (Firebase, FastAPI, PostgreSQL) · **Tools** (Figma, Git, CI/CD)
- Use small pill/badge elements with icons (SVG inline or simple CSS shapes)
- Show **years** or **experience level** as visual bars — honest and granular

### 4. Featured Projects (Case-Study Style)

For each of the 3-4 projects:

- **Mockup preview** (tied to the phone mockup — clicking/tapping a project selects it in the phone)
- **Title + short problem statement** ("Expense splitting shouldn't need a calculator and a therapist")
- **Stack badges** (Flutter, BLoC, Firebase, etc.)
- **2-3 key challenges solved** (bullet, real — e.g., "Multi-currency real-time conversion without a server — pure BLoC + Open Exchange Rates API")
- **Link** to GitHub repo or case study
- **Status badge** (In Development · Live on Stores · Client Project)

### 5. Process / Architecture Note
- Short section showing **how he thinks**: a simple 3-step or 4-step diagram using pure CSS
- Steps: **Design → Architect → Build → Ship**
- Each step has a 1-line description — this demonstrates Clean Architecture rigor visually
- This is his **differentiator** — most portfolios skip this, but it's what senior dev leads look for

### 6. Contact
- Minimal: email link `[FILL IN: email]` + GitHub `[FILL IN: GitHub URL]` + LinkedIn `[FILL IN: LinkedIn URL]`
- A short sentence: something open and human like "Working on something interesting? Let's talk."
- No heavy form needed — links are fine

### 7. Footer
- Small, one line: name + year + "Built with HTML, CSS, JavaScript"

---

## Bilingual / RTL Requirement

- **Default language**: English
- **Toggle**: a switch/button in the nav bar that switches the site to **Arabic**
- This is not just translating strings — the entire layout must **mirror**:
  - Navigation moves to the right (or bottom bar reverses item order)
  - Text alignment shifts
  - Cards and grids should ideally reflow (not just `dir="rtl"` slapped on)
- Use CSS logical properties (`inset-inline-start`, `margin-inline-end`, etc.) where possible for clean RTL support
- Arabic font: IBM Plex Sans Arabic or Noto Kufi Arabic — sized slightly larger (Arabic needs ~5-10% more size for equal readability at body text)
- Translation: the developer will provide Arabic copy — just build the toggle infrastructure

---

## Interaction & Motion

| Element | Behavior |
|---|---|
| Hero load-in | Staggered fade+slide-up for each element (name → tagline → phone → nav) |
| Scroll reveals | Sections fade+slide-up on intersection, ~30px offset, 0.6s ease-out |
| Project cards | Subtle lift on hover (+2-4px translateY, shadow deepen) |
| Phone mockup | Auto-cycle screens, pause on hover/focus |
| Nav items | Underline or dot indicator, smooth scroll to section |
| Dark mode | `prefers-color-scheme` detection + manual toggle, transition bg/text color 0.3s |
| Motion respect | Check `prefers-reduced-motion` and disable all non-essential animation |

Keep motion **restrained** — this should feel app-like, not like a Keynote presentation.

---

## Technical Requirements

- **Stack**: Vanilla HTML / CSS / JavaScript (no React, no framework — portable to deploy anywhere: GitHub Pages, Vercel, Netlify, Cloudflare Pages)
- **Responsive**: Mobile-first. Test breakpoints at 480px, 768px, 1024px, 1440px+
- **Accessibility**: 
  - Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<h1-h6>` hierarchy)
  - Keyboard-focus visible on all interactive elements
  - Alt text on all images/icons
  - Color contrast ratio ≥ 4.5:1 for text
  - `prefers-reduced-motion` supported
- **Performance**:
  - No external libraries (no jQuery, no GSAP, no Bootstrap)
  - Google Fonts: load Inter, JetBrains Mono, and Arabic font with `display=swap`
  - Inline critical CSS, defer non-critical
  - Font subset / preconnect hints
  - All icons: inline SVG or Unicode — no icon library
- **SEO**:
  - Proper `<meta>` tags (description, OG image, viewport, theme-color)
  - Semantic structure
  - `lang` attribute switches with the bilingual toggle

---

## Copy / Voice Guidelines

Do not write generic filler. The tone should be:

- **Confident, not arrogant** — state facts: "Shipped 3 production Flutter apps. Built with Clean Architecture + BLoC."
- **Specific, not vague** — "NewsLingo uses Google ML Kit for real-time OCR translation" not "I built a language app"
- **Human, not corporate** — "Working on something interesting? Let's talk." not "Feel free to reach out for professional inquiries"

The developer will provide final copy — build the layout to accommodate real content, not lorem ipsum.

---

## What to Output

Provide:

1. **File structure** (index.html, style.css, script.js, assets/)
2. **Complete production-ready code** — every file, no placeholders, no "add your content here" gaps
3. **A short deployment README** — copy-paste instructions for GitHub Pages, Netlify, or Cloudflare Pages

Use `[FILL IN: email]` and similar placeholders only where actual personal data is needed (email, GitHub URL, photo URL, name).

---

## Final Quality Check

Before finishing, verify:

- [ ] No generic AI-portfolio layout (cream+serif, neon dark, broadsheet — avoided)
- [ ] Interactive phone mockup is implemented and cycling through projects
- [ ] Arabic toggle works — layout mirrors, fonts switch
- [ ] Dark mode respects system preference + manual toggle
- [ ] Navigation is bottom-bar (mobile) / sidebar (desktop) — not a top navbar
- [ ] All interactions feel app-like and restrained
- [ ] Responsive down to 320px width, up to 1920px+
- [ ] Lighthouse score target: 95+ Performance, 100 Accessibility
