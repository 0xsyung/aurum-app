// x402 client helper: wraps fetch with payment using the connected wallet.
import { useCallback } from 'react'
import { useWalletClient } from 'wagmi'
import { parseUnits } from 'viem'
import { wrapFetchWithPayment } from 'x402-fetch'

// Optional per-request spend cap (USDC, 6 decimals).
const maxValueEnv = import.meta.env.VITE_X402_MAX_USDC as string | undefined
const maxValue = maxValueEnv ? parseUnits(maxValueEnv, 6) : undefined
// Infer signer type from the wrapper signature.
type X402Signer = Parameters<typeof wrapFetchWithPayment>[1]

export function useX402Fetch() {
  const { data: walletClient, isSuccess } = useWalletClient()

  // Wrap fetch so it auto-pays on 402.
  const fetchWithPayment = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!walletClient) {
        throw new Error('Wallet not connected')
      }

      // Wrap the standard fetch with x402 payment behavior.
      const paidFetch = wrapFetchWithPayment(fetch, walletClient as unknown as X402Signer, maxValue)
      const requestInfo = input instanceof URL ? input.toString() : input
      return paidFetch(requestInfo, init)
    },
    [walletClient],
  )

  // Expose readiness and the wrapped fetch.
  return {
    ready: isSuccess && !!walletClient,
    fetchWithPayment,
  }
}
