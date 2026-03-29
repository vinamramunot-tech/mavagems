```markdown
# High-End Editorial: The Design System for MAVA Gems

## 1. Overview & Creative North Star
**Creative North Star: "The Emerald Gallery"**

This design system moves away from traditional "e-commerce" structures in favor of a high-end editorial experience. Inspired by the legacy of heritage jewelers, the interface should feel less like a software application and more like a curated physical gallery. We achieve this through **Intentional Asymmetry**—placing high-carat imagery off-center to create visual tension—and **Atmospheric Depth**, using layered emerald tones to mimic the internal "jardin" (garden) of a natural gemstone. 

The goal is to evoke trust through precision and luxury through restraint. We do not fill white space; we celebrate it.

---

## 2. Colors: The Verdant Palette
The palette is anchored in the deep, rhythmic greens of premium gemstones, balanced by high-society neutrals.

### Color Strategy
*   **Primary (#006D43):** Used for "Signature" moments—brand markers and primary actions.
*   **The Emerald Gradient:** Utilize `primary` transitioning into `primary_container` (#00A86B) for hero backgrounds to create a sense of light refracting through stone.
*   **The "No-Line" Rule:** We do not use 1px solid borders to separate sections. Structure is defined by background shifts. For example, a `surface_container_low` section should sit directly against a `surface` background. The change in tonal value is the only "divider" permitted.
*   **Surface Hierarchy:**
    *   **Background (#FDF8F5):** The "Cream Canvas."
    *   **Surface Container Lowest (#FFFFFF):** Used for elevated cards or floating modules.
    *   **Surface Container High (#ECE7E4):** Used for recessed areas, like a footer or technical specification drawer.

### Glassmorphism
Floating elements (navigation bars, quick-view modals) must use semi-transparent `surface` colors with a `12px` to `20px` backdrop-blur. This allows the lush emerald imagery to bleed through the UI, softening the interface.

---

## 3. Typography: The Curated Voice
Our typography pairing is a dialogue between traditional craftsmanship and modern precision.

*   **The Display & Headline (Noto Serif):** These are our "Hero" tokens. Use `display-lg` (3.5rem) with tight letter-spacing for high-impact brand statements. The serif represents the history and heritage of gemstone cutting.
*   **The Body (Inter):** Clean, neutral, and highly legible. It provides the "scientific" counterpart to the romantic serif.
*   **The Label (Manrope):** All labels (`label-md`, `label-sm`) must be **all-caps** with a `0.1rem` tracking (letter-spacing). This mimics the engraving found on high-end jewelry boxes and watch faces.

---

## 4. Elevation & Depth: Tonal Layering
We reject traditional drop shadows in favor of **Natural Ambient Occlusion.**

*   **The Layering Principle:** Depth is achieved by stacking. Place a `surface_container_lowest` (#FFFFFF) card on a `surface_container_low` (#F7F3F0) section. The subtle contrast creates a "soft lift" that feels architectural rather than digital.
*   **Ambient Shadows:** When a shadow is non-negotiable (e.g., a floating checkout button), use a diffused blur: `0px 20px 40px rgba(28, 27, 26, 0.04)`. The shadow color is a tint of our `on_surface` token, not a generic black.
*   **The Ghost Border:** If a boundary is required for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Refined Primitives

### Buttons
*   **Primary:** Solid `primary` background with `on_primary` text. Use `roundedness-sm` (0.125rem) for a sharp, tailored look. No heavy rounding.
*   **Tertiary (Editorial Link):** Noto Serif text with a 1px underline that sits 4px below the baseline. The underline should animate from the center outward on hover.

### Inputs & Fields
*   **Minimalist Fields:** No background color. Only a bottom border using `outline_variant`. On focus, the border transitions to `primary` (#006D43).
*   **Error States:** Use `error` (#BA1A1A) for the border and a `body-sm` hint text.

### Cards & Lists
*   **The Divider Prohibition:** Vertical white space (using `spacing-8` or `spacing-12`) must replace line dividers.
*   **The "Gem" Card:** A `surface_container_lowest` card with an asymmetric image crop. The gemstone image should bleed off one edge of the card to break the container's rigid box.

### Signature Component: The "Refraction" Loader
A custom loading state for high-resolution images where a subtle emerald-green light sweep (`primary_fixed_dim`) passes diagonally across the container while the image fades in from 0% to 100% opacity.

---

## 6. Do's and Don'ts

### Do
*   **Use Generous Spacing:** Use `spacing-20` (7rem) between major sections to let the product "breathe."
*   **Mix Alignments:** Center-align a `headline-lg` but left-align the supporting `body-md` text for an editorial look.
*   **Focus on Imagery:** Images are the primary UI. Treat the UI tokens as a supporting frame for high-quality gemstone photography.

### Don't
*   **Don't use 100% Black:** Use `on_surface` (#1C1B1A) for text. Pure black is too harsh for this palette.
*   **Don't use Standard Grids:** Avoid a 12-column grid where everything is perfectly aligned. Offset images by 1 or 2 columns to create a "scrapbook" high-fashion feel.
*   **Don't use Shadows for everything:** Only one level of floating elevation is allowed at a time. If a modal is open, the background must be flat.

### Accessibility Note
Ensure that all `primary` on `surface` combinations are checked for AA contrast. While we value minimalism, the "Ghost Border" should be increased to 30% opacity in high-contrast mode for users with visual impairments.