import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import { config } from '@/config/wagmi'
import { ReactNode } from 'react'

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
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID as string | undefined

  if (!privyAppId) {
    throw new Error('Missing VITE_PRIVY_APP_ID')
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          walletList: ['metamask', 'rabby_wallet', 'wallet_connect', 'coinbase_wallet'],
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  )
}
