# System 7 Portfolio OS (Web App)

This package contains the graphical, web-based version of my portfolio. It is a high-fidelity, interactive retro Macintosh System 7 desktop experience built with modern web technologies.

---

## Design Philosophy & UI/UX

This project is not just a visual theme; it is a strict adherence to classic human-centered UI/UX principles, specifically reverse-engineered from early 1990s Macintosh operating systems.

- **Fitts's Law Application:** The global Menu Bar is pinned flush against the absolute top edge of the viewport, creating an infinite target area for mouse navigation.
- **1-Bit Architecture:** Absolute pixels. Zero modern gradients, zero anti-aliased smoothing, and harsh, un-feathered drop shadows (`2px 2px 0 #000`).
- **High-Contrast Typography:** Implements localized chunky, pixelated font families (e.g., Chicago) optimized for readability without modern font-smoothing.
- **Gestalt Principles:** Strict window borders, distinct geometric boundaries, and intentional use of negative space to separate active components from the desktop canvas.

---

## Technical Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Library | React |
| Styling | Tailwind CSS (Utility-first with custom CSS variables for 1-bit scanlines) |
| Language | TypeScript |

---

## Core Features

- **Global Menu Bar:** Fixed top navigation component.
- **Dynamic Desktop Grid:** Side-by-side rendering of the active application window and desktop icons (pinned to the right edge).
- **Icon Logic:** Classic group-hover inversion states (black box, white lines) mirroring the original System 7 selection behavior.
- **Custom Scanlines:** Mathematical `repeating-linear-gradient` implementations for authentic title bar and desktop textures.

---

## Development

To run this specific app within the monorepo:

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the GUI.
