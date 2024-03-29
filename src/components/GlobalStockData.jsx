import React, { useEffect, useRef, useId } from 'react'
import { init, dispose, LineType } from 'klinecharts'

const barStyle = {
  candle: {
    // 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
    type: 'candle_solid',
    // 蜡烛柱
    bar: {
      upColor: '#F13E3A',
      downColor: '#00A843',
      noChangeColor: '#888888',
      upBorderColor: '#F13E3A',
      downBorderColor: '#00A843',
      noChangeBorderColor: '#888888',
      upWickColor: '#F13E3A',
      downWickColor: '#00A843',
      noChangeWickColor: '#888888',
    },
    // 面积图
    area: {
      lineSize: 2,
      lineColor: '#2196F3',
      value: 'close',
      backgroundColor: [
        {
          offset: 0,
          color: 'rgba(33, 150, 243, 0.01)',
        },
        {
          offset: 1,
          color: 'rgba(33, 150, 243, 0.2)',
        },
      ],
    },
    tooltip: {
      showRule: 'follow_cross',
      showType: 'rect',
      rect: {
        position: 'fixed',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 6,
      },
      custom: (data, styles) => {
        const { current } = data
        const temp = current.turnover / 10000
        return [
          { title: current.date, value: '' },
          { title: 'open', value: current.open },
          { title: 'close', value: current.close },
          { title: 'high', value: current.high },
          { title: 'low', value: current.low },
          { title: 'volume', value: current.volume },
          {
            title: '成交额:',
            value:
              temp > 10000
                ? (temp / 10000).toFixed(2) + '亿'
                : temp.toFixed(2) + '万',
          },
          {
            title: '涨幅:',
            value: {
              text: current.diffPer + '%',
              color: current.diffPer < 0 ? '#10B981' : '#EF4444',
            },
          },
          { title: '换手率:', value: current.exchangeRate },
        ]
      },
    },
  },
  indicator: {
    bars: [
      {
        // 'fill' | 'stroke' | 'stroke_fill'
        style: 'fill',
        // 'solid' | 'dashed'
        borderStyle: 'solid',
        borderSize: 1,
        borderDashedValue: [2, 2],
        upColor: 'rgb(241, 62, 58)',
        downColor: 'rgb(0, 168, 67)',
        noChangeColor: '#888888',
      },
    ],
    tooltip: {
      showRule: 'follow_cross',
      showType: 'standard',
    },
  },
}

const GlobalStockData = (props) => {
  const chart = useRef()
  const paneId = useRef('')
  const id = useId()

  useEffect(() => {
    const data = props.data
    data.forEach((item) => {
      item.timestamp = new Date(item.date).getTime()
      item.volume = item.tradeVol
      item.turnover = item.tradeQuota
    })

    chart.current = init(id, {
      locale: 'zh-CN',
      customApi: {
        formatBigNumber: (values) => {
          const data = values / 10000
          if (data > 100000) {
            return (data / 10000).toFixed(2) + '亿'
          } else {
            return data.toFixed(2) + '万'
          }
        },
      },
    })
    // paneId.current = chart.current?.createIndicator('VOL', true)
    chart.current?.setBarSpace(2)
    chart.current?.createIndicator('VOL', true)
    chart.current?.applyNewData(data)
    return () => {
      dispose(id)
    }
  }, [])

  useEffect(() => {
    if (props.type == 'Area') {
      barStyle.candle.type = 'area'
    } else {
      barStyle.candle.type = 'candle_up_stroke'
    }
    const data = props.data
    data.forEach((item) => {
      item.timestamp = new Date(item.date).getTime()
      item.volume = item.tradeVol
      item.turnover = item.tradeQuota
    })
    chart.current?.applyNewData(data)
    chart.current?.setStyles(barStyle)
  }, [props])

  const classNames = ['w-full']
  if (props.highClass) {
    classNames.push(props.highClass)
  } else {
    classNames.push('h-80')
  }
  return <div ref={chart} id={id} className={classNames.join(' ')} />
  // style={{ width: '620px', height: '440px' }}
}

export default GlobalStockData
