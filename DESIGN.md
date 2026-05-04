# Design Brief

## Direction

Cute Pastel School Portal — A warm, approachable dark-mode start page with soft glowing ambient effects and rounded, friendly typography that welcomes students into their school tool dashboard.

## Tone

Playful yet refined. Soft pastel color palette (pink, lavender, mint, peach) layered over a deep cool-dark background with subtle ambient gradient glows, creating an inviting, intimate digital space.

## Differentiation

Ambient soft-glow orbs (pink, teal, purple) create atmospheric depth behind card layouts. Time-aware gradient greeting header with emoji establishes emotional connection on page load.

## Color Palette

| Token | OKLCH | Role |
| --- | --- | --- |
| background | 0.12 0.01 280 | Deep navy-blue, cool and calm |
| foreground | 0.93 0.01 280 | Off-white, soft and warm |
| card | 0.16 0.02 280 | Slightly elevated from background |
| primary | 0.65 0.12 15 | Soft pink for highlights and accents |
| secondary | 0.62 0.10 280 | Soft lavender for secondary actions |
| accent | 0.70 0.08 190 | Soft teal/mint for interactive elements |
| muted | 0.25 0.01 280 | Medium grey for tertiary text |
| border | 0.22 0.02 280 | Subtle dark border |

## Typography

- Display: Nunito — Time-aware greeting header with pink-to-peach gradient, hero scale (text-5xl md:text-7xl bold)
- Body: Nunito — All UI labels, section headers, card text (text-base md:text-lg)
- Scale: Hero `text-5xl md:text-7xl font-bold tracking-tight`, Sections `text-2xl font-bold`, Labels `text-sm font-semibold uppercase`, Body `text-base`

## Elevation & Depth

Flat card surfaces on layered backgrounds. Subtle soft-glow orbs positioned behind content add atmospheric depth without casting shadows. Cards sit on the ambient glow layer, creating visual separation without harsh elevation.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | Same as background | None | Time/date pill at center-top, gradient greeting below |
| Content (Cards) | card token (0.16 0.02 280) | None | Rounded 24px, soft background on glow layer |
| Footer | Same as background | None | Small muted text at bottom |
| Ambient | Glow orbs | None | Pink + teal + purple radial gradients, positioned behind all content |

## Spacing & Rhythm

Generous vertical spacing (gap-8 between sections) creates breathing room. Card grids use gap-6. Top/bottom padding on page is 4rem. Micro-spacing inside cards: label-to-icon 0.5rem, section title-to-cards 1.5rem.

## Component Patterns

- Buttons: Rounded pill (rounded-full), primary pink background, white text, hover: scale(1.05), smooth transition
- Cards: Rounded 24px (rounded-2xl), background card token, no border, hover: slight lift and glow intensify
- Badges/Sections: Simple text labels in uppercase, text-sm, tracking-widest, muted foreground, placed above card grids

## Motion

- Entrance: Fade in + scale (0.95 → 1) over 0.6s on load, staggered per section (200ms offset)
- Hover: Card lift (transform: translateY(-4px)), smooth 0.3s easing
- Decorative: Subtle ambient glow opacity pulse

## Constraints

- Dark mode only — no light mode toggle
- All colors in OKLCH, no hex or rgb literals
- Rounded corners 24px for cards, 16px for interactive elements
- Font: Nunito exclusively
- No shadows on cards — depth via background + ambient glow only

## Signature Detail

Soft ambient gradient glows (pink, teal, purple radial gradients) positioned behind content grid create intimate atmospheric frame. Time-aware greeting gradient establishes warm digital space.
