import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Segmented, Space } from 'antd'
import axios from 'axios'
import Industry from '../components/Industry'
import StockLHB from '../components/StockLHB'
import HorizontalBarChart from '../components/HorizontalBarChart'
import Wrapper from '../components/Wrapper'
import MarketDistribute from '../components/MarketDistribute'
import UpAndDownRank from '../components/UpAndDownRank'

const USHome = () => {
  const [industry, setIndustry] = useState()
  const [upAndDownCount, setUpAndDownCount] = useState({})
  const [lhbData, setLhbData] = useState([])

  useEffect(() => {
    axios
      .get('/api/us/analysis/market/up/down')
      .then((res) => setUpAndDownCount(res.data))
  }, [])

  return (
    <Wrapper nobg>
      <Typography.Title level={5} className="px-2 m-0">
        主要指数
      </Typography.Title>
      <Row>
        <Col span={24}>
          <Card>
            <Card.Grid>Content</Card.Grid>
            <Card.Grid>Content</Card.Grid>
            <Card.Grid>Content</Card.Grid>
            <Card.Grid>Content</Card.Grid>
          </Card>
        </Col>
      </Row>
      <Typography.Title level={5} className="px-2 mb-0">
        涨跌
      </Typography.Title>
      <Row className="my-4" gutter={8}>
        <Col span={24}>
          <Card>
            {`上涨: ${upAndDownCount.up},下跌: ${upAndDownCount.down}`}
            <HorizontalBarChart
              up={upAndDownCount.up}
              down={upAndDownCount.down}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Title level={5} className="px-2">
            市值范围
          </Typography.Title>
          <MarketDistribute />
        </Col>
      </Row>
      <Row className="my-4" gutter={8}>
        <Col span={24}>
          <UpAndDownRank />
        </Col>
      </Row>
    </Wrapper>
  )
}

export default USHome
