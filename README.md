# Aurum App

The decentralized prediction markets trading interface for Aurum Labs.

![Aurum Labs](https://img.shields.io/badge/Aurum-Labs-FFB81C?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite)
![Base](https://img.shields.io/badge/Base-Sepolia-0052FF?style=flat-square)

## Overview

Aurum App is the frontend trading interface for the Aurum Labs prediction markets platform. It allows users to:

- **Browse Markets** - View available prediction markets
- **Trade Outcomes** - Buy and sell outcome tokens
- **Provide Liquidity** - Add/remove liquidity to market pools
- **Track Positions** - Monitor your portfolio and positions
- **Connect Wallets** - Support for multiple wallet providers

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| TypeScript | 5.9 | Type Safety |
| Vite | 7.x | Build Tool |
| Tailwind CSS | 4.x | Styling |
| wagmi | 3.x | Ethereum Interactions |
| viem | 2.x | Ethereum Library |
| OnchainKit | 1.x | Coinbase Wallet Integration |
| TanStack Query | 5.x | Data Fetching |

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/0xsyung/aurum-app.git
cd aurum-app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` with your configuration:

```env
# Network (Base Sepolia Testnet)
VITE_CHAIN_ID=84532
VITE_RPC_URL=https://sepolia.base.org

# Contract Addresses
VITE_MARKET_FACTORY_ADDRESS=0xaF8ddE93C551ce4f6A21db07508858Fb15E4bbC9
VITE_AURUM_ORACLE_ADDRESS=0x4EC0295F0344ac264EB83bd7bDb0069015702297
VITE_AURUM_TOKEN_ADDRESS=0xdBfa3D8516C49581e2A6cBbD75F02F24c59811c1
VITE_CONDITIONAL_TOKENS_ADDRESS=0x9A7A037469204604C29a44901b69B0bBB1d45B13
VITE_FEE_COLLECTOR_ADDRESS=0xBCC8aC562085E207460B9a0342d62a480DD9caAC

# WalletConnect (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Automatic Deployment (GitHub Actions)

This repository is configured with GitHub Actions for automatic deployment to two environments:

| Branch | Environment | Use Case | URL |
|--------|-------------|----------|-----|
| `develop` | GitHub Pages | Testing & Demo | `https://0xsyung.github.io/aurum-app` |
| `main` | Cloudflare Pages | Production | `https://aurum-app.pages.dev` |

#### Deployment Flow

```
Feature Branch → develop (GitHub Pages) → main (Cloudflare Pages)
     ↓              ↓                          ↓
  CI Checks   Testing/Demo              Production
```

### Setup Instructions

#### 1. GitHub Pages Setup (Testing/Demo)

1. Go to **Repository Settings → Pages**
2. Select **GitHub Actions** as the source
3. Enable GitHub Pages

**No additional secrets needed** - GitHub Pages deployment is automatic on `develop` branch push.

#### 2. Cloudflare Pages Setup (Production)

1. Create a Cloudflare Pages project:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages → Create → Pages**
   - Create project named `aurum-app`
   - Skip initial deployment (GitHub Actions will handle it)

2. Add GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN` - [Get from Cloudflare](https://dash.cloudflare.com/?to=/:account/profile/api-tokens)
   - `CLOUDFLARE_ACCOUNT_ID` - Found in Cloudflare dashboard sidebar
   - `VITE_WALLETCONNECT_PROJECT_ID` - [Get from WalletConnect](https://cloud.walletconnect.com)

3. Add GitHub Variables:
   - `VITE_CHAIN_ID` - `84532`
   - `VITE_RPC_URL` - `https://sepolia.base.org`
   - `VITE_MARKET_FACTORY_ADDRESS` - `0xaF8ddE93C551ce4f6A21db07508858Fb15E4bbC9`
   - `VITE_AURUM_ORACLE_ADDRESS` - `0x4EC0295F0344ac264EB83bd7bDb0069015702297`
   - `VITE_AURUM_TOKEN_ADDRESS` - `0xdBfa3D8516C49581e2A6cBbD75F02F24c59811c1`
   - `VITE_CONDITIONAL_TOKENS_ADDRESS` - `0x9A7A037469204604C29a44901b69B0bBB1d45B13`
   - `VITE_FEE_COLLECTOR_ADDRESS` - `0xBCC8aC562085E207460B9a0342d62a480DD9caAC`

### Manual Deployment

#### Cloudflare Pages (Production)

```bash
npm run build
npx wrangler pages deploy dist --project-name=aurum-app
```

#### GitHub Pages (Testing)

```bash
npm run build
# Push to develop branch
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin develop
```

#### Vercel

```bash
npm i -g vercel
vercel
```

#### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## Project Structure

```
aurum-app/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI checks for PRs
│       └── deploy.yml      # Build and deploy workflow
├── src/
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── index.html              # HTML template
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Smart Contracts

The app interacts with the following deployed contracts on Base Sepolia:

| Contract | Address |
|----------|---------|
| MarketFactory | `0xaF8ddE93C551ce4f6A21db07508858Fb15E4bbC9` |
| AurumOracle | `0x4EC0295F0344ac264EB83bd7bDb0069015702297` |
| AurumToken | `0xdBfa3D8516C49581e2A6cBbD75F02F24c59811c1` |
| ConditionalTokens | `0x9A7A037469204604C29a44901b69B0bBB1d45B13` |
| FeeCollector | `0xBCC8aC562085E207460B9a0342d62a480DD9caAC` |

## Related Repositories

| Repository | Description |
|------------|-------------|
| [aurum-contracts](https://github.com/0xsyung/aurum-contracts) | Smart contracts |
| [aurum-website](https://github.com/0xsyung/aurum-website) | Landing page |
| [aurum-backend](https://github.com/0xsyung/aurum-backend) | Backend API |
| [aurum-docs](https://github.com/0xsyung/aurum-docs) | Documentation |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Submit a pull request to `develop`

## License

Copyright © 2026 Aurum Labs. All rights reserved.

---

**Built with ❤️ by the Aurum Labs team**
