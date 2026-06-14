# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input.
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: \<page kind> for \<audience>, with a \<vibe> language, leaning toward \<design system or aesthetic family>."**

### 0.C If the brief is ambiguous, ask one question, do not guess
Ask exactly **one** clarifying question - never a multi-question dump - and only when the design read genuinely diverges. Example: *"Should this feel closer to Linear-clean or Awwwards-experimental?"*

If you can confidently infer from context, **do not ask**. Just declare the design read and proceed.

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials. Every layout, motion, and density decision below is gated by these.

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`. Use these unless the design read overrides them. Do not ask the user to edit this file - overrides happen conversationally.

### 1.A Dial Inference (design read -> dial values)
| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |

---

## 2. BRIEF -> DESIGN SYSTEM MAP

Once you have the design read (Section 0) and dials (Section 1), pick the right foundation. Do not invent CSS for things that have an official package. Do not pretend an aesthetic trend is an official system.

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

Unless the design read picks a real design system (Section 2.A), these are the defaults:

### 3.A Viewport Stability
* **Viewport Stability:** NEVER use `h-screen` for full-height Hero sections. ALWAYS use `min-h-[100dvh]` to prevent layout jumping on mobile (iOS Safari address bar).
* **Grid over Flex-Math:** NEVER use complex flexbox percentage math (`w-[calc(33%-1rem)]`). ALWAYS use CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`).

---

## 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

LLMs default to clichés. Override these defaults proactively. Each rule has a context-aware override path.

### 4.1 Typography
* **Display / Headlines:** Default `text-4xl md:text-6xl tracking-tighter leading-none`.
* **Body / Paragraphs:** Default `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
* **Sans font choice:**
  * **Discouraged as default:** `Inter`. Pick `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`, or a brand-appropriate serif first.
* **Serif choice:** Serif is only acceptable when the brand brief explicitly requires it or it is an editorial / luxury style.
* **Emphasis:** Use italic or bold of the same font family. Avoid mixing sans and serif in the same headline.

### 4.2 Color Calibration
* Max 1 accent color. Saturation < 80% by default.
* **The Lila Rule:** Avoid purple/blue gradient mesh defaults. Use neutral bases (Zinc / Slate / Stone) with high-contrast singular accents.
* **Color Consistency Lock:** Once an accent color is chosen for a page, use it on the whole page consistently.

### 4.3 Layout Diversification
* **Anti-Center Bias:** Avoid centered hero sections by default. Use split-screen, left-aligned, or asymmetric grid layouts.

### 4.4 Materiality, Shadows, Cards
* Use cards only when elevation communicates real hierarchy. Otherwise group with border dividers or negative space.
* **Shape Consistency Lock:** Pick one corner-radius scale for the page and stick to it.

### 4.5 Interactive UI States
* **Tactile Feedback:** Use active states like scale-[0.98] to simulate physical clicks.
* **Button Contrast Check:** Ensure proper WCAG AA contrast ratios (4.5:1 min) on all button text and input fields.
* **No Duplicate CTA Intent:** Do not repeat multiple different labels for the same action (e.g. "Contact us" and "Get in touch" on the same page).

### 4.6 Layout Discipline
* **Hero viewability:** Keep hero elements compact enough to fit in the initial viewport without forced scrolling.
* **Navigation:** Navigation menu items must fit on a single line on desktop. Navigation height should not exceed 80px.
* **Bento Grids:** Vary cell compositions and styles; avoid empty cells. Ensure bento background diversity (not all plain white cards).
* **Section Repetition:** Avoid using the same section layout multiple times on the same page.
* **Zigzag Alternation Cap:** Do not repeat the alternating image-text zigzag layout more than twice.

### 4.7 Visual Assets
* **Priority:** Use high-quality generated or stock imagery. Avoid generic div-based mockups or hand-drawn custom SVG illustrations unless explicitly requested.
