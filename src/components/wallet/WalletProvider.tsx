// Wallet/auth provider composition (Privy + wagmi + React Query).
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
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
 * Uses Privy for auth (email/passkey + wallets) and wagmi for future on-chain calls.
 */
export function WalletProvider({ children }: WalletProviderProps) {
  // Privy app ID must be provided via env.
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID as string | undefined

  if (!privyAppId) {
    throw new Error('Missing VITE_PRIVY_APP_ID')
  }

  return (
    // Privy handles auth + wallet connection UI.
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          walletList: ['metamask', 'rabby_wallet', 'wallet_connect', 'coinbase_wallet'],
        },
      }}
    >
      {/* wagmi enables on-chain interactions */}
      <WagmiProvider config={config}>
        {/* React Query for caching */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  )
}
