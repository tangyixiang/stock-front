import React, { useState, useEffect } from 'react'
import { Row, Col, Card, List, Table } from 'antd'
import axios from 'axios'
import Industry from '../components/Industry'

const Home = () => {
  const [industry, setIndustry] = useState()

  useEffect(() => {
    axios
      .get('/api/cn/analysis/realtime/industry')
      .then((res) => setIndustry(res.data))
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
      <Row className="my-4">
        <Col span={24}>
          <Card title={'板块排名'} bodyStyle={{ padding: 2 }}>
            <Industry data={industry} size={'small'} showPage />
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  )
}

export default Home
