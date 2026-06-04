---
name: Luxe Editorial
colors:
  surface: '#fcf9f6'
  surface-dim: '#dcdad7'
  surface-bright: '#fcf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f0'
  surface-container: '#f0edea'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e5e2df'
  on-surface: '#1c1c1a'
  on-surface-variant: '#524346'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f3f0ed'
  outline: '#847376'
  outline-variant: '#d7c1c4'
  surface-tint: '#8d4a5b'
  primary: '#8a4758'
  on-primary: '#ffffff'
  primary-container: '#a75f71'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb1c2'
  secondary: '#735a34'
  on-secondary: '#ffffff'
  secondary-container: '#fddbaa'
  on-secondary-container: '#785e38'
  tertiary: '#615b58'
  on-tertiary: '#ffffff'
  tertiary-container: '#7a7370'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#ffb1c2'
  on-primary-fixed: '#3a0719'
  on-primary-fixed-variant: '#703344'
  secondary-fixed: '#ffddae'
  secondary-fixed-dim: '#e2c293'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#59431f'
  tertiary-fixed: '#eae1dd'
  tertiary-fixed-dim: '#cec5c1'
  on-tertiary-fixed: '#1f1b19'
  on-tertiary-fixed-variant: '#4b4643'
  background: '#fcf9f6'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2df'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-padding: 120px
---

## Brand & Style

This design system is crafted for the high-end beauty market in Lagos, blending the sophistication of premium editorial publishing with a modern, feminine service aesthetic. The brand personality is poised, exclusive, and meticulous—evoking the feeling of a private salon suite in Victoria Island.

The visual style follows a **Modern Minimalism** approach with a focus on **Editorial Typography**. It relies on high-contrast serif headlines to establish authority and grace, balanced by expansive whitespace that suggests luxury and breathing room. UI elements are kept understated to ensure the high-quality photography of services and products remains the focal point. The interface should feel like a tactile, high-gloss fashion magazine translated into a digital experience.

## Colors

The palette is rooted in soft, skin-adjacent neutrals and sophisticated accents.

- **Primary Background (#FAF7F4):** An off-white "linen" shade that provides more warmth and depth than pure white, reducing eye strain and feeling more "premium."
- **Primary Text (#1A1614):** A deep charcoal-brown, softer than pure black, maintaining high legibility while feeling organic.
- **Accent - Dusty Rose (#C4788A):** Used for primary actions and key highlights, providing a modern feminine touch without being overtly youthful.
- **Secondary Accent - Muted Sand/Gold (#B89A6E):** Used for decorative elements, sub-headers, or subtle UI indicators to reinforce the luxury aesthetic.
- **Muted Text (#8A8480):** Reserved for metadata, helper text, and placeholder states.

## Typography

The typographic hierarchy relies on the tension between the expressive **Playfair Display** and the functional **DM Sans**.

- **Serif (Headlines):** Use Playfair Display for all major headings. For a truly editorial look, use the "display-lg" style with tight letter spacing for hero sections.
- **Sans-Serif (Body & UI):** DM Sans is used for all functional text to ensure clarity. It should never compete with the serifs.
- **Label Caps:** Use the uppercase label style for category tags, navigation items, and small eyebrow text above headlines to create a structured, "branded" feel.
- **Alignment:** Lean toward left-aligned text for body copy and centered alignment for hero/introductory sections to maintain a balanced, formal layout.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to maintain editorial control over line lengths, and a fluid model for mobile devices.

- **Grid:** A 12-column system on desktop with a generous 80px outer margin. On mobile, transition to a 4-column system with 20px margins.
- **Vertical Rhythm:** A strict 8px baseline grid is used. Sections should be separated by large padding (120px on desktop) to emphasize the "luxury" of unused space.
- **Negative Space:** Do not fear empty columns. Use whitespace as a functional element to group content and direct the eye toward call-to-action buttons.

## Elevation & Depth

To maintain a minimalist and modern aesthetic, depth is created through **Tonal Layering** rather than heavy shadows.

- **Surface Levels:** The primary background (#FAF7F4) serves as the base. Content "cards" or containers use pure White (#FFFFFF) to subtly lift them off the page.
- **Shadows:** When necessary (e.g., floating book buttons or dropdown menus), use very soft, highly diffused ambient shadows. Use a 10% opacity of the Primary Text color with a 20px-30px blur. Avoid harsh, dark shadows.
- **Outlines:** Input fields and secondary buttons use low-contrast outlines in the Sand accent (#B89A6E) at a 1px weight to provide structure without clutter.

## Shapes

The shape language is **Soft and Architectural**. 

- **Corners:** Use a subtle 4px (0.25rem) radius for buttons and input fields to take the edge off the "brutalist" look while remaining more sophisticated than high-rounded "bubble" shapes.
- **Image Treatment:** Use "soft" corners for standard gallery images, but incorporate occasional **circular or arched frames** for featured service imagery to mimic high-end salon mirrors and editorial layouts.
- **Dividers:** Use very thin (1px) horizontal lines in the Gold accent to separate content sections or list items.

## Components

- **Primary Button:** Solid Dusty Rose (#C4788A) with White text. Use DM Sans (Label-Caps) for the label. Height should be 56px for a premium, easy-to-tap feel.
- **Secondary Button:** Outlined in Gold (#B89A6E) with Gold text. Transparent background.
- **Input Fields:** Bottom-border only or very light Sand outline. Placeholder text in Muted Text (#8A8480).
- **Service Lists:** Use the Serif font for service names with a thin Sand divider between items. Include a small arrow or '+' icon for interactivity.
- **Chips/Tags:** Small, pill-shaped containers with a Primary Background fill and Muted Text, used for categories like "Nails," "Lashes," or "New."
- **Cards:** White background, minimal soft shadow, and "Display" typography for titles. Ensure image-to-text ratios favor the image (60/40 split).