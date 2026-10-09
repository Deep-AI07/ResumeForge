# ResumeForge 📄⚡

> A modern, client-side, privacy-first ATS Resume Builder built with React, TypeScript, Vite, and Tailwind CSS.

ResumeForge empowers candidates to craft professional, ATS-optimized software engineering resumes with real-time feedback, customizable themes, and instantaneous PDF export.

---

## 🌟 Key Features

- **🛡️ Conditional ATS Compliance Auditor**:
  - Optional on-demand ATS checking (activates only when checked).
  - Deep evaluation: analyzes candidate contact completeness, executive summary density, quantifiable metrics (`%`, `$`, numbers), action verbs, chronology, and degree accreditation.
  - Theme-aware checks: detects non-standard monospaced fonts (e.g., Code Mono) and dashed dividers that trigger ATS parser penalties.
  - Strict Monochrome Mode for 100% legacy ATS scanner compatibility.

- **🎨 Multi-Theme System & Custom Theme Builder**:
  - Built-in presets: *Classic ATS, Modern Tech, Clean Mono, Executive Serif, Minimal Navy*.
  - **Create New Themes From Existing**: Pick any existing theme as a base template to spawn brand new personalized custom themes with bespoke typography, colors, alignments, and dividers without altering the original.
  - Multiple custom themes can be saved, edited, or deleted.

- **⚡ Real-Time Split-View Editor**:
  - Dual-pane layout: form editor on the left with live A4 portrait preview on the right.
  - Sub-forms for Personal Information, Technical Skills, Experience, Projects, and Education.

- **🔒 100% Client-Side Privacy & Persistence**:
  - Zero server transmission. All data remains exclusively in your browser's `localStorage`.
  - JSON import and export for effortless backup and cross-device editing.
  - One-click print styling optimized for clean, pixel-perfect A4 PDF generation.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Deep-AI07/ResumeForge.git

# Navigate into the project directory
cd ResumeForge

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be accessible at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to Vercel

1. Push this repository to your GitHub account (`Deep-AI07/ResumeForge`).
2. Visit [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" > "Project"**.
3. Import the `ResumeForge` repository.
4. Keep the default settings (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **"Deploy"**.

---

## 📄 License

MIT License. Free to use and customize.
