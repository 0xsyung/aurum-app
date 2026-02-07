import { useCallback } from 'react'
import { useWallets } from '@privy-io/react-auth'
import { createWalletClient, custom, parseUnits } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import { wrapFetchWithPayment } from 'x402-fetch'

const chainId = Number(import.meta.env.VITE_CHAIN_ID ?? 84532)
const chain = chainId === base.id ? base : baseSepolia

const maxValueEnv = import.meta.env.VITE_X402_MAX_USDC as string | undefined
const maxValue = maxValueEnv ? parseUnits(maxValueEnv, 6) : undefined

export function useX402Fetch() {
  const { wallets, ready } = useWallets()
  const wallet = wallets[0]

  const fetchWithPayment = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!ready || !wallet) {
        throw new Error('Wallet not connected')
      }

      const provider = await wallet.getEthereumProvider()
      const walletClient = createWalletClient({
        account: wallet.address,
        chain,
        transport: custom(provider),
      })

      const paidFetch = wrapFetchWithPayment(fetch, walletClient, maxValue)
      return paidFetch(input, init)
    },
    [ready, wallet],
  )

  return {
    ready: ready && !!wallet,
    fetchWithPayment,
  }
}
