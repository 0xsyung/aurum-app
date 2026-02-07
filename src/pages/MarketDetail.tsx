import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { ArrowLeft, Clock, Users, TrendingUp, Info, ExternalLink } from 'lucide-react'
import { ConnectButton } from '@/components/wallet/ConnectButton'
import { useX402Fetch } from '@/lib/x402'

// Mock market data
const MOCK_MARKET = {
  id: '1',
  question: 'Will Bitcoin reach $100,000 by end of 2026?',
  description: 'This market resolves to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) at any point before December 31, 2026 23:59:59 UTC.',
  category: 'Crypto',
  outcomes: [
    { name: 'Yes', probability: 65, price: 0.65 },
    { name: 'No', probability: 35, price: 0.35 },
  ],
  volume: '1,234,567',
  liquidity: '500,000',
  endDate: '2026-12-31T23:59:59Z',
  participants: 2341,
  creator: '0x1234...5678',
  resolutionSource: 'CoinGecko API',
  imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800',
}

type TradeType = 'buy' | 'sell'
type Outcome = 'yes' | 'no'

export function MarketDetail() {
  const { id: _marketId } = useParams()
  const { isConnected } = useAccount()
  const { fetchWithPayment, ready: x402Ready } = useX402Fetch()
  const [tradeType, setTradeType] = useState<TradeType>('buy')
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome>('yes')
  const [amount, setAmount] = useState('')

  const market = MOCK_MARKET // In production, fetch based on id

  // Calculate estimated return
  const price = selectedOutcome === 'yes' ? market.outcomes[0].price : market.outcomes[1].price
  const shares = amount ? parseFloat(amount) / price : 0
  const potentialReturn = shares * 1 // Each share pays $1 if correct
  const profit = potentialReturn - parseFloat(amount || '0')

  const handleTrade = async () => {
    // Placeholder: call a paid API endpoint (x402), then log trade
    try {
      if (!x402Ready) {
        console.warn('x402 not ready: connect wallet first')
        return
      }
      await fetchWithPayment('/api/paid/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tradeType, selectedOutcome, amount }),
      })
    } catch (err) {
      console.error('x402 payment failed', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Markets
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 overflow-hidden">
            {market.imageUrl && (
              <div className="h-48 bg-gradient-to-br from-aurum-navy to-aurum-navy-light">
                <img
                  src={market.imageUrl}
                  alt={market.question}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            )}
            <div className="p-6">
              <span className="inline-block px-2 py-1 text-xs font-medium text-aurum-gold bg-aurum-gold/10 rounded-full mb-3">
                {market.category}
              </span>
              <h1 className="text-2xl font-display font-bold text-white mb-4">
                {market.question}
              </h1>
              <p className="text-gray-400">{market.description}</p>
            </div>
          </div>

          {/* Probability Chart */}
          <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Current Probability</h2>
            <div className="space-y-4">
              {market.outcomes.map((outcome, index) => (
                <div key={outcome.name}>
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium ${index === 0 ? 'text-success' : 'text-error'}`}>
                      {outcome.name}
                    </span>
                    <span className="text-white font-semibold">{outcome.probability}%</span>
                  </div>
                  <div className="h-3 bg-aurum-navy rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        index === 0 ? 'bg-success' : 'bg-error'
                      }`}
                      style={{ width: `${outcome.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Volume</span>
              </div>
              <p className="text-xl font-semibold text-white">${market.volume}</p>
            </div>
            <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Info className="w-4 h-4" />
                <span className="text-sm">Liquidity</span>
              </div>
              <p className="text-xl font-semibold text-white">${market.liquidity}</p>
            </div>
            <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Traders</span>
              </div>
              <p className="text-xl font-semibold text-white">{market.participants}</p>
            </div>
            <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Ends</span>
              </div>
              <p className="text-xl font-semibold text-white">
                {new Date(market.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Resolution Info */}
          <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Resolution Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Resolution Source</span>
                <span className="text-white">{market.resolutionSource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Creator</span>
                <a href="#" className="text-aurum-gold flex items-center gap-1">
                  {market.creator}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Trade</h2>

            {/* Trade Type Toggle */}
            <div className="flex bg-aurum-navy rounded-lg p-1 mb-4">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  tradeType === 'buy'
                    ? 'bg-aurum-gold text-aurum-navy'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  tradeType === 'sell'
                    ? 'bg-aurum-gold text-aurum-navy'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Outcome Selection */}
            <div className="space-y-2 mb-4">
              <label className="text-sm text-gray-400">Outcome</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedOutcome('yes')}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    selectedOutcome === 'yes'
                      ? 'bg-success/20 text-success border-2 border-success'
                      : 'bg-aurum-navy text-gray-400 border-2 border-transparent hover:border-success/50'
                  }`}
                >
                  Yes ${market.outcomes[0].price.toFixed(2)}
                </button>
                <button
                  onClick={() => setSelectedOutcome('no')}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    selectedOutcome === 'no'
                      ? 'bg-error/20 text-error border-2 border-error'
                      : 'bg-aurum-navy text-gray-400 border-2 border-transparent hover:border-error/50'
                  }`}
                >
                  No ${market.outcomes[1].price.toFixed(2)}
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2 mb-4">
              <label className="text-sm text-gray-400">Amount (USDC)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30"
              />
              <div className="flex gap-2">
                {[10, 50, 100, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className="flex-1 py-1 text-xs text-gray-400 bg-aurum-navy rounded hover:text-white transition-colors"
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Trade Summary */}
            {amount && parseFloat(amount) > 0 && (
              <div className="bg-aurum-navy rounded-lg p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shares</span>
                  <span className="text-white">{shares.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Price</span>
                  <span className="text-white">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Potential Return</span>
                  <span className="text-success">${potentialReturn.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-aurum-gold/10 pt-2">
                  <span className="text-gray-400">Potential Profit</span>
                  <span className="text-success font-semibold">
                    +${profit.toFixed(2)} ({((profit / parseFloat(amount)) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}

            {/* Trade Button */}
            {isConnected ? (
              <button
                onClick={handleTrade}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full py-3 bg-aurum-gold text-aurum-navy font-semibold rounded-lg hover:bg-aurum-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedOutcome.toUpperCase()}
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-400 text-center">Connect wallet to trade</p>
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
