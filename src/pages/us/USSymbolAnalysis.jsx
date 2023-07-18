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
} from 'antd'
import axios from 'axios'
import StockData from '../../components/StockData'
import Wrapper from '../../components/Wrapper'
import { useSearchParams } from 'react-router-dom'

const USSymbolAnalysis = (props) => {
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const [num, setNum] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const symbolStr = searchParams.get('symbolStr')
    if (symbolStr) {
      onFinish({ symbolStr: symbolStr, period: 30 })
    }
  }, [])

  const onFinish = (values) => {
    axios
      .get('/api/us/collection/symbol/data', {
        params: values,
      })
      .then((res) => {
        setData(res.data)
      })
  }
  const options = [
    {
      label: '超级趋势',
      value: JSON.stringify({
        url: '/api2/tech/analysis/trend/buy?type=us',
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
    const params = { symbolStr: res.data.join(','), period: 90 }
    onFinish(params)
    setLoading(false)
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
            >
              <StockData data={item.usData} />
            </Card>
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}

export default USSymbolAnalysis
