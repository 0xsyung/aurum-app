import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'

/**
 * ConnectButton - Wallet connection UI component
 * 
 * Uses Coinbase Smart Wallet by default.
 * The component is designed to be easily swapped for other providers.
 */
export function ConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-aurum-navy-light rounded-lg border border-aurum-gold/20 hover:border-aurum-gold/40 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-white font-medium">{formatAddress(address)}</span>
          <span className="text-xs text-gray-400">{chain?.name}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-aurum-navy-light rounded-lg border border-aurum-gold/20 shadow-xl z-50">
            <button
              onClick={() => {
                disconnect()
                setIsDropdownOpen(false)
              }}
              className="flex items-center gap-2 w-full px-4 py-3 text-left text-red-400 hover:bg-aurum-navy rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
      className="flex items-center gap-2 px-6 py-2.5 bg-aurum-gold text-aurum-navy font-semibold rounded-lg hover:bg-aurum-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Wallet className="w-5 h-5" />
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
