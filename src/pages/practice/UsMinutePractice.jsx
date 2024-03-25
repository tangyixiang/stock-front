import React, { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import Wrapper from '../../components/Wrapper'
import {
  DatePicker,
  Button,
  Space,
  Row,
  Divider,
  Col,
  Table,
  Spin,
  message,
  Card,
  Form,
  Select,
  Input,
} from 'antd'
import axios from 'axios'
import UpdateStockData from '../../components/UpdateStockData'

const options = [
  {
    value: 'QQQ',
    label: 'QQQ',
  },
]

const UsMinutePractice = () => {
  const [practiceData, setPracticeData] = useImmer({
    date: undefined,
    symbol: undefined,
    nextTradeDate: undefined,
    currentDateBarData: [],
    nextDateBarData: undefined,
  })
  const [specifyDateData, setSpecifyDateData] = useState([])
  const [stockData, setStockData] = useState([])
  // 默认下标
  const [startIndex, setstartIndex] = useState(0)
  const [oneMIndex, setOneMIndex] = useState(0)

  const [oneMData, setOneMData] = useState([])

  const finish = (formData) => {
    const data = { ...formData, date: formData['date'].format('YYYY-MM-DD') }
    setPracticeData((draft) => {
      draft.symbol = data.symbol
      draft.date = data.date
    })

    axios.get('/api/practice/us/trade/day', { params: data }).then((res) => {
      setPracticeData((draft) => {
        draft.nextTradeDate = res.data
      })
    })
    axios
      .get('/api/practice/us/getMinuteData', {
        params: { ...data, interval: '5m' },
      })
      .then((res) => {
        setPracticeData((draft) => {
          draft.currentDateBarData = res.data
        })
        // console.log(res.data)
        setSpecifyDateData(res.data)
        setStockData(res.data)
      })
    axios
      .get('/api/practice/us/getMinuteData', {
        params: { ...data, interval: '1m' },
      })
      .then((res) => {
        setPracticeData((draft) => {
          draft.nextDateBarData = res.data
        })
      })
  }

  function handleKeyDown(event) {
    let tempData
    if (event.keyCode === 37) {
      tempData = practiceData.nextDateBarData.slice(0, startIndex)
      setstartIndex(startIndex - 1)
    } else if (event.keyCode === 39) {
      // 右箭头键
      tempData = practiceData.nextDateBarData.slice(0, startIndex + 1)
      setstartIndex(startIndex + 1)
    }
    const tempDataGroup = chunkArray(tempData, 5)
    const fiveTempData = tempDataGroup.map((item) => generateNewObject(item))
    console.log(fiveTempData)
    const stockData = specifyDateData.concat(fiveTempData)
    setStockData(stockData)
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
      <Form layout="inline" onFinish={finish}>
        <Form.Item label="代码:" name={'symbol'}>
          <Select
            style={{
              width: 120,
            }}
            options={options}
          />
        </Form.Item>
        <Form.Item label="日期:" name={'date'}>
          <DatePicker format={'YYYY-MM-DD'} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询历史数据
          </Button>
        </Form.Item>
        <Button type="primary" danger onClick={() => reset()}>
          重置
        </Button>
      </Form>
      {specifyDateData.length > 0 && (
        <Card onKeyDown={handleKeyDown}>
          <UpdateStockData data={stockData} highClass={'h-[550px]'} />
        </Card>
      )}

      {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex justify-center items-center">
        <Space>
          <Button type="primary">买入</Button>
          <Button>暂停</Button>
          <Button type="primary" danger>
            卖出
          </Button>
        </Space>
      </div> */}
    </Wrapper>
  )
}

export default UsMinutePractice
