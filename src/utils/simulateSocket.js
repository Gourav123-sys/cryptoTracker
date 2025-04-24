export const simulateCryptoUpdates = (data) => {
    return data.map(coin => {
      const rand = () => (Math.random() * 2 - 1).toFixed(2)
      return {
        symbol: coin.symbol,
        price: +(coin.price * (1 + rand() / 100)).toFixed(2),
        percent_change_1h: +rand(),
        percent_change_24h: +rand(),
        percent_change_7d: +rand(),
        volume_24h: coin.volume_24h + Math.floor(Math.random() * 1000000 - 500000)
      }
    })
  }
  