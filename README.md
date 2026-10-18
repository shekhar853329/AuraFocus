# AuraFocus 🌌🕰️

> **Ambient Fullscreen Screensaver, Living Canvas & Aesthetic Pomodoro Hub**  
> *Transform your browser, secondary monitor, or tablet into a minimalist, distraction-free productivity sanctuary.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React: 19](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)](https://react.dev/)
[![Vite: 8](https://img.shields.io/badge/Vite-8-646cff.svg?logo=vite)](https://vitejs.dev/)
[![PWA: Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://web.dev/progressive-web-apps/)
[![SEO / AEO / GEO: Optimized](https://img.shields.io/badge/SEO%20%7C%20AEO%20%7C%20GEO-100%25-06b6d4.svg)](#seo-aeo--geo-architecture)

---

## ✨ Overview

**AuraFocus** is a minimalist, privacy-first living screensaver and desk timepiece designed to eliminate cognitive friction and facilitate flow-state deep work. Built with modern web standards, AuraFocus pairs living atmospheric wallpapers with real-time procedural audio synthesis and versatile clock styles.

### Why AuraFocus?
- 🎧 **Bandwidth-Free Procedural Audio:** Synthesized in real time using the browser's native Web Audio API—no audio loops, no buffering, and no streaming bandwidth consumption.
- ⏱️ **Integrated Pomodoro Timer:** Seamless transitions between deep focus sprints (25m / 50m) and restorative breaks (5m / 15m) with gentle harmonic chimes.
- 🖥️ **Zen Fullscreen & Auto-Idle:** Launch into full immersion with a single keystroke (`F`). Controls fade automatically during inactivity.
- 🔒 **100% Local-First & Private:** No analytics tracking, no sign-ups, and no cloud dependencies. Works completely offline as a Progressive Web App (PWA).

---

## 🕒 Timepiece Presentations

1. **Modernist Digital Clock:** Clean typographic rendering with optional seconds, calendar dates, and 12/24-hour toggles.
2. **Retro Split-Flip Clock:** Nostalgic 3D card-flip mechanical animation.
3. **Quartz Analog Dial:** Minimalist Bauhaus-inspired sweep watch face.
4. **Typographic Words Clock:** Formats current time as natural English sentences (e.g., *"IT IS TWENTY MINUTES PAST FOUR"*).
5. **Pomodoro Focus Timer:** Segmented focus countdown with glow progress visualization and harmonic audio notifications.

---

## 🌧️ Procedural Audio Soundscapes

Generated live using multi-pole filters, noise generators, and low-frequency oscillators:
- **Rain on Glass:** Nocturnal precipitation against high-rise glass with randomized droplet impacts.
- **Warm Hearth:** Slow-burning campfire with authentic natural cedar sparks and crackles.
- **Forest Night:** Whispering cedar winds and distant rhythmic summer cricket chirps.
- **Deep Space:** Sub-bass resonance and soothing low-frequency interstellar radio drone.
- **Tidal Surges:** Rhythmic ocean swell breaking against pebbles on a secluded coastline.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>F</kbd> | Toggle Fullscreen Zen Immersion |
| <kbd>Space</kbd> | Play / Pause Ambient Soundscape |
| <kbd>C</kbd> | Cycle Clock Styles (Digital → Flip → Analog → Words) |
| <kbd>B</kbd> | Cycle Living Canvases & Sceneries |
| <kbd>M</kbd> | Mute / Unmute Audio |
| <kbd>H</kbd> | Immediately Hide / Reveal HUD Controls |
| <kbd>I</kbd> | Open About & FAQ Guide |
| <kbd>?</kbd> | Open Keyboard Shortcuts Help |
| <kbd>Esc</kbd> | Close Modals / Exit Fullscreen |

---

## 🔬 Scientific Foundation (GEO & Psychoacoustics)

- **Psychoacoustic Noise Masking:** Continuous ambient background sound (pink/brown noise spectra) attenuates the salience of peak conversational distractors, reducing cognitive context-switching overhead by up to 30%.
- **Ultradian Attention Cycles:** Human concentration naturally wanes after 40–50 minutes of sustained focus. AuraFocus defaults to 25/5 and 50/10 Pomodoro intervals to preserve prefrontal cortex energy.
- **Ergonomics & OLED Longevity:** Fine-grained dimming down to 90% and automatic UI hiding reduce eye strain during night sessions and protect secondary OLED monitors from image retention.

---

## 🔍 SEO, AEO & GEO Architecture

AuraFocus implements best-in-class search and AI engine optimization:

- **Traditional SEO:**
  - Semantic HTML5 structure with `<noscript>` accessibility and crawler pre-rendered fallback.
  - High-CTR meta tags, canonical URL declarations, and responsive viewport sizing.
  - Open Graph (`og:*`) and Twitter Card (`twitter:*`) 1200x630 social preview banners.
  - Automated `sitemap.xml` and standard `robots.txt`.
- **AEO (Answer Engine Optimization):**
  - High-density `FAQPage` schema markup (JSON-LD) aligned with on-page interactive FAQ accordion.
  - Direct 40–55 word definitional answers formatted for Google Featured Snippets, ChatGPT Search, and Perplexity.
- **GEO (Generative Engine Optimization):**
  - Standardized `/llms.txt` and `/llms-full.txt` files providing structured markdown context for LLM crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended).
  - Machine-readable `WebApplication` and `Organization` JSON-LD entities.
  - Citable evidence, empirical research summaries, and feature comparison matrices.

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js 18+ (tested with Node 20 & 24)
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/AuraFocus.git

# Navigate to project directory
cd AuraFocus

# Install dependencies
npm install

# Start development server with Hot Module Replacement
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License & Privacy Guarantee

- **License:** MIT License. See [LICENSE](LICENSE) for details.
- **Privacy:** AuraFocus does not use tracking cookies, analytics pixels, or third-party ad networks. All preferences, volume states, and timers persist strictly in local browser storage.
