// Create market UI (form only; no on-chain calls yet).
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Plus, Trash2, Calendar, Info } from 'lucide-react'
import { ConnectButton } from '@/components/wallet/ConnectButton'

// Category options for the form.
const CATEGORIES = ['Crypto', 'Economics', 'Technology', 'Science', 'Sports', 'Politics', 'Entertainment', 'Other']

export function CreateMarket() {
  // Wallet state to gate access to the form.
  const { isConnected } = useAccount()
  // Form state.
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [endDate, setEndDate] = useState('')
  const [resolutionSource, setResolutionSource] = useState('')
  const [marketType, setMarketType] = useState<'binary' | 'categorical'>('binary')
  const [outcomes, setOutcomes] = useState(['', ''])
  const [initialLiquidity, setInitialLiquidity] = useState('')

  // Add an outcome input (capped at 10).
  const addOutcome = () => {
    if (outcomes.length < 10) {
      setOutcomes([...outcomes, ''])
    }
  }

  // Remove an outcome input (min 2).
  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index))
    }
  }

  // Update a specific outcome input.
  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes]
    newOutcomes[index] = value
    setOutcomes(newOutcomes)
  }

  // Submit handler (placeholder).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement market creation with smart contracts
    console.log({
      question,
      description,
      category,
      endDate,
      resolutionSource,
      marketType,
      outcomes: marketType === 'binary' ? ['Yes', 'No'] : outcomes,
      initialLiquidity,
    })
  }

  // If not connected, show a gated prompt.
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Plus className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400 mb-6 max-w-md">
          Connect your wallet to create prediction markets and earn fees from trading activity.
        </p>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Create Market</h1>
        <p className="text-gray-400">Create a new prediction market for others to trade</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question */}
        <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Market Question</h2>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Question *</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Will Bitcoin reach $100,000 by end of 2026?"
              className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed resolution criteria..."
              rows={4}
              className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white focus:outline-none focus:border-aurum-gold/30"
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                End Date *
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white focus:outline-none focus:border-aurum-gold/30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Resolution Source *</label>
            <input
              type="text"
              value={resolutionSource}
              onChange={(e) => setResolutionSource(e.target.value)}
              placeholder="e.g., CoinGecko API, Official announcement"
              className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30"
              required
            />
          </div>
        </div>

        {/* Market Type */}
        <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Market Type</h2>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMarketType('binary')}
              className={`flex-1 py-4 rounded-lg border-2 transition-colors ${
                marketType === 'binary'
                  ? 'border-aurum-gold bg-aurum-gold/10 text-aurum-gold'
                  : 'border-aurum-gold/10 text-gray-400 hover:border-aurum-gold/30'
              }`}
            >
              <div className="font-semibold mb-1">Binary</div>
              <div className="text-sm opacity-70">Yes / No outcomes</div>
            </button>
            <button
              type="button"
              onClick={() => setMarketType('categorical')}
              className={`flex-1 py-4 rounded-lg border-2 transition-colors ${
                marketType === 'categorical'
                  ? 'border-aurum-gold bg-aurum-gold/10 text-aurum-gold'
                  : 'border-aurum-gold/10 text-gray-400 hover:border-aurum-gold/30'
              }`}
            >
              <div className="font-semibold mb-1">Categorical</div>
              <div className="text-sm opacity-70">Multiple outcomes</div>
            </button>
          </div>

          {marketType === 'categorical' && (
            <div className="space-y-3">
              <label className="text-sm text-gray-400">Outcomes (2-10)</label>
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                    placeholder={`Outcome ${index + 1}`}
                    className="flex-1 px-4 py-2 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30"
                    required
                  />
                  {outcomes.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOutcome(index)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {outcomes.length < 10 && (
                <button
                  type="button"
                  onClick={addOutcome}
                  className="flex items-center gap-2 text-aurum-gold hover:text-aurum-gold-light transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Outcome
                </button>
              )}
            </div>
          )}
        </div>

        {/* Initial Liquidity */}
        <div className="bg-aurum-navy-light rounded-xl border border-aurum-gold/10 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Initial Liquidity</h2>
          
          <div className="flex items-start gap-2 p-3 bg-aurum-gold/10 rounded-lg">
            <Info className="w-5 h-5 text-aurum-gold flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">
              Providing initial liquidity helps bootstrap trading activity. You'll earn fees from trades proportional to your liquidity share.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount (USDC) *</label>
            <input
              type="number"
              value={initialLiquidity}
              onChange={(e) => setInitialLiquidity(e.target.value)}
              placeholder="100"
              min="10"
              className="w-full px-4 py-3 bg-aurum-navy border border-aurum-gold/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aurum-gold/30"
              required
            />
            <p className="text-xs text-gray-500">Minimum: 10 USDC</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-aurum-gold text-aurum-navy font-semibold rounded-lg hover:bg-aurum-gold-light transition-colors"
        >
          Create Market
        </button>
      </form>
    </div>
  )
}
