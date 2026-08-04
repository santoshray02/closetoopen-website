# Antigravity CLI (`agy`) Workspace Rules & Directives
## Project: CloseToOpen.in — Ram Kishor Jha Advisory Ecosystem

---

### 1. 📌 Project Identity & Business Goals
- **Brand**: CloseToOpen.in (`https://closetoopen.in`)
- **Owner & Principal**: Ram Kishor Jha ([LinkedIn Profile](https://www.linkedin.com/in/ram-kishor-jha-92948a9b/))
- **Core Mission**: Close legacy career plateaus and inefficient business habits; open high-leverage execution channels and sustainable revenue scaling.

---

### 2. 🛠️ Tech Stack & Coding Standards
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism + Custom Mesh Gradients (`src/index.css`)
- **Icons & Visuals**: Lucide React + Custom SVG Brand Icons (`src/components/BrandIcons.jsx`)
- **Animations**: Framer Motion + Ambient Canvas Particle Physics (`src/components/AmbientBackground.jsx`)
- **Build Verification**: Always verify changes by running `npm run build` before committing.

---

### 3. 🔑 Git & SSH Repository Directive
- **GitHub Repository**: `git@github.com:santoshray02/closetoopen-website.git` (SSH Protocol)
- **Primary Branch**: `main`
- **Workflow**:
  ```bash
  git add .
  git commit -m "Description of changes"
  git push origin main
  ```

---

### 4. 🌐 Deployment & Domain Directives
- **Host**: Netlify (Continuous Deployment via [`netlify.toml`](file:///home/santosh/projects/experiments/closetoopen/netlify.toml))
- **Custom Domain**: `closetoopen.in` (GoDaddy DNS)
  - **A Record**: `@` -> `75.2.60.5`
  - **CNAME**: `www` -> `<netlify-subdomain>.netlify.app`

---

### 5. 🤖 Antigravity Agent Directives
When developing, maintaining, or modifying `CloseToOpen.in` via `agy`:
1. Preserve all interactive components (`AiMentorWidget`, `RoiCalculator`, `ReadinessAssessment`, `BookingModal`).
2. Maintain zero-fluff, executive-grade design aesthetics (Dark Obsidian theme `#090D16`, glowing accents `#3B82F6` & `#8B5CF6`).
3. Keep all file changes clean and execute `npm run build` to confirm zero lint/compilation errors.
