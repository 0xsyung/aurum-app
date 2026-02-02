import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { Wallet, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'
import { ConnectButton } from '@/components/wallet/ConnectButton'

// Mock portfolio data
const MOCK_POSITIONS = [
  {
    id: '1',
    marketId: '1',
    question: 'Will Bitcoin reach $100,000 by end of 2026?',
    outcome: 'Yes',
    shares: 150,
    avgPrice: 0.62,
    currentPrice: 0.65,
    value: 97.5,
    pnl: 4.5,
    pnlPercent: 4.84,
  },
  {
    id: '2',
    marketId: '2',
    question: 'Will the Fed cut interest rates in Q1 2026?',
    outcome: 'No',
    shares: 200,
    avgPrice: 0.55,
    currentPrice: 0.58,
    value: 116,
    pnl: 6,
    pnlPercent: 5.45,
  },
  {
    id: '3',
    marketId: '3',
    question: 'Will Ethereum ETF be approved by SEC in 2026?',
    outcome: 'Yes',
    shares: 100,
    avgPrice: 0.80,
    currentPrice: 0.78,
    value: 78,
    pnl: -2,
    pnlPercent: -2.5,
  },
]

export function Portfolio() {
  const { isConnected } = useAccount()

  // Calculate totals
  const totalValue = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.value, 0)
  const totalPnl = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalPnlPercent = (totalPnl / (totalValue - totalPnl)) * 100

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Wallet className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400 mb-6 max-w-md">
          Connect your wallet to view your portfolio, track positions, and manage your trades.
        </p>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Portfolio</h1>
        <p className="text-gray-400">Track your positions and performance</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
          <p className="text-gray-400 text-sm mb-1">Total Value</p>
          <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
          <p className="text-gray-400 text-sm mb-1">Total P&L</p>
          <div className="flex items-center gap-2">
            <p className={`text-3xl font-bold ${totalPnl >= 0 ? 'text-success' : 'text-error'}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
            </p>
            <span className={`text-sm ${totalPnl >= 0 ? 'text-success' : 'text-error'}`}>
              ({totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
          <p className="text-gray-400 text-sm mb-1">Active Positions</p>
          <p className="text-3xl font-bold text-white">{MOCK_POSITIONS.length}</p>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 overflow-hidden">
        <div className="p-4 border-b border-aurum-gold/10">
          <h2 className="text-lg font-semibold text-white">Your Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-aurum-gold/10">
                <th className="px-4 py-3 font-medium">Market</th>
                <th className="px-4 py-3 font-medium">Outcome</th>
                <th className="px-4 py-3 font-medium text-right">Shares</th>
                <th className="px-4 py-3 font-medium text-right">Avg. Price</th>
                <th className="px-4 py-3 font-medium text-right">Current</th>
                <th className="px-4 py-3 font-medium text-right">Value</th>
                <th className="px-4 py-3 font-medium text-right">P&L</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_POSITIONS.map((position) => (
                <tr
                  key={position.id}
                  className="border-b border-aurum-gold/5 hover:bg-aurum-navy/50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <Link
                      to={`/market/${position.marketId}`}
                      className="text-white hover:text-aurum-gold transition-colors line-clamp-1 max-w-xs"
                    >
                      {position.question}
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        position.outcome === 'Yes'
                          ? 'bg-success/20 text-success'
                          : 'bg-error/20 text-error'
                      }`}
                    >
                      {position.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-white">{position.shares}</td>
                  <td className="px-4 py-4 text-right text-gray-400">
                    ${position.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right text-white">
                    ${position.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right text-white font-medium">
                    ${position.value.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {position.pnl >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                      <span
                        className={`font-medium ${
                          position.pnl >= 0 ? 'text-success' : 'text-error'
                        }`}
                      >
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                      </span>
                      <span
                        className={`text-xs ${
                          position.pnlPercent >= 0 ? 'text-success' : 'text-error'
                        }`}
                      >
                        ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/market/${position.marketId}`}
                      className="text-aurum-gold hover:text-aurum-gold-light transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
