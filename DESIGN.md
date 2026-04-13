# Design Brief

## Direction
Premium academic coaching platform for "Rafi Sir – IDT Guru" — professional, trustworthy, aspirational teaching presence with clean, modern aesthetic.

## Tone
Cool, refined, editorial — professional authority grounded in light, airy simplicity inspired by platforms like Linear and Stripe.

## Differentiation
Gradient accents (blue → purple → gold) on headings and CTAs create visual richness while maintaining premium clarity; animated hero orb and smooth scroll interactions elevate engagement without excess decoration.

## Color Palette

| Token      | OKLCH           | Role                      |
| ---------- | --------------- | ------------------------- |
| background | 0.98 0.008 230  | Cool off-white base       |
| foreground | 0.18 0.015 230  | Deep text, high contrast  |
| card       | 1.0 0.004 230   | Clean white surfaces      |
| primary    | 0.42 0.14 240   | Deep ocean blue authority |
| secondary  | 0.45 0.18 280   | Purple highlights         |
| accent     | 0.6 0.15 70     | Warm gold prestige        |
| muted      | 0.95 0.01 230   | Subtle backgrounds        |
| destructive| 0.55 0.22 25    | Red error state           |

## Typography
- Display: Space Grotesk — bold, geometric authority for headings and hero
- Body: General Sans — refined, readable, professional for content and UI labels
- Scale: hero `text-6xl md:text-7xl tracking-tight`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base leading-relaxed`

## Elevation & Depth
Subtle shadows and glass-morphism create layered hierarchy: header elevated with minimal shadow, content cards have shadow-subtle/shadow-elevated for depth, footer grounded with border accent. No harsh shadows; all use primary/accent color with opacity.

## Structural Zones

| Zone    | Background         | Border       | Notes                                  |
| ------- | ------------------ | ------------ | -------------------------------------- |
| Header  | bg-card            | border-b     | Sticky, minimal shadow-subtle          |
| Hero    | gradient orb       | —            | Animated background with primary glow  |
| Content | bg-background      | —            | Spacious, section gaps 4-6rem          |
| Section | bg-muted/5-10%     | —            | Alternating for rhythm                 |
| CTA     | bg-primary/accent  | —            | Gold/purple gradient on hover          |
| Footer  | bg-muted/15%       | border-t     | Grounded, mid-tone                     |

## Spacing & Rhythm
Spacious sections (gap-16 to gap-24) with generous padding (px-6 md:px-12) create breathing room; micro-spacing within cards/components uses 4px grid (gap-2 to gap-4).

## Component Patterns
- Buttons: rounded-lg, primary blue or gold accent, hover scale 105% with shadow-elevated and glow effect
- Cards: rounded-lg, bg-card with shadow-subtle, hover:shadow-elevated transition-smooth
- Badges: pill-shaped (rounded-full), uppercase text-xs font-semibold, bg-muted/foreground text contrast

## Motion
- Entrance: Fade + scale 95→100 over 400ms on scroll via Intersection Observer
- Hover: Scale 102–105% with shadow elevation change over 200ms on buttons/cards
- Decorative: Float animation (±8px vertical) on hero illustrations, pulse-glow on CTA buttons

## Constraints
- No dark mode initially (light-only, cool serene aesthetic)
- Maintain 4.5:1 minimum contrast ratio (AA+) for all text
- Max 3 accent colors in any single section to avoid visual chaos
- Sticky navbar remains under 80px height for content breathing room

## Signature Detail
Gradient text accent on section headings (blue → purple → gold) paired with animated float effect creates premium, distinctive identity while maintaining academic clarity — achieved via CSS gradient with background-clip and keyframe animation.
