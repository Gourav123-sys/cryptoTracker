import { useDispatch } from 'react-redux'
import { setFilter, setSort } from '../features/cryptoSlice.js'

export default function Filters() {
  const dispatch = useDispatch()

  const handleSort = (key) => {
    dispatch(setSort({ key, order: 'asc' }))
  }

  return (
    <div className="flex justify-between items-center p-2 bg-gray-100">
      <input
        type="text"
        placeholder="Search"
        className="border p-2 rounded w-1/2"
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <div className="space-x-2">
        <button onClick={() => handleSort('name')} className="btn">Sort by Name</button>
        <button onClick={() => handleSort('price')} className="btn">Sort by Price</button>
      </div>
    </div>
  )
}
