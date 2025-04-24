import btcLogo from '../assets/btc.png'
import ethLogo from '../assets/eth.png'
import usdtLogo from '../assets/usdt.png'
import bnbLogo from '../assets/bnb.png'
import xrpLogo from '../assets/xrp.png'
import adaLogo from '../assets/ada.png'
import dogeLogo from '../assets/doge.png'
import solLogo from '../assets/sol.png'

import btcChart from '../assets/btc-chart.jpg'
import ethChart from '../assets/eth-chart.jpg'
import usdtChart from '../assets/usdt-chart.jpg'
import bnbChart from '../assets/bnb-chart.jpg'
import xrpChart from '../assets/xrp-chart.jpg'
import adaChart from '../assets/ada-chart.jpg'
import dogeChart from '../assets/doge-chart.jpg'
import solChart from '../assets/sol-chart.jpg'

export default [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: btcLogo,
    chart_7d: btcChart,
    price: 29124,
    percent_change_1h: 0.5,
    percent_change_24h: -1.3,
    percent_change_7d: 4.2,
    market_cap: 550000000000,
    volume_24h: 12000000000,
    circulating_supply: 19300000,
    max_supply: 21000000,
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: ethLogo,
    chart_7d: ethChart,
    price: 1845,
    percent_change_1h: -0.2,
    percent_change_24h: 0.8,
    percent_change_7d: 3.9,
    market_cap: 220000000000,
    volume_24h: 8500000000,
    circulating_supply: 120000000,
    max_supply: 342000000,
  },
  {
    id: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: usdtLogo,
    chart_7d: usdtChart,
    price: 1,
    percent_change_1h: 0.01,
    percent_change_24h: 0.02,
    percent_change_7d: -0.01,
    market_cap: 83000000000,
    volume_24h: 25000000000,
    circulating_supply: 83000000000,
    max_supply: 75000000000,
  },
  {
    id: 4,
    name: 'BNB',
    symbol: 'BNB',
    logo: bnbLogo,
    chart_7d: bnbChart,
    price: 315,
    percent_change_1h: 0.4,
    percent_change_24h: 0.6,
    percent_change_7d: 2.1,
    market_cap: 49000000000,
    volume_24h: 1200000000,
    circulating_supply: 155000000,
    max_supply: 200000000,
  },
  {
    id: 5,
    name: 'XRP',
    symbol: 'XRP',
    logo: xrpLogo,
    chart_7d: xrpChart,
    price: 0.52,
    percent_change_1h: -0.1,
    percent_change_24h: 0.3,
    percent_change_7d: -2.2,
    market_cap: 27000000000,
    volume_24h: 1500000000,
    circulating_supply: 52000000000,
    max_supply: 100000000000,
  },
  {
    id: 6,
    name: 'Cardano',
    symbol: 'ADA',
    logo: adaLogo,
    chart_7d: adaChart,
    price: 0.36,
    percent_change_1h: 0.2,
    percent_change_24h: -0.4,
    percent_change_7d: 1.5,
    market_cap: 12600000000,
    volume_24h: 300000000,
    circulating_supply: 35000000000,
    max_supply: 45000000000,
  },
  {
    id: 7,
    name: 'Dogecoin',
    symbol: 'DOGE',
    logo: dogeLogo,
    chart_7d: dogeChart,
    price: 0.08,
    percent_change_1h: 1.1,
    percent_change_24h: 2.5,
    percent_change_7d: 5.2,
    market_cap: 11500000000,
    volume_24h: 700000000,
    circulating_supply: 140000000000,
    max_supply: 420000000000,
  },
  {
    id: 8,
    name: 'Solana',
    symbol: 'SOL',
    logo: solLogo,
    chart_7d: solChart,
    price: 24.5,
    percent_change_1h: -0.3,
    percent_change_24h: 1.4,
    percent_change_7d: 6.3,
    market_cap: 10400000000,
    volume_24h: 1200000000,
    circulating_supply: 425000000,
    max_supply: 325000000,
  }
]
