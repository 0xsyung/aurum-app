import { Link } from 'react-router-dom'
import { Clock, Users, TrendingUp } from 'lucide-react'

export interface Market {
  id: string
  question: string
  category: string
  outcomes: {
    name: string
    probability: number
  }[]
  volume: string
  liquidity: string
  endDate: string
  participants: number
  imageUrl?: string
}

interface MarketCardProps {
  market: Market
}

export function MarketCard({ market }: MarketCardProps) {
  const mainOutcome = market.outcomes[0]
  const yesProb = mainOutcome.probability
  const noProb = 100 - yesProb

  // Calculate time remaining
  const endDate = new Date(market.endDate)
  const now = new Date()
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Link
      to={`/market/${market.id}`}
      className="block bg-aurum-navy-light rounded-xl border border-aurum-gold/10 hover:border-aurum-gold/30 transition-all hover:shadow-lg hover:shadow-aurum-gold/5 overflow-hidden"
    >
      {/* Image */}
      {market.imageUrl && (
        <div className="h-32 bg-gradient-to-br from-aurum-navy to-aurum-navy-light">
          <img
            src={market.imageUrl}
            alt={market.question}
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}

      <div className="p-4">
        {/* Category */}
        <span className="inline-block px-2 py-1 text-xs font-medium text-aurum-gold bg-aurum-gold/10 rounded-full mb-3">
          {market.category}
        </span>

        {/* Question */}
        <h3 className="text-white font-semibold mb-4 line-clamp-2">
          {market.question}
        </h3>

        {/* Probability Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-success font-medium">Yes {yesProb}%</span>
            <span className="text-error font-medium">No {noProb}%</span>
          </div>
          <div className="h-2 bg-error/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${yesProb}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>${market.volume}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{market.participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{daysRemaining > 0 ? `${daysRemaining}d left` : 'Ended'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
