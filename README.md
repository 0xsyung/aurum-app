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

This repository is configured with GitHub Actions for automatic deployment:

1. **On Push to `main`**: Automatically builds and deploys to Cloudflare Pages
2. **On Pull Request**: Runs build checks to ensure code compiles

#### Setup Cloudflare Deployment

1. Create a Cloudflare Pages project named `aurum-app`
2. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
   - `VITE_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID

3. Add the following variables to your GitHub repository:
   - `VITE_CHAIN_ID` - Chain ID (84532 for Base Sepolia)
   - `VITE_RPC_URL` - RPC URL
   - `VITE_MARKET_FACTORY_ADDRESS` - Contract address
   - `VITE_AURUM_ORACLE_ADDRESS` - Contract address
   - `VITE_AURUM_TOKEN_ADDRESS` - Contract address
   - `VITE_CONDITIONAL_TOKENS_ADDRESS` - Contract address
   - `VITE_FEE_COLLECTOR_ADDRESS` - Contract address

#### Alternative: GitHub Pages

Set the repository variable `DEPLOY_TARGET=github-pages` to deploy to GitHub Pages instead.

### Manual Deployment

#### Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name=aurum-app
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
