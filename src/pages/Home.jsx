import React, { useState, useEffect } from 'react'
import { Row, Col, Card, List, Table } from 'antd'
import axios from 'axios'
import Industry from '../components/Industry'
import SimpleVolTable from '../components/SimpleVolTable'
import StockLHB from '../components/StockLHB'

const Home = () => {
  const [industry, setIndustry] = useState()
  const [realTimeVol, setRealTimeVol] = useState([])
  const [lhbData, setLhbData] = useState([])

  useEffect(() => {
    axios
      .get('/api/cn/analysis/realtime/industry')
      .then((res) => setIndustry(res.data))

    axios.get('/api/cn/analysis/vol/up').then((res) => setRealTimeVol(res.data))
    axios.get('/api/cn/analysis/lhb').then((res) => setLhbData(res.data))
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <Card>
            <Card.Grid className="w-1/4">Content</Card.Grid>
            <Card.Grid className="w-1/4">Content</Card.Grid>
            <Card.Grid className="w-1/4">Content</Card.Grid>
          </Card>
        </Col>
      </Row>
      <Row className="my-4" gutter={4}>
        <Col span={8}>
          <Card title={'实时量比'} bodyStyle={{ padding: 8 }}>
            <SimpleVolTable data={realTimeVol} />
          </Card>
        </Col>
        <Col span={16}>
          <Card title={'板块排名'} bodyStyle={{ padding: 8 }}>
            <Industry data={industry} size={'small'} showPage />
          </Card>
        </Col>
      </Row>
      <Row className="my-4" gutter={4}>
        <Col span={24}>
          <StockLHB data={lhbData} />
        </Col>
      </Row>
    </>
  )
}

export default Home
