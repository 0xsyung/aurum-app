# Aurum App

UI prototype for the Aurum Labs prediction markets dApp.

## Status

- **Mock data only**: markets and trading flows are UI placeholders.
- **No on-chain integration yet**: contract addresses in `.env.example` are not wired into the code.
- **Wallet UI**: Coinbase connector is set up (see `src/config/wagmi.ts`).

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 4
- wagmi / viem

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

`.env.example` includes chain config and contract addresses for future wiring, but they are not used by the app yet.

## Deployment

This is a static Vite app. Build output is in `dist/`:

```bash
npm run build
```

Deploy to Cloudflare Pages, Vercel, or Netlify.

## Related Repositories

- `aurum-contracts` (ConditionalTokens prototype)
- `aurum-website` (landing page)
- `aurum-backend` (placeholder)
- `aurum-docs` (documentation)
