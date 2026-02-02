import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config/wagmi'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

interface WalletProviderProps {
  children: ReactNode
}

/**
 * WalletProvider - Abstraction layer for Web3 wallet connectivity
 * 
 * Currently uses Coinbase Smart Wallet via wagmi.
 * To add Privy or Dynamic in the future:
 * 1. Install the provider package
 * 2. Wrap children with the provider
 * 3. Update the useWallet hook to use the new provider's hooks
 * 
 * Example for Privy:
 * ```
 * import { PrivyProvider } from '@privy-io/react-auth'
 * 
 * <PrivyProvider appId="your-app-id">
 *   <WagmiProvider config={config}>
 *     {children}
 *   </WagmiProvider>
 * </PrivyProvider>
 * ```
 */
export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
