# Glomatic Space® — Brand Identity & Digital Growth

A modern, high-performance React application for **Glomatic Space®**, a creative agency specializing in graphic design, brand identity, digital marketing, and growth.

## Features

- **Modern React + TypeScript Architecture**: Rewritten as a modular, responsive single-page application built on Vite and React 19.
- **Orbital Visual System & Parallax**: Custom canvas & CSS orbital stage with smooth desktop pointer tracking, animated satellite paths, and responsive scaling.
- **Interactive Capabilities Marquee**: Infinite smooth ticker banner highlighting agency disciplines.
- **Disciplines & Services**:
  - *Graphic Design & Brand Identity* (Visual systems, logo suites, art direction, and typography board).
  - *Digital Marketing & Growth* (Connected campaign framework, channel maps, and interactive growth network SVG).
- **Concept Projects Portfolio**:
  - Filterable by disciplines (*All*, *Brand Identity*, *Graphic Design*, *Digital Marketing*).
  - 6 concept case studies (*Aster House*, *Common Ground*, *Noma Skin*, *Afterlight Sessions*, *Field Notes*, *Kanso Objects*).
  - Accessible modal dialogs with full brief, creative direction, deliverables checklist, and direct inquiry handoff.
- **Studio Approach & Orbit Explorer**:
  - Interactive "Identity lens" vs. "Growth lens" mode switcher updating dynamic orbital focal points and principles.
  - Core studio standards (System, Rationale, Clarity, Usefulness).
- **4-Stage Process Methodology**: Visual milestone progression from Discovery, Strategy, Creation to Launch & Iteration.
- **Interactive Multi-Step Project Estimator**:
  - Step 1: Client profile and contact details with real-time validation.
  - Step 2: Service selection, detailed project description with character counter, budget currency selector, and timeline options.
  - Step 3: Conditional scope deep-dives (design deliverables, marketing platforms, goals, or open challenge scoping) and contact method preferences (Email, WhatsApp, Phone).
  - Review & Action: Formatted plain-text brief summary, single-click clipboard copy, `.txt` file download, pre-populated email draft (`mailto:`), and direct submission to configured endpoints.
- **Direct Studio Contact & Footer**: Configured email, phone, WhatsApp, and social media channels.

## Development & Build

```bash
# Install dependencies
npm install

# Start development server (Port 3000)
npm run dev

# Run TypeScript type checks
npm run lint

# Build production bundle
npm run build
```

## Configuration

Business details and form integration endpoints can be configured in `src/data/config.ts`:

- `SITE_CONFIG.formEndpoint`: Optional CORS-enabled endpoint for direct form delivery.
- `SITE_CONFIG.contactEmail`: Studio email for email drafts and contact links.
- `SITE_CONFIG.phone`: Studio telephone number.
- `SITE_CONFIG.whatsapp`: WhatsApp number with country code.
- `SITE_CONFIG.socials`: Array of social platform links.