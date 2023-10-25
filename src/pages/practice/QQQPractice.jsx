import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import {
  Typography,
  DatePicker,
  Button,
  Space,
  Row,
  Divider,
  Col,
  message,
  Spin,
} from 'antd'
import axios from 'axios'
import StockData from '../../components/StockData'
import UpdateStockData from '../../components/UpdateStockData'

function QQQPractice() {
  const [date, setDate] = useState()
  const [practiceDay, setPracticeDay] = useState()
  const [dailyData, setDailyData] = useState([])
  const [practiceDayData, setPracticeDayData] = useState([])
  const [practiceDayDataArray, setPracticeDayDataArray] = useState([])
  const [nextDayIndex, setNextDayIndex] = useState(0)
  const [tempData, setTempData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const selectDate = (date, dateStr) => {
    setDate(dateStr)
    setDailyData([])
  }

  const refreseDayData = (dateStr) => {
    axios
      .get('/api/practice/qqq', { params: { date: dateStr } })
      .then((res) => {
        setDailyData(res.data)
      })
  }

  const getDayData = () => {
    axios.get('/api/practice/qqq', { params: { date: date } }).then((res) => {
      setDailyData(res.data)
      // 获取未来的练习日期
      getNextTradingDate(date)
    })
  }

  const getNextTradingDate = (dateStr) => {
    axios
      .get('/api/practice/qqq/trade/day', { params: { date: dateStr } })
      .then((res) => {
        setPracticeDayDataArray(res.data)
        setPracticeDay(res.data[0])
        getPracticeDayData(res.data[0])
      })
  }

  const getPracticeDayData = (dateStr) => {
    setLoading(true)
    axios
      .get('/api/practice/qqq/3m', { params: { date: dateStr } })
      .then((res) => {
        setPracticeDayData(practiceDayData.concat(res.data))
        setLoading(false)
      })
  }

  const reset = () => {
    setDate('')
    setPracticeDay('')
    setDailyData([])
    setPracticeDayData([])
    setStartIndex(0)
    setTempData([])
  }

  function handleKeyDown(event) {
    if (loading) {
      return
    }
    if (event.keyCode === 37) {
      // 左箭头键
      if (startIndex > 0) {
        const tempIndex = startIndex - 1
        setStartIndex(tempIndex)
        setTempData(practiceDayData.slice(0, tempIndex))
      }
    } else if (event.keyCode === 39) {
      // 右箭头键
      const tempIndex = startIndex + 1
      if (startIndex <= practiceDayData.length) {
        setStartIndex(tempIndex)
        setTempData(practiceDayData.slice(0, tempIndex))
      } else {
        setNextDayIndex(nextDayIndex + 1)
        setDate(practiceDayDataArray[nextDayIndex])
        refreseDayData(practiceDayDataArray[nextDayIndex])
        setPracticeDay(practiceDayDataArray[nextDayIndex + 1])
        getPracticeDayData(practiceDayDataArray[nextDayIndex + 1])
      }
    }
  }

  return (
    <Wrapper>
      <Space>
        <Typography.Text>日期:</Typography.Text>
        <DatePicker onChange={selectDate} format={'YYYY-MM-DD'} />
        <Button type="primary" onClick={() => getDayData()}>
          查询历史数据
        </Button>
        {/* <Button type="primary" onClick={() => getPracticeDay()}>
          开始训练
        </Button> */}
        <Button type="primary" danger onClick={() => reset()}>
          重置
        </Button>
      </Space>
      <Divider />
      {/* onKeyDown={handleKeyDown} */}
      {dailyData.length > 0 && (
        <Row>
          <Col span={10}>
            <div>日期:{date}</div>
            <StockData data={dailyData} highClass={'h-[550px]'} />
          </Col>
          <Col span={12} offset={handleKeyDown} onKeyDown={handleKeyDown}>
            {loading && <Spin />}
            <div>日期:{practiceDay}</div>
            <UpdateStockData data={tempData} />
          </Col>
        </Row>
      )}
    </Wrapper>
  )
}

export default QQQPractice
