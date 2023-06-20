import React, { useState, useEffect } from 'react'
import { Divider, Form, Input, Button, Row, Col, Card } from 'antd'
import axios from 'axios'
import StockData from '../components/StockData'
import Wrapper from '../components/Wrapper'

const SymbolAnalysis = () => {
  const [data, setData] = useState([])
  const [form] = Form.useForm()

  const onFinish = (values) => {
    axios
      .get('/api/cn/collection/symbol/data', {
        params: values,
      })
      .then((res) => {
        setData(res.data)
      })
  }

  return (
    <Wrapper>
      <Form form={form} layout={'inline'} onFinish={onFinish}>
        <Form.Item label="代码" name="symbolStr">
          <Input allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <Divider />
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
              <StockData data={item.data} />
            </Card>
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}

export default SymbolAnalysis
