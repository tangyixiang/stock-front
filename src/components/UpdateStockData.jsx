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
        return [
          { title: `${current.date} ${current.time}`, value: '' },
          { title: 'open', value: current.open },
          { title: 'close', value: current.close },
          { title: 'high', value: current.high },
          { title: 'low', value: current.low },
          {
            title: '涨幅:',
            value: {
              text: current.diffPer + '%',
              color: current.diffPer < 0 ? '#10B981' : '#EF4444',
            },
          },
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

const UpdateStockData = (props) => {
  const chart = useRef()
  const paneId = useRef('')
  const id = useId()

  useEffect(() => {
    const updatedData = props.data.map((item) => {
      return {
        ...item,
        volume: item.vol,
      }
    })

    chart.current = init(id, {
      locale: 'zh-CN',
      timezone: 'America/New_York',
    })
    chart.current?.zoomAtCoordinate(6)
    chart.current?.createIndicator('VOL', true)
    chart.current?.createIndicator({ name: 'EMA', calcParams: [20] }, false, {
      id: 'candle_pane',
    })
    chart.current?.applyNewData(updatedData)
    return () => {
      dispose(id)
    }
  }, [])

  useEffect(() => {
    const updatedData = props.data.map((item) => {
      return {
        ...item,
        volume: item.vol,
      }
    })
    chart.current?.applyNewData(updatedData)
  }, [props.data])

  useEffect(() => {
    if (props.type == 'Area') {
      barStyle.candle.type = 'area'
    } else {
      barStyle.candle.type = 'candle_up_stroke'
    }
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

export default UpdateStockData
