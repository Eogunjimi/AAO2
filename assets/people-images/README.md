# Images on the AAO Engineering site that contain people

Every image on the site in which one or more people are visible — 18 files, reviewed at
full resolution rather than by filename.

**Total size:** ~1.7 MB · **Originals:** `public/images/` (this folder is a curated copy,
so deleting it changes nothing about the built site)

---

## 1. `photos/` — people at work (8 files)

| File                     | Size     | Who / what                                                                         | Where it appears on the site                                                                                           |
| ------------------------ | -------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aao-cctv.jpg`           | 1672×941 | Male technician in hard hat on a ladder mounting a dome CCTV camera                | CCTV & surveillance service cards (`services.js` ×4), project cards (`projects.js` ×3), blog post                      |
| `aao-electrical.jpg`     | 1672×941 | Male electrician wiring a distribution board                                       | Electrical service cards (`services.js` ×3), service-page intros (`servicePages.js` ×2), project cards (×2), blog post |
| `aao-network.jpg`        | 1672×941 | Male network engineer patching a rack, **plus 3 office workers** in the background | Networking/ICT service cards (`services.js` ×3), project card, blog post                                               |
| `about-engineer.jpg`     | 922×1152 | Male engineer in hard hat reading the inverter panel with a multimeter (portrait)  | Hero image on the solar/inverter service page (`servicePages.js`)                                                      |
| `service-electrical.jpg` | 1672×941 | Male electrician kneeling to install wall sockets                                  | Hero image on the electrical service page (`servicePages.js`)                                                          |
| `service-power-gen.jpg`  | 1672×941 | Male technician servicing a switchboard beside a standby generator                 | Hero image on the generator service page, project card                                                                 |
| `ion-hero.jpg`           | 1376×768 | **Two** rooftop installers handling and fixing a solar panel                       | Home-page hero (`HomePage.jsx`), project card                                                                          |
| `warm-craft.jpg`         | 1408×768 | Male installer drilling panel rail on a tiled roof                                 | Not currently referenced by any page (legacy `solara-warm-luxury` prototype only)                                      |

## 2. `review-avatars/` — customer testimonial headshots (6 files)

144×144 px portraits, one per review in `src/data/reviews.js`.

| File                          | Review author    | Location      |
| ----------------------------- | ---------------- | ------------- |
| `review-avatar-bakare.jpg`    | Mrs. A. Bakare   | Lekki Phase 1 |
| `review-avatar-okonkwo.jpg`   | T. Okonkwo       | Magodo GRA    |
| `review-avatar-adeyemi.jpg`   | Engr. E. Adeyemi | Ikeja GRA     |
| `review-avatar-fernandez.jpg` | L. Fernandez     | Ajah          |
| `review-avatar-adewale.jpg`   | B. Adewale       | VGC           |
| `review-avatar-chukwu.jpg`    | F. Chukwu        | Yaba          |

## 3. `hero-avatars/` — hero trust-cluster avatars (4 files)

96×96 px WebP portraits, defined in `HeroSection.jsx` (alt text in brackets).

| File                 | Alt text                  |
| -------------------- | ------------------------- |
| `hero-avatar-1.webp` | Nigerian homeowner        |
| `hero-avatar-2.webp` | Nigerian contractor       |
| `hero-avatar-3.webp` | Nigerian business owner   |
| `hero-avatar-4.webp` | Nigerian facility manager |

---

## Method — and the one image worth knowing about

All 44 raster images in `public/images/` were reviewed. Two notes:

- **`ion-hero.jpg` is easy to miss.** The two installers are small and off-centre; at
  thumbnail scale the file reads as "just a roof". It is currently the home-page hero,
  so it is the most-seen people-image on the site.
- An OpenCV Haar/HOG pass was run as a cross-check. It was **not** used to decide the
  list: it fired on palm fronds, clouds, roof tiles and letterforms in the website-mockup
  screenshots, while missing the `ion-hero.jpg` installers entirely. Every candidate
  region was cropped at full resolution and checked by eye instead.

## Deliberately excluded (no people)

`aao-gate.jpg` · `area-*.jpg` (10 area-page photos) · `hero-solar.jpg` · `ion-home1.jpg` ·
`ion-home2.jpg` · `og-default.jpg` · `project-commercial.jpg` · `project-villa.jpg` ·
`warm-detail.jpg` · `warm-hero.jpg` · `warm-living.jpg` · `web-01…06` (six website-mockup
screenshots) · all favicon/icon assets.

`og-default.jpg` was checked twice: the shapes near the warehouse are an excavator and
rubble, not people.
