// x402 client helper placeholder while wallet auth is disabled.
import { useCallback } from 'react'

export function useX402Fetch() {
  const fetchWithPayment = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const requestInfo = input instanceof URL ? input.toString() : input
      return fetch(requestInfo, init)
    },
    [],
  )

  return {
    ready: false,
    fetchWithPayment,
  }
}
