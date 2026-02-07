// x402 client helper: wraps fetch with payment using the connected wallet.
import { useCallback } from 'react'
import { useWallets } from '@privy-io/react-auth'
import { createWalletClient, custom, parseUnits, type Address } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import { wrapFetchWithPayment } from 'x402-fetch'

// Choose chain from env (default Base Sepolia).
const chainId = Number(import.meta.env.VITE_CHAIN_ID ?? 84532)
const chain = chainId === base.id ? base : baseSepolia

// Optional per-request spend cap (USDC, 6 decimals).
const maxValueEnv = import.meta.env.VITE_X402_MAX_USDC as string | undefined
const maxValue = maxValueEnv ? parseUnits(maxValueEnv, 6) : undefined
// Infer signer type from the wrapper signature.
type X402Signer = Parameters<typeof wrapFetchWithPayment>[1]

export function useX402Fetch() {
  // Privy wallets list + readiness.
  const { wallets, ready } = useWallets()
  const wallet = wallets[0]

  // Wrap fetch so it auto-pays on 402.
  const fetchWithPayment = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!ready || !wallet) {
        throw new Error('Wallet not connected')
      }

      // Build a viem wallet client from the EIP-1193 provider.
      const provider = await wallet.getEthereumProvider()
      const account = wallet.address as Address
      const walletClient = createWalletClient({
        account,
        chain,
        transport: custom(provider),
      })

      // Wrap the standard fetch with x402 payment behavior.
      const paidFetch = wrapFetchWithPayment(fetch, walletClient as unknown as X402Signer, maxValue)
      const requestInfo = input instanceof URL ? input.toString() : input
      return paidFetch(requestInfo, init)
    },
    [ready, wallet],
  )

  // Expose readiness and the wrapped fetch.
  return {
    ready: ready && !!wallet,
    fetchWithPayment,
  }
}
