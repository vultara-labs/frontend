# Vultara

**The Salary Engine** — Automate crypto payroll and earn yield on idle USDC.

![Status](https://img.shields.io/badge/Status-Testnet%20Beta-yellow?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Overview

Vultara is an automated financial infrastructure for the open economy. We streamline crypto payroll management while allowing users to earn competitive yield on their idle USDC through battle-tested DeFi strategies.

### Key Features

- **USDC Vault** — Deposit USDC and earn competitive APY powered by Thetanuts Finance
- **IDR Off-Ramp** — Instant withdrawal to Indonesian Bank/E-wallet
- **Nova AI** — AI-powered assistant for risk analysis & strategy insights
- **Real-time Dashboard** — Live balance tracking with yield visualization
- **Protocol Status** — Gamified progress tracking for user engagement

---

## Tech Stack

### Core

| Technology | Version |
|------------|---------|
| Next.js | 16.1 (App Router) |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Framer Motion | 12.x |

### Web3

| Technology | Purpose |
|------------|---------|
| Wagmi | Wallet connection |
| Viem | Ethereum interactions |

### AI Integration

| Provider | Role |
|----------|------|
| Google Generative AI (Gemini) | Primary AI provider |
| Groq SDK | Fallback provider |

---

## Project Structure

```
vultara/
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── api/                # API routes
    │   │   ├── dashboard/
    │   │   │   ├── ai/             # Nova AI assistant
    │   │   │   ├── deposit/        # Deposit flow
    │   │   │   ├── vault/          # Vault management
    │   │   │   └── withdraw/       # Withdrawal flow
    │   │   ├── privacy/            # Privacy policy
    │   │   ├── terms/              # Terms of service
    │   │   ├── globals.css         # Global styles & design tokens
    │   │   ├── layout.tsx          # Root layout
    │   │   └── page.tsx            # Landing page
    │   ├── components/
    │   │   ├── dashboard/          # Dashboard-specific components
    │   │   ├── ui/                 # Reusable UI components
    │   │   ├── Hero.tsx            # Landing hero section
    │   │   ├── CorePillars.tsx     # Features showcase
    │   │   ├── UserJourney.tsx     # How it works section
    │   │   ├── Navigation.tsx      # Site navigation
    │   │   ├── Footer.tsx          # Site footer
    │   │   └── PageLoader.tsx      # Loading animation
    │   ├── config/                 # App configuration
    │   └── providers/              # React context providers
    ├── public/
    │   └── logos/                  # Brand & partner logos
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vultara.git
cd vultara/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

### Development

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run linting
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Design System

Vultara uses the **Obsidian Prime** design system:

- **Dark Mode First** — Sleek obsidian surfaces with premium glass effects
- **Volt Accent** — Electric lime (#CCFF00) for CTAs and highlights
- **Micro-animations** — Smooth, physics-based interactions
- **Consistent Tokens** — CSS custom properties for unified theming

---

## Security

- Audited strategies via trusted partners (CertiK, Hacken, OpenZeppelin)
- Yield powered by [Thetanuts Finance](https://thetanuts.finance/) Basic Volatility Strategy (V4)
- Non-custodial architecture

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome. Please submit a Pull Request.

---

## Contact

- Website: [vultara.xyz](https://vultara.xyz)
- Twitter: [@VultaraLabs](https://twitter.com/VultaraLabs)

---

<p align="center">
  <sub>Built by Vultara Labs — Automated financial infrastructure for the open economy.</sub>
</p>
