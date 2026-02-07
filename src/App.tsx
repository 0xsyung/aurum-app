// App-level routing and global providers.
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WalletProvider } from '@/components/wallet/WalletProvider'
import { Layout } from '@/components/layout/Layout'
import { Markets } from '@/pages/Markets'
import { MarketDetail } from '@/pages/MarketDetail'
import { Portfolio } from '@/pages/Portfolio'
import { CreateMarket } from '@/pages/CreateMarket'
import { Trending } from '@/pages/Trending'

function App() {
  return (
    // Wrap the whole app in wallet/auth providers.
    <WalletProvider>
      {/* Client-side routing for all pages */}
      <BrowserRouter>
        {/* Shared layout (nav, shell, etc.) */}
        <Layout>
          {/* Route table */}
          <Routes>
            {/* Markets index */}
            <Route path="/" element={<Markets />} />
            {/* Market details */}
            <Route path="/market/:id" element={<MarketDetail />} />
            {/* Trending view */}
            <Route path="/trending" element={<Trending />} />
            {/* Portfolio view */}
            <Route path="/portfolio" element={<Portfolio />} />
            {/* Create market */}
            <Route path="/create" element={<CreateMarket />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </WalletProvider>
  )
}

export default App
