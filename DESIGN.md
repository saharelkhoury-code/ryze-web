# Design System Specification: The Clinical Atelier

## 1. Overview & Creative North Star
**The Creative North Star: "The Clinical Atelier"**
This design system rejects the sterile, utilitarian aesthetic of traditional medical software in favor of a "Clinical Atelier" philosophy. It treats digital interfaces with the same precision and bespoke care found in high-end surgical suites and luxury fashion houses. 

We move beyond the "template" look by utilizing **intentional asymmetry** and **editorial pacing**. Our layouts should breathe with expansive white space, punctuated by high-contrast serif typography. We do not use grids to "box in" content; we use them to anchor elements while allowing others to float, creating a sense of weightlessness and prestige.

---

## 2. Colors & Surface Philosophy
The palette is a dialogue between the cold precision of medical science and the warm, human touch of luxury hospitality.

### The Palette (Material Design Mapping)
*   **Primary (Clinical Blue):** `#003180` — Used for core brand moments and authoritative actions.
*   **Secondary (Champagne Gold):** `#735c00` — Used for refined accents and secondary high-touch elements.
*   **Tertiary (Electric Blue):** `#003d42` — A deep, technical anchor for functional depth.
*   **Base Surfaces:** `surface` (`#f6fafe`) and `surface_container_lowest` (`#ffffff`).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined through background color shifts or tonal transitions. To separate a sidebar from a main feed, transition from `surface` to `surface_container_low`. If an element needs to stand out, let it float via elevation, not an outline.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-translucent layers. 
*   **Base:** `background` (#f6fafe).
*   **Level 1 (Sectioning):** `surface_container_low` (#f0f4f8).
*   **Level 2 (Interactive Cards):** `surface_container_lowest` (#ffffff).
*   **Level 3 (Floating Overlays):** Use `surface_tint` at 5% opacity with a `20px` backdrop blur.

### The "Glass & Gradient" Rule
Standard flat colors are for utilities; signature moments require "soul." 
*   **Hero CTAs:** Use a subtle linear gradient from `primary` (#003180) to `primary_container` (#0046b0) at 135 degrees.
*   **Floating Navigation:** Utilize Glassmorphism. A container with `surface_variant` at 60% opacity and a heavy `backdrop-filter: blur(12px)` creates the "Apple-style" medical luxury requested.

---

## 3. Typography
Our typography is a study in "Technical Editorial." We pair the historical authority of a serif with the geometric neutrality of a modern sans.

*   **Display & Headlines (Noto Serif):** Use `display-lg` through `headline-sm` for storytelling and page titles. These should be set in `on_primary_fixed_variant` (#0040a2) to evoke "Midnight Blue with gold reflections."
*   **Technical & UI (Manrope):** Use `title-lg` through `label-sm` for all functional data, buttons, and navigation. 
*   **The Contrast Rule:** Never place two Noto Serif elements adjacent to each other without a Manrope element in between to provide "technical relief."

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural lines.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a soft "lift" that feels organic to the eye.
*   **Ambient Shadows:** For floating modals or dropdowns, use: 
    *   `box-shadow: 0 12px 40px rgba(0, 49, 128, 0.06);` 
    *   Note the blue tint in the shadow—this mimics natural light passing through "Clinical Blue" glass.
*   **The Ghost Border Fallback:** If a border is required for accessibility, use `outline_variant` at **15% opacity**. A solid 100% opaque border is a failure of the design intent.

---

## 5. Components

### Buttons (The Precision Tool)
*   **Primary:** Gradient of `primary` to `primary_container`. Text in `on_primary`. Shape: `md` (0.375rem) for a tailored, architectural feel.
*   **Secondary:** `surface_container_highest` background with `secondary` (Champagne Gold) text. No border.
*   **Tertiary:** `label-md` Manrope text in `secondary`. Underline only on hover with a 1px offset.

### Input Fields (The Atelier Form)
*   **Style:** Minimalist. No enclosing box. A bottom-only "Ghost Border" (15% opacity `outline`).
*   **Focus State:** The bottom border transitions to `secondary_fixed` (Champagne Gold) and the label (Manrope) slides upward with a 200ms ease-out.

### Cards & Lists (The Editorial Feed)
*   **Rule:** Forbid divider lines. 
*   **Execution:** Use `spacing-6` (2rem) of vertical white space to separate list items. For cards, use a subtle background shift from `surface` to `surface_container_lowest`.

### Signature Component: The "Atelier Metric"
For medical data points, use a large `display-md` Noto Serif number in `primary`, paired with a small `label-sm` Manrope description in `secondary_fixed_dim`. This creates a high-fashion "magazine" feel for clinical data.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is `spacing-12`, try a right margin of `spacing-24` for hero sections to create an editorial feel.
*   **Do** use `secondary` (Champagne Gold) sparingly. It is a "high-carat" accent; overusing it devalues the premium feel.
*   **Do** leverage `surface_bright` for highlight areas to guide the user’s eye without using a button.

### Don’t:
*   **Don't** use pure black (#000000). Use `on_background` (#171c1f) for all "black" text.
*   **Don't** use standard `0.25rem` (DEFAULT) roundedness for large containers. Use `xl` (0.75rem) for main cards to soften the "clinical" edge.
*   **Don't** use "Information Blue" for links. Always use `primary` or `secondary` tokens.