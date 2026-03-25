# Design System Document: Editorial Melanin Intuition

## 1. Overview & Creative North Star
**Creative North Star: The Digital Atelier**
This design system is not a template; it is a curated editorial experience. It draws inspiration from high-end fashion glossies and the rich, tonal depth of ebony skin. The "Digital Atelier" aesthetic focuses on the tension between raw, macro-photography textures and the refined, soft Lilac and Cream color palette. 

To break the "standard web" look, we move away from symmetrical grids. We embrace **intentional asymmetry**, where text overlaps high-contrast imagery, and whitespace is treated as a premium luxury rather than empty space. The goal is a UI that feels "breathtakingly quiet"—sophisticated, intentional, and deeply rooted in a premium Melanin-centered aesthetic.

---

## 2. Colors
Our palette is a study in warmth and softness, designed to provide a luminous backdrop for high-contrast photography.

- **Background & Surface:** The core foundation is `surface` (#FBFBE2) and `surface_container_low` (#F5F5DC). These warm, creamy tones provide a "paper-like" texture that feels more organic and luxurious than pure white.
- **Primary Accents:** `primary` (#635979) and its container (#D1C4E9) provide the signature Lilac/Mauve punch. Use these sparingly for focal points and calls-to-action to ensure they feel like jewels, not utility paint.
- **The "No-Line" Rule:** We do not use 1px solid borders to section content. Boundaries must be defined by shifts in background color. For example, a `surface_container_low` section should transition into a `surface_container_high` section to denote a change in context.
- **Surface Hierarchy & Nesting:** Treat the UI as physical layers. Use `surface_container_lowest` for the most prominent foreground elements (like cards) sitting on a `surface_container` background.
- **The "Glass & Gradient" Rule:** For floating navigation or modal overlays, use glassmorphism. Apply `surface` with 70% opacity and a `backdrop-blur` of 20px. Use subtle gradients from `primary` to `primary_container` for high-impact buttons to give them a rounded, "lit-from-within" depth.

---

## 3. Typography
The typography system relies on the contrast between an authoritative Serif and an approachable, clean Sans-serif.

- **Display & Headline (Noto Serif):** Used for large-scale editorial moments. These should often be used with tight letter-spacing and, in some cases, as decorative background elements.
- **Title & Body (Manrope):** This Sans-serif provides the "clean" counterbalance. It is used for functional information and long-form reading.
- **Visual Hierarchy:**
    - **Display-LG (3.5rem):** Reserved for hero titles, often overlapping image edges.
    - **Headline-MD (1.75rem):** Section headers.
    - **Body-LG (1rem):** Primary reading text with a generous line-height (1.6) for an editorial feel.
    - **Label-MD (0.75rem):** All-caps with increased letter-spacing for metadata and micro-copy.

---

## 4. Elevation & Depth
We eschew the "material" look for a more natural, ambient lighting model.

- **The Layering Principle:** Depth is achieved by stacking. A `surface_container_highest` element on a `surface` background creates a natural recession without the need for shadows.
- **Ambient Shadows:** When shadows are required (e.g., for a floating CTA), use the `on_surface` color at 4% opacity with a blur of 40px and a Y-offset of 20px. This creates a "glow" of shadow rather than a harsh edge.
- **The "Ghost Border" Fallback:** If a container needs containment against a similar background, use `outline_variant` at 15% opacity. It should be barely visible—a whisper of a boundary.
- **Macro-Photography Integration:** Depth is also achieved by placing text *behind* a subject in a macro-photo (masking) or allowing elements to overlap image containers, breaking the box.

---

## 5. Components
Each component is a minimal expression of the brand's luxury.

- **Buttons:**
    - **Primary:** `primary_container` background with `on_primary_container` text. Use `xl` (0.75rem) roundedness. No shadows.
    - **Tertiary:** Purely text-based with `label-md` styling and a `primary` underline that appears on hover.
- **Cards:** Never use borders or heavy shadows. Use `surface_container_low` with a padding of `8` (2.75rem) to allow content to breathe. Use asymmetrical image ratios (e.g., 4:5 or 2:3) within cards.
- **Inputs:** Use the "Ghost Border" rule. The background should be `surface_container_lowest`. Labels should be `label-sm` and sit above the field, never inside.
- **Chips:** Small, Pill-shaped (`full` roundedness). Use `secondary_container` with `on_secondary_container` text. These should feel like soft pebbles.
- **Lists:** Prohibit divider lines. Use `spacing-6` (2rem) between list items to create separation through whitespace.
- **Signature Component - The Editorial Pull-Quote:** A combination of a large `display-sm` serif text in `primary` color, sitting asymmetrically against a macro skin-texture background.

---

## 6. Do's and Don'ts

### Do:
- **Do** use generous whitespace. If you think there is enough space, add 20% more.
- **Do** use macro imagery of skin as a "texture" for backgrounds, not just as isolated photos.
- **Do** overlap typography and imagery to create an editorial, high-fashion layout.
- **Do** use the `primary` (Lilac) color as a "light" source—subtle glows and soft accents.

### Don't:
- **Don't** use 1px solid black or high-contrast borders.
- **Don't** use standard "drop shadows." They break the organic, soft feel of the "Melanin Intuition" aesthetic.
- **Don't** center-align everything. Embrace the beauty of a left-aligned headline paired with a right-aligned image.
- **Don't** use vibrant, saturated colors outside of the defined palette. The luxury comes from the muted, tonal sophistication.