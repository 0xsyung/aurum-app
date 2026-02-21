// x402 client helper: wraps fetch with payment using wagmi wallet client.
import { useCallback } from 'react'
import { useWalletClient } from 'wagmi'
import { parseUnits } from 'viem'
import { wrapFetchWithPayment } from 'x402-fetch'

// Optional per-request spend cap (USDC, 6 decimals).
const maxValueEnv = import.meta.env.VITE_X402_MAX_USDC as string | undefined
const maxValue = maxValueEnv ? parseUnits(maxValueEnv, 6) : undefined

type X402Signer = Parameters<typeof wrapFetchWithPayment>[1]

export function useX402Fetch() {
  const { data: walletClient, isSuccess } = useWalletClient()

  const fetchWithPayment = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!walletClient) {
        throw new Error('Wallet not connected')
      }

      const paidFetch = wrapFetchWithPayment(fetch, walletClient as unknown as X402Signer, maxValue)
      const requestInfo = input instanceof URL ? input.toString() : input
      return paidFetch(requestInfo, init)
    },
    [walletClient],
  )

  return {
    ready: isSuccess && !!walletClient,
    fetchWithPayment,
  }
}
