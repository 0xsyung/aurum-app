// wagmi configuration for EVM chains and wallet connectors.
import { http, createConfig } from 'wagmi'
import { baseSepolia, base } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

// Core wagmi config: chains, connectors, transports.
export const config = createConfig({
  // Supported chains (testnet + mainnet)
  chains: [baseSepolia, base],
  // Wallet connectors used by wagmi
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Aurum',
      },
    }),
  ],
  // RPC transports per chain
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

// wagmi module augmentation for typed config
declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
