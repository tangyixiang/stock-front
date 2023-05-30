import { Card } from 'antd'
import React from 'react'
import StockData from './StockData'

const StockCard = (props) => {
  const { symbol, name, market_value, data } = props.data

  const title = `${symbol}${name ? '-' + name : ''}${
    market_value ? '-' + (market_value / 10000 / 10000).toFixed(2) + '亿' : ''
  }`

  return (
    <Card
      title={title}
      type="inner"
      style={{
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <StockData data={data} />
    </Card>
  )
}

export default StockCard
