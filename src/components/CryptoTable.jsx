import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCryptoData } from '../features/cryptoSlice.js'
import { simulateCryptoUpdates } from '../utils/simulateSocket.js'

export default function CryptoTable() {
  const dispatch = useDispatch()
  const cryptos = useSelector(state => state.crypto)

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = simulateCryptoUpdates(cryptos)
      dispatch(updateCryptoData(updated))
    }, 2000)
    return () => clearInterval(interval)
  }, [cryptos, dispatch])

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-sm md:text-base table-auto border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase">
          <tr>
            {[
              "#", "Name", "Price", "1h %", "24h %", "7d %",
              "Market Cap", "24h Volume", "Circulating", "Max Supply", "7D Chart"
            ].map((head, idx) => (
              <th key={idx} className="px-4 py-2 text-left">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-800 dark:text-gray-100">
          {cryptos.map((c, i) => (
            <tr
              key={c.symbol}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-4 py-3 font-medium">{i + 1}</td>
              <td className="px-4 py-3 flex items-center gap-3">
                <img src={c.logo} alt={c.symbol} className="w-6 h-6" />
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c.symbol}</div>
                </div>
              </td>
              <td className="px-4 py-3">${c.price.toLocaleString()}</td>
              <td className={`px-4 py-3 ${c.percent_change_1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {c.percent_change_1h}%
              </td>
              <td className={`px-4 py-3 ${c.percent_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {c.percent_change_24h}%
              </td>
              <td className={`px-4 py-3 ${c.percent_change_7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {c.percent_change_7d}%
              </td>
              <td className="px-4 py-3">${c.market_cap.toLocaleString()}</td>
              <td className="px-4 py-3">${c.volume_24h.toLocaleString()}</td>
              <td className="px-4 py-3">{c.circulating_supply.toLocaleString()}</td>
              <td className="px-4 py-3">{c.max_supply ? c.max_supply.toLocaleString() : '∞'}</td>
              <td className="px-4 py-3">
                <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
