# Aurum App

UI prototype for the Aurum Labs prediction markets dApp. This repo focuses on product UI, wallet/auth flows, and client-side routing. It does **not** yet perform on-chain reads/writes or backend calls beyond placeholders.

## Status

- **Mock data only**: markets and trading flows are UI placeholders.
- **No on-chain integration yet**: contract addresses in `.env.example` are not wired into the code.
- **Auth**: Privy is integrated for email/passkey + wallet login.
- **x402**: client wrapper exists (placeholder endpoint).

## Structure

```
src/
  App.tsx                 # Routes + providers
  main.tsx                # App bootstrap
  index.css               # Tailwind v4 theme + global styles
  config/
    wagmi.ts              # wagmi config + placeholder addresses
  lib/
    x402.ts               # x402 fetch wrapper (Privy + viem)
  components/
    layout/               # Layout shell
    market/               # Market card UI
    wallet/               # Privy wallet/auth UI
  pages/
    Markets.tsx           # Market list + filters (mock)
    MarketDetail.tsx      # Market detail + trade panel (mock)
    Trending.tsx          # Trending view (mock)
    Portfolio.tsx         # Portfolio view (mock)
    CreateMarket.tsx      # Create form (mock)
```

## Features (Current)

- **Routing**: client-side routes for all primary views
- **Auth**: Privy login (email/passkey + wallets)
- **Wallet UI**: connect/disconnect display with address
- **Market UI**: listings, detail view, portfolio, trending, create market form
- **x402 placeholder**: paid fetch wrapper ready for backend integration

## Features (Planned)

- On-chain reads/writes for markets and positions
- Backend API integration for market discovery and indexing
- Real trading, positions, and PnL calculations

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 4
- wagmi / viem
- Privy (auth)

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

`.env.example` includes chain config and contract addresses for future wiring, but they are not used by the app yet.

Required:
- `VITE_PRIVY_APP_ID`

Optional:
- `VITE_X402_MAX_USDC` (per-request spend cap)

## Deployment

Static Vite app; build output is in `dist/`:

```bash
npm run build
```

Deploy to Cloudflare Pages, Vercel, or Netlify.

## Related Repositories

- `aurum-contracts` (ConditionalTokens prototype)
- `aurum-website` (landing page)
- `aurum-backend` (placeholder)
- `aurum-docs` (documentation)
