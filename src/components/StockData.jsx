import React, { useEffect, useRef, useId } from 'react'
import { init, dispose, LineType } from 'klinecharts'

function StockData(props) {
  const chart = useRef()
  const id = useId()

  useEffect(() => {
    const data = props.data
    data.forEach((item) => {
      item.timestamp = new Date(item.date).getTime()
      item.volume = item.trade_vol
    })

    chart.current = init(id)
    chart.current?.applyNewData(data)
    return () => {
      dispose(id)
    }
  }, [])
  return <div ref={chart} id={id} className="h-64 w-full" />
  // style={{ width: '620px', height: '440px' }}
}

export default StockData
