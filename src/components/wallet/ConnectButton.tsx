import { usePrivy, useWallets, useLoginWithPasskey } from '@privy-io/react-auth'
import { Wallet, LogOut, ChevronDown, KeyRound } from 'lucide-react'
import { useState } from 'react'

/**
 * ConnectButton - Auth + wallet connection UI (Privy)
 */
export function ConnectButton() {
  const { ready, authenticated, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const { loginWithPasskey } = useLoginWithPasskey()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const primaryWallet = wallets[0]
  const address = primaryWallet?.address

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  if (authenticated) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-aurum-navy-light rounded-lg border border-aurum-gold/20 hover:border-aurum-gold/40 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-white font-medium">
            {address ? formatAddress(address) : 'Account'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-aurum-navy-light rounded-lg border border-aurum-gold/20 shadow-xl z-50">
            <button
              onClick={() => {
                logout()
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
    <div className="flex items-center gap-2">
      <button
        onClick={() => login()}
        disabled={!ready}
        className="flex items-center gap-2 px-6 py-2.5 bg-aurum-gold text-aurum-navy font-semibold rounded-lg hover:bg-aurum-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="w-5 h-5" />
        {ready ? 'Sign In' : 'Loading...'}
      </button>
      <button
        onClick={() => loginWithPasskey()}
        disabled={!ready}
        className="flex items-center gap-2 px-4 py-2.5 border border-aurum-gold/30 text-aurum-gold rounded-lg hover:bg-aurum-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <KeyRound className="w-4 h-4" />
        Passkey
      </button>
    </div>
  )
}
