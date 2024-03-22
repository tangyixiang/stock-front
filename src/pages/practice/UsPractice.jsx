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
  // 训练日的数据
  const [practiceDayData, setPracticeDayData] = useState([])
  const [nextDayData, setNextDayData] = useState({})
  // 指定日期之后的所有交易日
  const [practiceDayDataArray, setPracticeDayDataArray] = useState([])
  const [nextDayIndex, setNextDayIndex] = useState(0)
  // 指定日期的数据
  const [specifyDateData, setSpecifyDateData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [tradeLog, setTradeLog] = useState([])
  const [diffPer, setDiffPer] = useState(0)

  useEffect(() => {
    if (specifyDateData.length > 0) {
      const lastBarData = (
        ((specifyDateData[specifyDateData.length - 1].close -
          dailyData[dailyData.length - 1].close) /
          dailyData[dailyData.length - 1].close) *
        100
      ).toFixed(2)
      setDiffPer(lastBarData)
    }
  }, [specifyDateData])

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

  // 初始化指定日期之后的所有的交易日
  const initTradingDate = (formData) => {
    axios
      .get('/api/practice/us/trade/day', {
        params: formData,
      })
      .then((res) => {
        // 指定日期之后的第一个交易日
        setPracticeDay(res.data[0])
        setPracticeDayDataArray(res.data)

        axios
          .get(`/api/practice/us/getMinuteData`, {
            params: {
              symbol: formData.symbol,
              date: formData.date,
              interval: '5m',
            },
          })
          .then((res) => {
            // 指定日期当天的分时
            const dateData = res.data
            setStartIndex(data.length)
            setSpecifyDateData(dateData)
          })

        axios
          .get(`/api/practice/us/multi/minute/data`, {
            params: { symbol: formData.symbol, date: res.data[0] },
          })
          .then((res) => {
            setNextDayData(res.data)
          })
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
    setSpecifyDateData([])
  }

  function handleKeyDown(event) {
    if (loading) {
      return
    }
    console.log(specifyDateData[specifyDateData.length - 1])
    if (event.keyCode === 37) {
     
    } else if (event.keyCode === 39) {
     
    }
  }

  const tradeBar = (type) => {
    const data = specifyDateData[specifyDateData.length - 1]
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
              <UpdateStockData data={specifyDateData} highClass={'h-[550px]'} />
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
