// Wallet/auth provider composition (wagmi + React Query).
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config/wagmi'
import { ReactNode } from 'react'

// Shared query client for async data caching.
const queryClient = new QueryClient()

interface WalletProviderProps {
  children: ReactNode
}

/**
 * WalletProvider - Abstraction layer for Web3 wallet connectivity
 * 
 * Uses wagmi for on-chain calls.
 */
export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
