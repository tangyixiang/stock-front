import React, { useState, useEffect } from 'react'
import Wrapper from '../../components/Wrapper'
import axios from 'axios'
import { Divider, Space, Select, Button, Row, Col, Card } from 'antd'
import StockData from '../../components/StockData'

const USQQQPeriod = () => {
  const [period, setPeriod] = useState()
  const [periodId, setPeriodId] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('/api/us/analysis/qqq/period', { params: { symbol: 'QQQ' } })
      .then((res) => {
        const periodOption = res.data.map((item) => {
          return { label: item.period, value: item.id }
        })
        setPeriod(periodOption)
      })
  }, [])

  const getData = () => {
    axios
      .get('/api/us/analysis/qqq/period/data', {
        params: { periodId: periodId },
      })
      .then((res) => setData(res.data))
  }

  return (
    <Wrapper nobg>
      <Space direction="horizontal">
        <Select
          className="w-40"
          options={period}
          onChange={(e) => setPeriodId(e)}
        />
        <Button onClick={getData}>查询</Button>
      </Space>
      <Divider />

      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col xs={24} sm={12} xxl={8} key={item.symbol}>
            <Card
              title={`${item.symbol}`}
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

export default USQQQPeriod
