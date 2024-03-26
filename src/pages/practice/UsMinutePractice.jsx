import React, { useState, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import Wrapper from '../../components/Wrapper'
import { DatePicker, Button, Space, Card, Form, Select, message } from 'antd'
import axios from 'axios'
import UpdateStockData from '../../components/UpdateStockData'

const options = [
  {
    value: 'QQQ',
    label: 'QQQ',
  },
]

const UsMinutePractice = () => {
  const stockRef = useRef(null)

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

  const finish = (formData) => {
    console.log(formData)
    const data = { ...formData, date: formData['date'].format('YYYY-MM-DD') }
    setPracticeData((draft) => {
      draft.symbol = data.symbol
      draft.date = data.date
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
      const tempLastDayBar = practiceData.nextDateBarData
      const index = (tempLastDayBar % 390) + 1
      if (index >= practiceData.nextTradeDate.length) {
        message.error('最后一天数据了')
        clearInterval(intervalId)
        return
      }
      axios
        .get('/api/practice/us/getMinuteData', {
          params: {
            symbol: data.symbol,
            date: practiceData.nextTradeDate[index],
            interval: '1m',
          },
        })
        .then((res3) => {
          setPracticeData((draft) => {
            draft.nextDateBarData = draft.nextDateBarData.concat(res3.data)
          })
        })
    }
    let tempData = practiceData.nextDateBarData.slice(0, startIndex)
    const tempDataGroup = chunkArray(tempData, 5)
    const fiveTempData = tempDataGroup.map((item) => generateNewObject(item))
    const stockData = specifyDateData.concat(fiveTempData)
    setStockData(stockData)
  }, [startIndex])

  function handleKeyDown(event) {
    if (event.keyCode === 37) {
      setstartIndex(startIndex - 1)
    } else if (event.keyCode === 39) {
      setstartIndex(startIndex + 1)
    }
  }

  function runTask() {
    const temp = setInterval(autoUpdate, 2000)
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
      <Form layout="inline" onFinish={finish} initialValues={{ symbol: 'QQQ' }}>
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
      </Form>
      {specifyDateData.length > 0 && (
        <Card onKeyDown={handleKeyDown} ref={stockRef}>
          <UpdateStockData data={stockData} highClass={'h-[550px]'} />
        </Card>
      )}
    </Wrapper>
  )
}

export default UsMinutePractice
