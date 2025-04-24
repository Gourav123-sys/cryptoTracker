import { updateData } from '../features/cryptoSlice.js'
import { mockData } from '../utils/mockData.js'

let interval

export const startMockWebSocket = (dispatch) => {
  interval = setInterval(() => {
    const updatedData = mockData.map((coin) => ({
      ...coin,
      price: (coin.price * (1 + (Math.random() - 0.5) / 50)).toFixed(2),
    }))
    dispatch(updateData(updatedData))
  }, 2000)
}

export const stopMockWebSocket = () => {
  clearInterval(interval)
}
