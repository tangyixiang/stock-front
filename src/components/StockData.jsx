import React, { useEffect, useRef, useId } from 'react'
import { init, dispose, LineType } from 'klinecharts'

const barStyle = {
  candle: {
    // 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
    type: 'candle_up_stroke',
    // 蜡烛柱
    bar: {
      upColor: '#F46E6B',
      downColor: '#00A843',
      noChangeColor: '#888888',
      upBorderColor: '#F46E6B',
      downBorderColor: '#00A843',
      noChangeBorderColor: '#888888',
      upWickColor: '#F46E6B',
      downWickColor: '#00A843',
      noChangeWickColor: '#888888',
    },
    xAxis: {
      show: false,
    },
    tooltip: { showRule: 'none' },
    indicator: {
      tooltip: {
        showRule: 'none',
      },

      bars: [
        {
          // 'fill' | 'stroke' | 'stroke_fill'
          style: 'fill',
          // 'solid' | 'dashed'
          borderStyle: 'solid',
          borderSize: 1,
          borderDashedValue: [2, 2],
          upColor: 'rgba(244, 110, 107, .7)',
          downColor: 'rgba(0, 168, 67, .7)',
          noChangeColor: '#888888',
        },
      ],
    },
  },
}

function StockData(props) {
  const chart = useRef()
  const paneId = useRef('')
  const id = useId()

  useEffect(() => {
    const data = props.data
    data.forEach((item) => {
      item.timestamp = new Date(item.date).getTime()
      item.volume = item.trade_vol
    })

    chart.current = init(id)
    // paneId.current = chart.current?.createIndicator('VOL', true)
    chart.current?.createIndicator('VOL', true)
    chart.current?.createIndicator('BOLL', false, { id: 'candle_pane' })
    chart.current?.applyNewData(data)
    return () => {
      dispose(id)
    }
  }, [])

  useEffect(() => {
    chart.current?.setStyles(barStyle)
  }, [])

  return <div ref={chart} id={id} className="h-64 w-full" />
  // style={{ width: '620px', height: '440px' }}
}

export default StockData
