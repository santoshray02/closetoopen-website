# CloseToOpen.in — Personal Career & Business Advisory Portfolio
### Dedicated Platform for Ram Kishor Jha

**CloseToOpen.in** (`https://closetoopen.in`) is a strategic career, leadership, and business advisory platform built for **Ram Kishor Jha** ([LinkedIn Profile](https://www.linkedin.com/in/ram-kishor-jha-92948a9b/)).

---

## 🌟 Strategic Positioning & Philosophy
- **Brand Name**: `CloseToOpen` (Close old bottlenecks, open high-leverage growth opportunities).
- **Target Audience**: Ambitious professionals seeking career acceleration, mid-career managers, startup founders, and enterprise teams.
- **Key Offerings**:
  1. **1-on-1 Executive & Career Mentorship**
  2. **Startup & Business Scaling Advisory**
  3. **Corporate Keynotes & Workshops**
  4. **Deal & Strategic Growth Readiness**

---

## 🚀 Key Interactive Features Built-In
- **Interactive Career & Business Readiness Scorecard**: Diagnostic widget that calculates a real-time growth score (%) and provides tailored action plans.
- **Appointment & Strategy Call Booking Engine**: Integrated modal with `.ics` calendar invitation download and direct WhatsApp launch.
- **Knowledge & Insight Hub**: Searchable playbooks & articles with an interactive reader modal.
- **Career & Milestones Timeline**: Vertical visual view of executive leadership history.
- **Interactive Netlify & GoDaddy Deployment Guide**: Built right into the navbar & footer for site administrator ease.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism & Mesh Gradients
- **Icons**: Lucide React + Custom SVG Brand Vector Icons
- **Deployment Target**: Netlify
- **Domain**: GoDaddy (`closetoopen.in`)

---

## 📦 How to Push to GitHub & Deploy to Netlify

### Step 1: Push to GitHub
Run the following commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/closetoopen.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** -> **Import an existing project** -> Select **GitHub**.
3. Pick your `closetoopen` repository.
4. Netlify will detect `netlify.toml` automatically:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Deploy site**.

### Step 3: Map GoDaddy Custom Domain (`closetoopen.in`)
1. In Netlify Site Settings -> **Domain Management** -> Click **Add custom domain** -> enter `closetoopen.in`.
2. Go to your **GoDaddy Domain Control Panel** -> `closetoopen.in` -> **DNS Management**.
3. Add/Update the following DNS records:
   - **A Record**: Host `@` -> Points to `75.2.60.5`
   - **CNAME Record**: Host `www` -> Points to `your-site-name.netlify.app`
4. Netlify will issue an automatic free SSL certificate (HTTPS) within 15 minutes!

---

## 🤖 Antigravity CLI (`agy`) Developer Instructions

This repository is fully configured for **Google Antigravity CLI (`agy`)**.

### Quick CLI Commands:
```bash
# Launch Antigravity CLI inside this project
agy

# Direct AI feature expansion commands
agy "Add a new playbook article on executive salary negotiation to data/portfolioData.js"
agy "Run build test and push updates via SSH"
```

### Project Workspace Rules:
Antigravity CLI rules for this portfolio are specified in [`.gemini/rules.md`](.gemini/rules.md):
- **Git Remote**: `git@github.com:santoshray02/closetoopen-website.git`
- **Build Verification**: `npm run build`
- **Design System**: Dark Obsidian (`#090D16`), Glassmorphism, Tailwind CSS v4, Motion

---

## 🏃 Local Development
```bash
npm install
npm run dev
```

Built with ❤️ for Ram Kishor Jha.
