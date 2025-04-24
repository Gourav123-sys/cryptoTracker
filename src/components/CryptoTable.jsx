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
      const updated = simulateCryptoUpdates(cryptos)
      dispatch(updateCryptoData(updated))
    }, 2000)
    return () => clearInterval(interval)
  }, [cryptos, dispatch])

  const filtered = cryptos.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case 'gainers':
        return b.percent_change_24h - a.percent_change_24h
      case 'losers':
        return a.percent_change_24h - b.percent_change_24h
      case 'marketcap':
        return b.market_cap - a.market_cap
      case 'price':
        return b.price - a.price
      default:
        return 0
    }
  })

  return (
    <div className="overflow-x-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">🚀 Live Crypto Tracker</h1>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        {/* Search bar */}
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

        {/* Filter dropdown */}
        <div className="relative w-full md:w-64">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option disabled className="bg-gray-100 text-gray-500">— Sort Options —</option>
            <option value="default">Default</option>
            <option value="gainers">Top Gainers (24h)</option>
            <option value="losers">Top Losers (24h)</option>
            <option value="marketcap">Market Cap</option>
            <option value="price">Price</option>
          </select>
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden">
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
                {/* % Change Chips */}
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    c.percent_change_1h >= 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {c.percent_change_1h}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    c.percent_change_24h >= 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {c.percent_change_24h}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    c.percent_change_7d >= 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
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
    </div>
  )
}
