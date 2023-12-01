import React, { useState, useEffect } from 'react'
import {
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  Spin,
  message,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import StockData from '../components/StockData'
import Wrapper from '../components/Wrapper'
import { useSearchParams } from 'react-router-dom'

const SymbolAnalysis = (props) => {
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const [num, setNum] = useState(0)
  const [loading, setLoading] = useState(false)
  const today = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    const symbolStr = searchParams.get('symbolStr')

    if (symbolStr) {
      onFinish({ symbolStr: symbolStr, period: 30 })
    }
  }, [])

  const onFinish = (values) => {
    if (values.symbolList) {
      values.symbolList = JSON.parse(values.symbolList)
    }
    console.log(values)
    axios.post('/api/cn/collection/symbol/data', values).then((res) => {
      setData(res.data)
    })
  }
  const options = [
    {
      label: 'EMA5日突破',
      value: JSON.stringify({
        url: '/api/tech/analysis/breakthrough/5days',
        method: 'get',
      }),
    },
    {
      label: 'EMV启动',
      value: JSON.stringify({
        url: '/api2/tech/analysis/emv/filter',
        method: 'post',
        params: {
          start_mark_value: 50,
          end_mark_value: 100,
          start_value: 0,
        },
      }),
    },
    {
      label: '超级趋势',
      value: JSON.stringify({
        url: '/api2/tech/analysis/trend/buy?type=cn',
        method: 'get',
      }),
    },
    {
      label: '4根相同K线',
      value: JSON.stringify({
        url: '/api2/tech/analysis/4ksame?type=cn',
        method: 'get',
      }),
    },
    {
      label: '每日关注',
      value: JSON.stringify({
        url: `/api/report/focus?marketType=cn&filter=1&highOpen=`,
        method: 'get',
      }),
    },
    {
      label: 'EMA50',
      value: JSON.stringify({
        url: `/api/tech/analysis/ema?marketType=cn&num=50`,
        method: 'get',
      }),
    },
    {
      label: 'EMA200',
      value: JSON.stringify({
        url: `/api/tech/analysis/ema?marketType=cn&num=200`,
        method: 'get',
      }),
    },
  ]

  const getSymbolList = async (data) => {
    let res
    setLoading(true)
    const request = JSON.parse(data)
    if (request.method == 'get') {
      res = await axios.get(request.url)
    } else {
      res = await axios.post(request.url, request.params)
    }
    setNum(res.data.length)
    const params = { symbolStr: res.data.join(','), period: 100 }
    onFinish(params)
    setLoading(false)
  }

  const addAlaram = (values) => {
    axios
      .post('/api/alarm/add', values)
      .then((res) => message.success('添加成功'))
  }

  return (
    <Wrapper>
      <Form form={form} layout={'inline'} onFinish={onFinish}>
        <Form.Item label="技术类型" name="techName">
          <Select
            style={{
              width: 180,
            }}
            options={options}
            onChange={getSymbolList}
          />
        </Form.Item>
        <Form.Item label="代码(字符)" name="symbolStr">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="代码(数组)" name="symbolList">
          <Input allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>总数:{num}</Form.Item>
      </Form>

      <Divider />
      {loading && <Spin />}
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col xs={24} sm={12} xxl={8} key={item.symbol}>
            <Card
              title={`${item.symbol}-${item.name}-${(
                item.marketValue /
                10000 /
                10000
              ).toFixed(2)}亿`}
              type="inner"
              style={{
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              }}
              extra={
                <Form layout="inline" onFinish={addAlaram}>
                  <Form.Item
                    name={'symbol'}
                    initialValue={item.symbol}
                    className="hidden"
                  >
                    <Input size="small" autoComplete="off" />
                  </Form.Item>
                  <Form.Item name={'price'} label="提醒价格">
                    <Input
                      size="small"
                      autoComplete="off"
                      style={{ width: 60 }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button size="small" type="primary" htmlType="submit">
                      确认
                    </Button>
                  </Form.Item>
                </Form>
              }
            >
              <StockData data={item.data} />
            </Card>
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}

export default SymbolAnalysis
