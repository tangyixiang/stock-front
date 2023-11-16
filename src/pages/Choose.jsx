import React, { useState, useEffect } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios'
import {
  Typography,
  Space,
  Button,
  Divider,
  Form,
  Row,
  Col,
  Card,
  Input,
} from 'antd'
import dayjs from 'dayjs'
import StockData from '../components/StockData'

function Choose() {
  const [marketType, setMarketType] = useState('cn')
  const [chooseType, setChooseType] = useState()
  const [chooseList, setChooseList] = useState({})
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [num, setNum] = useState(0)
  const [loading, setLoading] = useState(false)
  const today = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    axios.get('/api/tech/stock/getType').then((res) => setChooseList(res.data))
  }, [])

  useEffect(() => {
    if (!marketType || !chooseType) return
    axios
      .post('/api/tech/stock/choose', {
        marketType: marketType,
        marketValue: 20,
        name: [chooseType],
        date: today,
      })
      .then((res) => {
        axios
          .post(`/api/${marketType}/collection/symbol/data`, {
            period: 100,
            symbolList: res.data,
          })
          .then((res) => {
            setData(res.data)
          })
      })
  }, [marketType, chooseType])

  const addAlaram = (values) => {
    axios
      .post('/api/alarm/add', values)
      .then((res) => message.success('添加成功'))
  }

  return (
    <Wrapper>
      <Space direction="horizontal" size="middle">
        <Typography.Text>国家:</Typography.Text>
        <Button
          type={marketType === 'cn' ? 'primary' : 'default'}
          onClick={() => setMarketType('cn')}
        >
          中国
        </Button>
        <Button
          type={marketType === 'us' ? 'primary' : 'default'}
          onClick={() => setMarketType('us')}
        >
          美国
        </Button>
        <Typography.Text>类型:</Typography.Text>
        {Object.keys(chooseList).map((key) => (
          <Button
            key={chooseList[key]}
            type={chooseType === chooseList[key] ? 'primary' : 'default'}
            onClick={() => setChooseType(chooseList[key])}
          >
            {key}
          </Button>
        ))}
      </Space>
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

export default Choose
