import { http, createConfig } from 'wagmi'
import { baseSepolia, base } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

// Coinbase Smart Wallet configuration
// This setup allows easy addition of other providers (Privy, Dynamic) in the future
export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    coinbaseWallet({
      appName: 'Aurum',
      preference: 'smartWalletOnly', // Use Smart Wallet by default
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})

// Contract addresses (Base Sepolia testnet)
export const CONTRACT_ADDRESSES = {
  // These will be updated after deployment
  AURUM_TOKEN: '0x0000000000000000000000000000000000000000',
  AURUM_ORACLE: '0x0000000000000000000000000000000000000000',
  MARKET_FACTORY: '0x0000000000000000000000000000000000000000',
  FEE_COLLECTOR: '0x0000000000000000000000000000000000000000',
  CONDITIONAL_TOKENS: '0x0000000000000000000000000000000000000000',
  // USDC on Base Sepolia
  USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
} as const

// Supported collateral tokens
export const COLLATERAL_TOKENS = [
  {
    address: CONTRACT_ADDRESSES.USDC,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
  },
] as const

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
