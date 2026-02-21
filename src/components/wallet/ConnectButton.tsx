// Wallet UI placeholder (Privy removed).
import { Wallet } from 'lucide-react'

/**
 * ConnectButton - Wallet connection UI placeholder.
 */
export function ConnectButton() {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled
        className="flex items-center gap-2 px-6 py-2.5 bg-aurum-gold text-aurum-navy font-semibold rounded-lg opacity-70 cursor-not-allowed"
      >
        <Wallet className="w-5 h-5" />
        Wallet coming soon
      </button>
    </div>
  )
}
