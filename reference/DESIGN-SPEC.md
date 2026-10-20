# riseoak.com — design spec (extracted from /reference)

Sources: `css/wp-content/uploads/elementor/css/post-5.css` (global kit), `post-984.css` (homepage),
`post-2521.css` (header), `post-2640.css` (footer), `post-2517.css` (mobile menu popup),
Elementor/Hello theme base CSS. Breakpoints: tablet ≤1024px, mobile ≤767px.

## Colors

| Token | Value | Used for |
|---|---|---|
| Text / primary | `#242728` | Headings, body text (kit primary/secondary/text) |
| Brand blue | `#0000FF` | Primary buttons bg, outline-button text & border |
| Blue hover | `#0609CD` | Primary button hover/focus |
| Outline hover | `#B3C8FF` | Outline button hover bg (popup: `#E8EFFF`) |
| Card gradient | `linear-gradient(180deg, #0000FF30 0%, #0000FF12 100%)` | Service cards |
| Card icon | `#0000FF96` | Service card icons |
| Tint section bg | `#F5F5FF` | Alternating sections |
| White | `#FFFFFF` | Page bg, alternating sections |
| Check icon | `#39B54A` | Icon lists (fa-check-circle) |
| Logo-strip heading | `#322F2F` | "Some MSPs We've Helped" |
| Carousel arrows | `#B9B3B3` | Swiper prev/next |
| Link blue | `#2C4AD5` | "Explore All" |
| Accordion active | `#211E1E` | FAQ title/icon when open |
| Footer bg | `#3A3A3A` | Footer, white text |
| Kit accents (unused on home) | `#FF3D42`, `#FEA31D`, `#FF8400`, `#FFF4D3` | — |

## Fonts

- **Roboto** for everything (weights 400/500/600/700, italic for testimonials). Self-hosted Google Fonts, 100–900.
- **Roboto Slab** 400 — testimonial card job titles (kit secondary typography).
- Theme base: body 16px / line-height 1.5; h1–h6 line-height 1.2, margin 0.5rem top / 1rem bottom.
- Elementor heading widget titles: margin 0, line-height 1 unless overridden. Kit h2: 35px/600/50px line-height; kit h3: 23px/500.

## Type scale (desktop → tablet → mobile)

| Element | Size | Weight | Line height |
|---|---|---|---|
| Hero H1 | 63 → 53 → 32px | 700 | 75px → 1.2em |
| Hero H2 subtitle | 39 → 33 → 28px | 600 | 50px (kit) → 1.2em mobile |
| Section H2 | 39 → 33 → 28px | 600 | 50px (kit) → 1.2em mobile |
| "MSP Marketing Academy" H2 | 44 → 44 → 27px | 600 | kit |
| Logo strip H3 | 23 → 23 → 18px | 600 | 1 |
| Pain/Reasons icon list | 24 → 20/19 → 18px | 400 | 1.5 |
| Service card title | 25 → 21 → 22px | 500 | 1.2 |
| Service card text | 18 → 16 → 17px | 400 | 1.5 |
| Video testimonial quote | 20 → 15px | 400 | 1.5 |
| Video testimonial name (H3) | 23 → 19px | 500 | 1 |
| Video testimonial role | 18 → 13px | 400 | 1.5 |
| Card testimonial quote | 17px italic | 400 | 1.4em |
| Card testimonial name / job | 20 (18 tablet) / 15px | 600 / 400 Slab | 1.5 |
| FAQ title / answer | 23 → 19 / 20 → 15px | 400 | 1 / 1.5 |
| Blog post title | 32 → 22px | 600 | 1 |
| Nav items | 17px, letter-spacing -0.45px | 400 | 24px |
| Footer text/links | 20px (copyright 15 mobile) | 400 | 32px links |

## Buttons

| Variant | Spec |
|---|---|
| Primary (hero/CTA) | bg `#0000FF`, white, Roboto 19px/400 (17 tablet, 15 mobile), padding 18px 22px, radius 5px, no border, line-height 1; hover `#0609CD` |
| Outline (hero/CTA) | bg white, `#0000FF` text, solid `#0000FF` border (no width set → browser `medium` = 3px), padding 15px 20px, radius 5px, 19px; hover bg `#B3C8FF` |
| Header primary | bg `#0000FF`, white, 14px/500, letter-spacing 1.53px, line-height 1.3em, padding 10px 20px, radius 4px |
| Header outline | white bg, `#0000FF` text, 3px `#0000FF` border, 14px/500, padding 8px 20px, radius 4px |
| Mobile CTA (final) | padding 14px |

## Layout & spacing

- Boxed container max-width **1140px**; columns have 10px inner padding (Elementor default gap); widgets 20px bottom spacing.
- Header: white, 1px bottom border `#000`, shadow `0 0 6px rgba(0,0,0,.5)`, min-height 8vh, padding 0 5%, container 1146px. Logo column 34.859% (logo img 37% of column). Desktop header hidden ≤1024px; tablet/mobile header = logo + hamburger opening a right-side 300px off-canvas menu on `rgba(0,0,0,.8)` overlay.
- Section paddings (desktop): hero 45/0/0; logos 0/0/40; pain 40/0; services 60/0; reasons 40/0; AI CTA 40/0; results heading 40/0/0; each video row 40/0; card testimonials 10/0/70; steps 40/0/0; final CTA 0/0/40; FAQ 40/0; academy 0/0/65 (min-height 728px). Tablet adds 20px side padding, mobile 15px.
- Inner max-widths: hero buttons row 650px (500 tablet); logo strip 625px; pain list 659px (557 tablet); reasons list 1000px; FAQ 853px; footer row 682px.

## Section backgrounds (order)

1. Hero — `#FFFFFF`
2. Client logo carousel — `#FFFFFF`
3. Pain points — `#F5F5FF`
4. Services (6 gradient cards, radius 12px, 10px side margins, 20px row gap) — `#FFFFFF`
5. Reasons — `#F5F5FF`
6. "Get Ahead" AI CTA — `#FFFFFF`
7. Results heading + 8 video testimonials — `#F5F5FF`
8. 2 card testimonials (white, radius 5px, shadow `0 0 25px rgba(0,0,0,.15)`, hover `0 0 55px rgba(0,0,0,.31)`, padding 35px) — `#F5F5FF`
9. 4 steps (image-box, img 17% width) — `#FFFFFF`
10. Final CTA — `#FFFFFF`
11. FAQs accordion — `#F5F5FF`
12. MSP Marketing Academy (2-col posts, card shadow `0 0 10px rgba(0,0,0,.5)`, 0.66 thumb ratio, column gap 56px) — `#FFFFFF`
13. Footer — `#3A3A3A`

## Widgets

- Video testimonial rows: 50/50 columns; left YouTube 16:9; right nested row, photo column 25.636% (img radius 81px), text 74.364%. Name/role pulled up with -18px margin.
- Logo carousel: Swiper, 4 slides/view, 50px gap (10px tablet/mobile), loop, arrows (`eicon-chevron` 25px `#B9B3B3`), bullets 6px, main swiper 79% width × 143px, slide padding 27px, images background-size cover.
- Icons: Font Awesome 5.15 solid (`check-circle`, `paper-plane`, `globe`, `bahai`, `map-marked-alt`, `pen-alt`, `crown`, `caret-right/down`, `bars`).
