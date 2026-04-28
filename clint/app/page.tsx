import axios from 'axios'
import React from 'react'

const page = async () => {
  const data = await axios.get('http://localhost:3000/api/Market-Watch')
  return (
    <div>
      {data.data.map((item) => (
        <div key={item.symbol}>
          <h3>{item.name}</h3>
          <p>Symbol: {item.symbol}</p>
          <p>LTP: {item.ltp}</p>
          <p>% Change: {item.percentChange}</p>
        </div>
      ))}
    </div>
  )
}

export default page