import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCryptoData } from '../features/cryptoSlice.js'
import { simulateCryptoUpdates } from '../utils/simulateSocket.js'
import { Search, Filter } from 'lucide-react'

export default function CryptoTable() {
  const dispatch = useDispatch()
  const cryptos = useSelector(state => state.crypto)

  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('default')

  useEffect(() => {
    const interval = setInterval(() => {
      if (Array.isArray(cryptos)) {
        const updated = simulateCryptoUpdates(cryptos)
        dispatch(updateCryptoData(updated))
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [cryptos, dispatch])

  const filteredData = Array.isArray(cryptos)
    ? cryptos.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const sorted = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case 'gainers': return b.percent_change_24h - a.percent_change_24h
      case 'losers': return a.percent_change_24h - b.percent_change_24h
      case 'marketcap': return b.market_cap - a.market_cap
      case 'price': return b.price - a.price
      default: return 0
    }
  })

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 text-center sm:text-left">
        🚀 Live Crypto Tracker
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by name or symbol..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Sort */}
        <div className="relative w-full md:w-64">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option disabled>— Sort Options —</option>
            <option value="default">Default</option>
            <option value="gainers">Top Gainers (24h)</option>
            <option value="losers">Top Losers (24h)</option>
            <option value="marketcap">Market Cap</option>
            <option value="price">Price</option>
          </select>
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm md:text-base table-auto bg-white">
          <thead className="bg-blue-100 text-blue-800 uppercase text-sm font-semibold">
            <tr>
              {[
                "#", "Name", "Price", "1h %", "24h %", "7d %",
                "Market Cap", "24h Volume", "Circulating", "Max Supply", "7D Chart"
              ].map((head, idx) => (
                <th key={idx} className="px-4 py-3 text-left whitespace-nowrap">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {sorted.map((c, i) => (
              <tr key={c.symbol} className="border-t hover:bg-blue-50 transition">
                <td className="px-4 py-3 font-medium">{i + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={c.logo} alt={c.symbol} className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.symbol}</div>
                  </div>
                </td>
                <td className="px-4 py-3">${c.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    c.percent_change_1h >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {c.percent_change_1h}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    c.percent_change_24h >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {c.percent_change_24h}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    c.percent_change_7d >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {c.percent_change_7d}%
                  </span>
                </td>
                <td className="px-4 py-3">${c.market_cap.toLocaleString()}</td>
                <td className="px-4 py-3">${c.volume_24h.toLocaleString()}</td>
                <td className="px-4 py-3">{c.circulating_supply.toLocaleString()}</td>
                <td className="px-4 py-3">{c.max_supply ? c.max_supply.toLocaleString() : '∞'}</td>
                <td className="px-4 py-3">
                  <img src={c.chart_7d} alt={`${c.symbol} chart`} className="w-24 h-10 rounded-sm object-contain mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {sorted.map((c, i) => (
          <div key={c.symbol} className="border rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img src={c.logo} alt={c.symbol} className="w-6 h-6" />
              <div>
                <div className="font-semibold text-blue-800">{c.name}</div>
                <div className="text-xs text-gray-500">{c.symbol}</div>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Price:</strong> ${c.price.toLocaleString()}</div>
              <div>
                <strong>1h:</strong> <span className={`font-semibold ${c.percent_change_1h >= 0 ? 'text-green-600' : 'text-red-600'}`}>{c.percent_change_1h}%</span>
              </div>
              <div>
                <strong>24h:</strong> <span className={`font-semibold ${c.percent_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>{c.percent_change_24h}%</span>
              </div>
              <div>
                <strong>7d:</strong> <span className={`font-semibold ${c.percent_change_7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>{c.percent_change_7d}%</span>
              </div>
              <div><strong>Market Cap:</strong> ${c.market_cap.toLocaleString()}</div>
              <div><strong>Volume (24h):</strong> ${c.volume_24h.toLocaleString()}</div>
              <div><strong>Circulating:</strong> {c.circulating_supply.toLocaleString()}</div>
              <div><strong>Max Supply:</strong> {c.max_supply ? c.max_supply.toLocaleString() : '∞'}</div>
              <div>
                <img src={c.chart_7d} alt={`${c.symbol} chart`} className="w-full h-10 object-contain mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
