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
  Select,
} from 'antd'
import axios from 'axios'
import StockData from '../../components/StockData'
import UpdateStockData from '../../components/UpdateStockData'

const options = [
  {
    value: 'QQQ',
    label: 'QQQ',
  },
  //   {
  //     value: 'AAPL',
  //     label: 'AAPL',
  //   },
  //   {
  //     value: 'MSFT',
  //     label: 'MSFT',
  //   },
  //   {
  //     value: 'GOOG',
  //     label: 'GOOG',
  //   },
  //   {
  //     value: 'AMZN',
  //     label: 'AMZN',
  //   },
  //   {
  //     value: 'TSLA',
  //     label: 'TSLA',
  //   },
  //   {
  //     value: 'NVDA',
  //     label: 'NVDA',
  //   },
  //   {
  //     value: 'META',
  //     label: 'META',
  //   },
]

function UsPractice() {
  const [date, setDate] = useState()
  const [symbol, setSymbol] = useState()
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

  const refreseDayData = (dateStr) => {
    axios
      .get('/api/practice/us', { params: { symbol: symbol, date: dateStr } })
      .then((res) => {
        setDailyData(res.data)
      })
  }

  // 初始化练习日期的数据
  const initTradingDate = (formData) => {
    axios
      .get('/api/practice/us/trade/day', {
        params: formData,
      })
      .then((res) => {
        setPracticeDay(res.data[0])
        setPracticeDayDataArray(res.data)
        getTimeSharingData(formData.symbol, formData.date, '5m').then(
          (data) => {
            const lastDayData = data
            setStartIndex(data.length)
            setTempData(lastDayData)
            getTimeSharingData(formData.symbol, res.data[0], '5m').then(
              (data2) => {
                const mergedArray = lastDayData.concat(data2)
                setPracticeDayData(mergedArray)
              }
            )
          }
        )
      })
  }

  // 获取不同分时的数据
  const getTimeSharingData = async (symbol, dateStr, period) => {
    const periodDataResult = await axios.get(`/api/practice/us/getMinuteData`, {
      params: { symbol: symbol, date: dateStr, interval: period },
    })
    return periodDataResult.data
  }

  const loadingNextDayData = (dateStr) => {
    if (!dateStr) return
    setLoading(true)
    axios
      .get('/api/practice/us/getMinuteData', {
        params: { symbol: symbol, date: dateStr, interval: '5m' },
      })
      .then((res) => {
        setPracticeDayData(practiceDayData.concat(res.data))
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        message.error('暂无数据')
      })
  }

  const finish = (formData) => {
    const values = { ...formData, date: formData['date'].format('YYYY-MM-DD') }
    setSymbol(values.symbol)
    setDate(values.date)
    axios.get('/api/practice/us', { params: values }).then((res) => {
      //日线数据
      setDailyData(res.data)
      initTradingDate(values)
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
        message.info('请等待2s')
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

export default UsPractice
