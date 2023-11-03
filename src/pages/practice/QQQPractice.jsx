import React, { useEffect, useState } from 'react'
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
  const [tradeLog, setTradeLog] = useState([])
  const [diffPer, setDiffPer] = useState(0)

  useEffect(() => {
    if (tempData.length > 0) {
      const lastBarData = (
        ((tempData[tempData.length - 1].close -
          dailyData[dailyData.length - 1].close) /
          dailyData[dailyData.length - 1].close) *
        100
      ).toFixed(2)
      setDiffPer(lastBarData)
    }
  }, [tempData])

  const columns = [
    {
      title: '时间',
      dataIndex: 'datetime',
      key: 'datetime',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
  ]

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
      initTradingDate(date)
    })
  }

  // 初始化练习日期的数据
  const initTradingDate = (dateStr) => {
    axios
      .get('/api/practice/qqq/trade/day', { params: { date: dateStr } })
      .then((res) => {
        setPracticeDay(res.data[0])
        setPracticeDayDataArray(res.data)
        getTimeSharingData(dateStr, '3m').then((data) => {
          const lastDayData = data
          setStartIndex(data.length)
          setTempData(lastDayData)
          getTimeSharingData(res.data[0], '3m').then((data2) => {
            const mergedArray = lastDayData.concat(data2)
            setPracticeDayData(mergedArray)
          })
        })
      })
  }

  // 获取不同分时的数据
  const getTimeSharingData = async (dateStr, period) => {
    const periodDataResult = await axios.get(`/api/practice/qqq/${period}`, {
      params: { date: dateStr },
    })
    return periodDataResult.data
  }

  const loadingNextDayData = (dateStr) => {
    if (!dateStr) return
    setLoading(true)
    axios
      .get('/api/practice/qqq/3m', { params: { date: dateStr } })
      .then((res) => {
        setPracticeDayData(practiceDayData.concat(res.data))
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        message.error('暂无数据')
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
    console.log(tempData[tempData.length - 1])
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
      if (tempIndex <= practiceDayData.length) {
        setStartIndex(tempIndex)
        setTempData(practiceDayData.slice(0, tempIndex))
      } else {
        setNextDayIndex(nextDayIndex + 1)
        setDate(practiceDayDataArray[nextDayIndex])
        refreseDayData(practiceDayDataArray[nextDayIndex])
        setPracticeDay(practiceDayDataArray[nextDayIndex + 1])
        loadingNextDayData(practiceDayDataArray[nextDayIndex + 1])
      }
    }
  }

  const tradeBar = (type) => {
    const data = tempData[tempData.length - 1]
    const logData = {
      datetime: data.date + ' ' + data.time,
      price: data.close,
      type: type,
    }
    const temp = []
    tradeLog.forEach((item) => temp.push(item))
    temp.push(logData)
    setTradeLog(temp)
  }

  return (
    <Wrapper nobg>
      <Form layout="inline">
        <Form.Item label="日期:">
          <DatePicker onChange={selectDate} format={'YYYY-MM-DD'} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => getDayData()}>
            查询历史数据
          </Button>
        </Form.Item>
        <Button type="primary" danger onClick={() => reset()}>
          重置
        </Button>
      </Form>
      <Divider />
      {dailyData.length > 0 && (
        <Row gutter={12}>
          <Col span={10}>
            <Card title={`日期: ${date}`}>
              {/* <Typography.Text></Typography.Text> */}
              <StockData data={dailyData} highClass={'h-[550px]'} />
            </Card>
          </Col>
          <Col span={14} onKeyDown={handleKeyDown}>
            <Card
              title={`练习日期: ${practiceDay} 涨跌幅 ${diffPer}%`}
              extra={
                <Space>
                  <Button type="primary" onClick={() => tradeBar('buy')}>
                    买入
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => tradeBar('sell')}
                  >
                    卖出
                  </Button>
                </Space>
              }
            >
              {loading && <Spin />}
              <UpdateStockData data={tempData} highClass={'h-[550px]'} />
            </Card>
          </Col>
          {/* <Col span={5} className="ml-6">
            <Table dataSource={tradeLog} columns={columns} className="w-full" />
          </Col> */}
        </Row>
      )}
    </Wrapper>
  )
}

export default QQQPractice
