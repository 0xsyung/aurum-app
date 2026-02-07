// Trending page with mock leaderboards.
import { MarketCard, Market } from '@/components/market/MarketCard'
import { Flame, TrendingUp, Clock } from 'lucide-react'

// Mock trending data (replace with API).
const TRENDING_MARKETS: Market[] = [
  {
    id: '1',
    question: 'Will Bitcoin reach $100,000 by end of 2026?',
    category: 'Crypto',
    outcomes: [{ name: 'Yes', probability: 65 }],
    volume: '1.2M',
    liquidity: '500K',
    endDate: '2026-12-31',
    participants: 2341,
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400',
  },
  {
    id: '3',
    question: 'Will Ethereum ETF be approved by SEC in 2026?',
    category: 'Crypto',
    outcomes: [{ name: 'Yes', probability: 78 }],
    volume: '2.1M',
    liquidity: '800K',
    endDate: '2026-06-30',
    participants: 3892,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
  },
]

// Mock 24h movers list.
const TOP_MOVERS = [
  { id: '1', question: 'Will AI replace 10% of software jobs?', change: 12.5, direction: 'up' },
  { id: '2', question: 'Will Fed cut rates in Q1?', change: -8.3, direction: 'down' },
  { id: '3', question: 'Will SpaceX land on Mars by 2030?', change: 5.2, direction: 'up' },
  { id: '4', question: 'Will global EV sales exceed 50%?', change: -3.1, direction: 'down' },
]

// Mock ending soon list.
const ENDING_SOON = [
  { id: '1', question: 'Will BTC hit $80K this week?', endsIn: '2 hours', volume: '$45K' },
  { id: '2', question: 'Will ETH outperform BTC today?', endsIn: '5 hours', volume: '$23K' },
  { id: '3', question: 'Will gold reach $2,100?', endsIn: '1 day', volume: '$67K' },
]

export function Trending() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Trending</h1>
        <p className="text-gray-400">Discover the hottest markets right now</p>
      </div>

      {/* Hot Markets */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-white">Hot Markets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRENDING_MARKETS.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* Top Movers & Ending Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Movers */}
        <section className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-aurum-gold" />
            <h2 className="text-lg font-semibold text-white">Top Movers (24h)</h2>
          </div>
          <div className="space-y-3">
            {TOP_MOVERS.map((market) => (
              <div
                key={market.id}
                className="flex items-center justify-between p-3 bg-aurum-navy rounded-lg hover:bg-aurum-navy/50 transition-colors cursor-pointer"
              >
                <span className="text-white text-sm line-clamp-1 flex-1 mr-4">
                  {market.question}
                </span>
                <span
                  className={`font-semibold ${
                    market.direction === 'up' ? 'text-success' : 'text-error'
                  }`}
                >
                  {market.direction === 'up' ? '+' : ''}{market.change}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Ending Soon */}
        <section className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-semibold text-white">Ending Soon</h2>
          </div>
          <div className="space-y-3">
            {ENDING_SOON.map((market) => (
              <div
                key={market.id}
                className="flex items-center justify-between p-3 bg-aurum-navy rounded-lg hover:bg-aurum-navy/50 transition-colors cursor-pointer"
              >
                <div className="flex-1 mr-4">
                  <span className="text-white text-sm line-clamp-1 block">
                    {market.question}
                  </span>
                  <span className="text-xs text-gray-500">Vol: {market.volume}</span>
                </div>
                <span className="text-warning font-medium text-sm whitespace-nowrap">
                  {market.endsIn}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
