import { useState } from 'react'
import { MarketCard, Market } from '@/components/market/MarketCard'
import { Search, Filter, TrendingUp, Clock, Flame } from 'lucide-react'

// Mock data for demonstration
const MOCK_MARKETS: Market[] = [
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
    id: '2',
    question: 'Will the Fed cut interest rates in Q1 2026?',
    category: 'Economics',
    outcomes: [{ name: 'Yes', probability: 42 }],
    volume: '890K',
    liquidity: '320K',
    endDate: '2026-03-31',
    participants: 1567,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
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
  {
    id: '4',
    question: 'Will AI replace 10% of software jobs by 2027?',
    category: 'Technology',
    outcomes: [{ name: 'Yes', probability: 55 }],
    volume: '670K',
    liquidity: '250K',
    endDate: '2027-01-01',
    participants: 1234,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
  },
  {
    id: '5',
    question: 'Will SpaceX successfully land humans on Mars by 2030?',
    category: 'Science',
    outcomes: [{ name: 'Yes', probability: 23 }],
    volume: '450K',
    liquidity: '180K',
    endDate: '2030-12-31',
    participants: 987,
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400',
  },
  {
    id: '6',
    question: 'Will global EV sales exceed 50% of all car sales by 2028?',
    category: 'Automotive',
    outcomes: [{ name: 'Yes', probability: 38 }],
    volume: '320K',
    liquidity: '120K',
    endDate: '2028-12-31',
    participants: 756,
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400',
  },
]

const CATEGORIES = ['All', 'Crypto', 'Economics', 'Technology', 'Science', 'Sports', 'Politics']
const SORT_OPTIONS = [
  { value: 'volume', label: 'Volume', icon: TrendingUp },
  { value: 'ending', label: 'Ending Soon', icon: Clock },
  { value: 'hot', label: 'Hot', icon: Flame },
]

export function Markets() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('volume')

  // Filter markets based on search and category
  const filteredMarkets = MOCK_MARKETS.filter((market) => {
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || market.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Markets</h1>
          <p className="text-gray-400">Trade on the outcome of future events</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-aurum-navy-light border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-aurum-gold text-aurum-navy'
                  : 'bg-aurum-navy-light text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Sort by:</span>
          {SORT_OPTIONS.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  sortBy === option.value
                    ? 'bg-aurum-gold/10 text-aurum-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {/* Empty State */}
      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No markets found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
