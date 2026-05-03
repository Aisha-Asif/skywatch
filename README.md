# SKYWATCH PRO — Meteorological Command System

> A high-density tactical interface for atmospheric monitoring, emergency broadcast management, and distributed sensor network operations — built for specialists who need clarity under pressure.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-private-red?style=flat-square)

---

## Table of Contents

- [Overview](#overview)
- [Core Modules](#core-modules)
- [HCI Design Principles](#hci-design-principles)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Development](#setup--development)
- [User Roles](#user-roles)
- [Data Models](#data-models)
- [Deployment](#deployment)

---

## Overview

SkyWatch Pro is a **pure frontend** meteorological command system — no backend, no API keys required. It is designed for emergency response specialists, field operators, and meteorologists who need fast, unambiguous access to atmospheric intelligence during high-stakes scenarios.

The system is engineered with **Human-Computer Interaction (HCI)** principles at its core, ensuring cognitive load remains minimal even in emergency conditions.

---

## Core Modules

### 📡 Dashboard
A **Bento-grid layout** for high-density atmospheric metric display. Surfaces primary indicators — temperature, threat level, wind speed, humidity — alongside tactical situational maps. Live system-sync status is always visible via a persistent toast indicator showing node count and network health.

### 🚨 Tactical Alerts (Alert Center)
A unified interface for issuing and managing **regional emergency broadcasts**. Supports Tornado, Flood, Heatwave, and Cyclone alert types. Each alert tracks its severity vector (Normal → Warning → Emergency), affected zone, issue timestamp, and operational description.

### 📶 Sensor Grid (Sensor Monitoring)
Hardware-level status tracking for distributed node networks. Monitors Alpha and Gamma stations across the sensor mesh, surfacing active/inactive/offline states and last-reading timestamps. Designed to surface degraded nodes before they become blind spots.

### 🗂️ Intelligence Log (History Archive)
Historical data auditing with visual trend analysis and performance reporting. Enables post-event review and longitudinal pattern recognition for meteorological intelligence teams.

---

## HCI Design Principles

SkyWatch Pro applies core **Human-Computer Interaction (HCI)** and **AHCI** principles to minimize cognitive load during emergency scenarios:

### 1. Visibility of System Status
Every module provides real-time feedback. The **System Sync Toast** (fixed bottom-center) and pulsed **Live** indicators on the dashboard ensure personnel are always aware of network health and connection state — no hunting for status.

### 2. Aesthetic and Minimalist Design
The interface uses a deliberate **light theme** with high-contrast typography (Inter for prose, JetBrains Mono for technical data). Decorative elements are removed in favor of data legibility. Every pixel earns its place.

### 3. Hierarchy and Contrast
Information architecture is managed through a **Bento layout**. Primary metrics (Temperature, Threat Level) use large bold weights. Secondary metadata (Vector IDs, Timestamps) uses monochromatic monospace fonts — precision without noise.

### 4. Affordance and Signifiers
Interactive elements use clear visual cues: shadows, rounded corners, and hover states. Warning cards apply **industry-standard red/amber color coding** to communicate severity levels instantly — no reading required to understand urgency.

### 5. Recognition Over Recall
Universally recognized icons replace labels wherever possible: **Shields** for security/threat, **Waves** for flood/wind, **Droplets** for humidity, **Tornado** for cyclonic alerts. Specialists identify tools and metrics at a glance, reducing tactical decision latency.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript 5.8 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animation | Framer Motion / Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |

---

## Project Structure

All files are flat in the project root — no `src/` or `screens/` subdirectories.

```
skywatch-pro/
├── index.html                 # HTML entry point
├── main.tsx                   # React DOM entry
├── App.tsx                    # Root component, nav, auth shell
├── vite.config.ts             # Vite + Tailwind + path alias config
├── tsconfig.json              # TypeScript config
├── index.css                  # Global styles
│
├── types.ts                   # Enums & interfaces (UserRole, AlertType, WeatherSeverity...)
├── constants.ts               # NAVBAR_ITEMS, ALERT_CONFIG, SEVERITY_COLORS
├── utils.ts                   # cn() helper (clsx + tailwind-merge)
│
├── Card.tsx                   # Base card layout primitive
├── Button.tsx                 # Reusable button component
├── Modal.tsx                  # Dialog/modal primitive
│
├── LoginScreen.tsx            # Role-based authentication screen
├── DashboardScreen.tsx        # Bento-grid atmospheric dashboard
├── AlertsScreen.tsx           # Alert center — issue & manage broadcasts
├── MonitoringScreen.tsx       # Sensor node grid & status tracking
└── HistoryScreen.tsx          # Intelligence archive & trend analysis
```

---

## Setup & Development

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/skywatch-pro.git
cd skywatch-pro

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 (network accessible) |
| `npm run build` | Production build → outputs to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove the `dist/` directory |

### Path Alias

The `@` alias is configured to resolve to the project root:

```ts
import { UserRole } from '@/types';
import { cn } from '@/utils';
```

---

## User Roles

SkyWatch Pro implements role-based access at login. Three roles are supported:

| Role | Description |
|---|---|
| `Meteorologist` | Primary atmospheric analysis and alert authoring |
| `Admin` | System configuration and user management |
| `Field Operator` | Sensor monitoring and field-level data input |

Role is surfaced in the top navigation bar and persists for the session.

---

## Data Models

### WeatherSeverity
```
Normal → Warning → Emergency
```

### AlertType
`TORNADO` · `FLOOD` · `HEATWAVE` · `CYCLONE`

### SensorNode Status
`active` · `inactive` · `offline`

---

## Deployment

### GitHub

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "feat: initial commit"

git remote add origin https://github.com/YOUR_USERNAME/skywatch-pro.git
git branch -M main
git push -u origin main
```

> Ensure `.gitignore` is present before `git add .` to exclude `node_modules/` and `dist/`.

---

### Vercel

#### Option A — Dashboard (Recommended)

1. Visit [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
2. Vercel auto-detects Vite. Confirm these settings:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

3. Click **Deploy**. Every push to `main` triggers a redeployment automatically.

#### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel        # follow prompts (Vite auto-detected)
vercel --prod # promote to production
```

#### SPA Routing Fix

Create a `vercel.json` in the project root to prevent 404s on page refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

> **No API keys. No `.env` files. No backend required.**  
> Clone, install, run. That's it.
