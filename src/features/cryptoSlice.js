import { createSlice } from '@reduxjs/toolkit'
import initialData from '../utils/mockData.js'

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: initialData,
  reducers: {
    updateCryptoData: (state, action) => {
      return state.map(coin => {
        const updated = action.payload.find(c => c.symbol === coin.symbol)
        return updated ? { ...coin, ...updated } : coin
      })
    }
  }
})

export const { updateCryptoData } = cryptoSlice.actions
export default cryptoSlice.reducer
