import React, { useState, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import Wrapper from '../../components/Wrapper'
import {
  DatePicker,
  Button,
  Drawer,
  Card,
  Form,
  Select,
  message,
  Input,
} from 'antd'
import axios from 'axios'
import UpdateStockData from '../../components/UpdateStockData'
import StockData from '../../components/StockData'
import moment from 'moment'

const options = [
  {
    value: 'QQQ',
    label: 'QQQ',
  },
]

const OneDayMinutePractice = (props) => {
  const stockRef = useRef(null)
  const [form] = Form.useForm()
  const [practiceData, setPracticeData] = useImmer({
    date: undefined,
    symbol: undefined,
    nextTradeDate: [],
    currentDateBarData: [],
    nextDateBarData: [],
  })
  const [specifyDateData, setSpecifyDateData] = useState([])
  const [stockData, setStockData] = useState([])
  // 默认下标
  const [startIndex, setstartIndex] = useState(0)
  const [intervalId, setIntervalId] = useState(0)
  const [speed, setSpeed] = useState(2000)
  const [dailyData, setDailyData] = useImmer({
    date: '',
    data: [],
    show: false,
  })

  const finish = (formData) => {
    const dateStr = props.date
    setDailyData((draft) => {
      draft.date = dateStr
    })
    const data = { ...formData, date: dateStr }
    setPracticeData((draft) => {
      draft.symbol = data.symbol
      draft.date = data.date
    })

    axios
      .get('/api/practice/us', {
        params: { symbol: formData.symbol, date: dateStr },
      })
      .then((res) => {
        setDailyData((draft) => {
          draft.data = res.data
        })
      })

    axios.get('/api/practice/us/trade/day', { params: data }).then((res1) => {
      setPracticeData((draft) => {
        draft.nextTradeDate = res1.data
      })
      axios
        .get('/api/practice/us/fiveDay/getMinuteData', {
          params: { ...data, interval: '5m' },
        })
        .then((res2) => {
          setPracticeData((draft) => {
            draft.currentDateBarData = res2.data
          })
          // console.log(res.data)
          setSpecifyDateData(res2.data)
          setStockData(res2.data)
        })
      axios
        .get('/api/practice/us/getMinuteData', {
          params: {
            symbol: data.symbol,
            date: res1.data[0],
            interval: '1m',
          },
        })
        .then((res3) => {
          setPracticeData((draft) => {
            draft.nextDateBarData = res3.data
          })
        })
    })
  }

  useEffect(() => {
    console.log('update')
    if (startIndex > practiceData.nextDateBarData.length) {
      stopTask()
      message.info('结束')
    } else {
      console.log(startIndex)
      let tempData = practiceData.nextDateBarData.slice(0, startIndex)
      const tempDataGroup = chunkArray(tempData, 5)
      const fiveTempData = tempDataGroup.map((item) => generateNewObject(item))
      const stockData = specifyDateData.concat(fiveTempData)
      setStockData(stockData)
    }
  }, [startIndex])

  function handleKeyDown(event) {
    if (event.keyCode === 37) {
      setstartIndex(startIndex - 1)
    } else if (event.keyCode === 39) {
      setstartIndex(startIndex + 1)
    } else if (event.keyCode === 32) {
      // 空格暂停
      stopTask()
    } else if (event.keyCode === 13) {
      // 回车开始
      runTask()
    }
  }

  function runTask() {
    const temp = setInterval(autoUpdate, speed)
    setIntervalId(temp)
  }

  function stopTask() {
    clearInterval(intervalId)
  }

  function autoUpdate() {
    setstartIndex((prevCount) => prevCount + 1)
  }

  function chunkArray(arr, chunkSize) {
    return arr.reduce((result, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize)
      if (!result[chunkIndex]) {
        result[chunkIndex] = [] // 初始化当前分组
      }
      result[chunkIndex].push(item) // 将元素加入当前分组
      return result
    }, [])
  }

  function generateNewObject(chunk) {
    const symbol = chunk[0].symbol
    const date = chunk[0].date
    const open = chunk[0].open
    const close = chunk[chunk.length - 1].close

    const diffPer = Number((((close - open) / open) * 100).toFixed(2))

    let high = 0
    let low = 100000
    let vol = 0
    let timestamp = chunk[chunk.length - 1].timestamp
    let time = chunk[chunk.length - 1].time

    chunk.forEach((item) => {
      high = Math.max(high, item.high)
      low = Math.min(low, item.low)
      vol += item.vol
    })

    return {
      symbol,
      date,
      diffPer,
      open,
      high,
      low,
      close,
      vol,
      time,
      timestamp,
    }
  }

  return (
    <Wrapper>
      <Form
        form={form}
        layout="inline"
        onFinish={finish}
        initialValues={{ symbol: 'QQQ' }}
      >
        <Form.Item label="代码:" name={'symbol'} hidden>
          <Select
            style={{
              width: 120,
            }}
            options={options}
          />
        </Form.Item>
        <Form.Item label="运行速度" name="speed">
          <Input
            className="w-[100px]"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询历史数据
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger onClick={() => location.reload()}>
            重置
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={runTask}>
            开始
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger onClick={stopTask}>
            暂停
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="bg-amber-500"
            onClick={() =>
              setDailyData((draft) => {
                draft.show = true
              })
            }
          >
            查看日线
          </Button>
        </Form.Item>
      </Form>
      {specifyDateData.length > 0 && (
        <Card onKeyDown={handleKeyDown} ref={stockRef}>
          <UpdateStockData data={stockData} highClass={'h-[550px]'} />
        </Card>
      )}
      <Drawer
        title="日线"
        placement={'left'}
        width={'50%'}
        closable={false}
        onClose={() =>
          setDailyData((draft) => {
            draft.show = false
          })
        }
        open={dailyData.show}
        key={'k'}
      >
        {dailyData.data.length > 0 && (
          <StockData data={dailyData.data} highClass={'h-[750px]'} />
        )}
      </Drawer>
    </Wrapper>
  )
}

export default OneDayMinutePractice
