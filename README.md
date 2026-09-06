# Personal Website — Pablo Barroso González

> A professional, maintainable, and scalable personal website built to evolve alongside my technical journey.  
> **Live at:** https://Pablo-Barroso-Gonzalez.github.io

---

## 🎯 Purpose

This website serves as my digital identity and technical hub — not just a portfolio. It documents my evolution from broad exploration to deep specialization in:

**Python → CS Fundamentals → Linux → Networking → Systems → Cybersecurity / Red Team**

The site is intentionally transparent about my current level (student, building foundations) while demonstrating serious craftsmanship in its architecture, code quality, and documentation.

---

## 🏗️ Architecture

```
/personal-web/
├── index.html              # Entry point — single-page home (V1)
├── README.md               # This file — public documentation
├── .AI_CONTEXT.md          # Private AI context (gitignored)
├── .gitignore              # Extended ignore patterns
├── assets/
│   ├── fonts/              # Self-hosted fonts (future)
│   ├── images/             # Optimized images, project previews
│   └── icons/              # Favicons, SVG icons
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, type, breakpoints)
│   ├── reset.css           # Modern CSS reset/normalize
│   ├── base.css            # Typography, base elements, accessibility
│   ├── components.css      # Reusable component styles
│   ├── layout.css          # Page layout, grid, sections, responsive
│   └── main.css            # Entry point (imports all above)
├── js/
│   ├── main.js             # Initialization, event delegation
│   ├── navigation.js       # Sticky header, smooth scroll, mobile menu
│   └── utils.js            # Small utilities
├── pages/                  # Future: separate HTML pages
│   ├── about.html
│   ├── projects.html
│   ├── learning.html
│   ├── journey.html
│   ├── lab.html
│   └── contact.html
├── data/                   # Future: JSON content sources
│   ├── projects.json
│   ├── learning.json
│   └── journey.json
└── docs/                   # Technical documentation
    ├── architecture.md
    ├── decisions.md
    └── deployment.md
```

### Design Principles

| Principle | Application |
|-----------|-------------|
| **Quality > Speed** | Small, excellent V1 over large, mediocre one |
| **Composition > Effects** | Visual hierarchy, spacing, typography over animations |
| **Reality > Posturing** | Honest about learning stage, no fake metrics |
| **Scalability** | Structure grows with needs, not premature abstraction |
| **Maintainability** | Vanilla tech, clear separation, documented decisions |
| **Accessibility First** | Semantic HTML, contrast, keyboard nav, focus states |

---

## 🛠️ Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **HTML** | Semantic HTML5 | Accessibility, SEO, maintainability |
| **CSS** | Vanilla + Custom Properties | No build step, GitHub Pages native, theming via variables |
| **JS** | Vanilla ES6 Modules | Progressive enhancement, zero dependencies |
| **Fonts** | System UI stack (+ optional mono) | Performance, native feel, Apple/GitHub aesthetic |
| **Deploy** | GitHub Pages (root, `main` branch) | Simple, free, reliable |
| **Icons** | Inline SVG | Zero requests, styleable, accessible |

**No frameworks, no build tools, no unnecessary dependencies.** Each addition requires justification.

---

## 🎨 Design System (V1 Direction)

- **Base**: Black (`#000` / `#050505`) + dark grays (`#0f0f0f`, `#1a1a1a`, `#2a2a2a`)
- **Accent**: Deep blue family (defined in `css/variables.css`, tested in context)
- **Typography**: System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto...`) with JetBrains Mono for code/terminal elements
- **Spacing**: 4px base scale (4, 8, 16, 24, 32, 48, 64...)
- **Breakpoints**: Mobile-first (480, 768, 1024, 1280px)
- **Theme**: Dark-first, `prefers-color-scheme` support for future light mode

---

## 🚀 Local Development

### Prerequisites
- A modern browser
- A local static server (any will work)

### Quick Start

```bash
# Clone
git clone https://github.com/Pablo-Barroso-Gonzalez/Pablo-Barroso-Gonzalez.github.io.git
cd Pablo-Barroso-Gonzalez.github.io

# Option 1: Python (built-in)
python3 -m http.server 8000

# Option 2: Node (if installed)
npx serve .

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` (or the port shown).

### No Build Step Required
- CSS uses `@import` in `main.css` (works natively in modern browsers)
- JS uses ES modules with `<script type="module">`
- All paths are relative — works from any subdirectory

---

## 📦 Deployment

### GitHub Pages Configuration

| Setting | Value |
|---------|-------|
| **Source** | Deploy from a branch |
| **Branch** | `main` |
| **Folder** | `/` (root) |
| **Custom Domain** | Optional (add `CNAME` file if needed) |

### Deploy Process

```bash
# 1. Make changes
git add .
git commit -m "feat: descriptive message"

# 2. Push to main
git push origin main

# 3. GitHub Pages auto-deploys (check Actions tab)
# Live at: https://Pablo-Barroso-Gonzalez.github.io
```

### Commit Convention

```
<type>: <short description>

<longer explanation if needed>

Types: feat, fix, docs, style, refactor, perf, test, chore, ci
```

Examples:
- `feat: add projects section with two project cards`
- `fix: improve mobile navigation menu accessibility`
- `docs: update architecture decisions in docs/decisions.md`
- `style: refine hero typography and spacing`
- `refactor: split navigation styles into components.css`

---

## 📊 Current Status (V1 In Progress)

| Area | Status | Notes |
|------|--------|-------|
| **Repository Structure** | ✅ Done | Directories created, .gitignore extended |
| **Public Documentation** | ✅ Done | This README |
| **Design Tokens (CSS Variables)** | 🔄 In Progress | `css/variables.css` next |
| **Reset & Base Styles** | ⏳ Pending | `css/reset.css`, `css/base.css` |
| **Layout & Components** | ⏳ Pending | `css/layout.css`, `css/components.css` |
| **Home Page HTML** | ⏳ Pending | Semantic sections: Hero, About, Currently, Projects, Learning, Journey, Contact |
| **Navigation JS** | ⏳ Pending | Sticky header, smooth scroll, mobile menu |
| **Responsive Verification** | ⏳ Pending | 320px → 1440px+ |
| **Accessibility Audit** | ⏳ Pending | axe/WAVE, keyboard nav, contrast |
| **GitHub Pages Deploy** | ⏳ Pending | Verify live deployment |

---

## 🧭 Roadmap

### Phase 1 — Foundation (Current)
- [x] Repository structure & documentation
- [ ] Design system (variables, reset, base)
- [ ] Home page with all sections
- [ ] Navigation & responsive layout
- [ ] Deploy verification

### Phase 2 — Content Depth
- [ ] Project detail views (when warranted)
- [ ] Expanded Learning section with status badges
- [ ] Journey/Timeline component
- [ ] Lab/Experiments section

### Phase 3 — Specialization
- [ ] Blog/Write-ups system (when content exists)
- [ ] Portfolio specialization (separate pages or subdomain)
- [ ] CV/Resume page
- [ ] Technical articles

### Ongoing
- [ ] Architecture Decision Records in `docs/decisions.md`
- [ ] Performance monitoring
- [ ] Accessibility improvements
- [ ] Content updates as I learn/build

---

## 🤝 Contributing

This is a personal project, but feedback is welcome via:
- **Issues**: Bug reports, accessibility concerns, suggestions
- **Discussions**: Design decisions, technical approaches

---

## 📄 License

MIT License — feel free to learn from the architecture and code.  
Attribution appreciated if you adapt significant portions.

---

## 🔗 Links

- **Live Site**: https://Pablo-Barroso-Gonzalez.github.io
- **GitHub**: https://github.com/Pablo-Barroso-Gonzalez
- **LinkedIn**: [Add when ready]

---

*Built with intention. Evolving with purpose.*