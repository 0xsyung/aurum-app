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
    <WalletProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/market/:id" element={<MarketDetail />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/create" element={<CreateMarket />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </WalletProvider>
  )
}

export default App
