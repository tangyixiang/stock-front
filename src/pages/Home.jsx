import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Modal, Typography } from 'antd'
import axios from 'axios'
import Industry from '../components/Industry'
import SimpleVolTable from '../components/SimpleVolTable'
import StockLHB from '../components/StockLHB'
import { getText } from '../helper/MarketValueTextHelper'
import SimpleStockInfoTable from '../components/SimpleStockInfoTable'
import HorizontalBarChart from '../components/HorizontalBarChart'

const Home = () => {
  const [industry, setIndustry] = useState()
  const [realTimeVol, setRealTimeVol] = useState([])
  const [upAndDownCount, setUpAndDownCount] = useState({})
  const [lhbData, setLhbData] = useState([])
  const [marketDistribution, setMarketDistribution] = useState({})
  const [marketDistributionDetail, setMarketDistributionDetail] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    axios
      .get('/api/cn/analysis/realtime/industry')
      .then((res) => setIndustry(res.data))
    axios
      .get('/api/cn/analysis/market/up/down')
      .then((res) => setUpAndDownCount(res.data))
    axios.get('/api/cn/analysis/vol/up').then((res) => setRealTimeVol(res.data))
    axios.get('/api/cn/analysis/lhb').then((res) => setLhbData(res.data))
    axios
      .get('/api/cn/analysis/market/value/distribution')
      .then((res) => setMarketDistribution(res.data))
  }, [])

  const showDistributeDetail = (key) => {
    setModal(true)
    axios
      .get('/api/cn/analysis/market/value/distribution/detail', {
        params: { type: key },
      })
      .then((res) => setMarketDistributionDetail(res.data))
  }

  const closeModal = () => {
    setModal(false)
    setMarketDistributionDetail([])
  }

  return (
    <>
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
      <Typography.Title level={5} className="px-2">
        市值范围
      </Typography.Title>
      <Row className="my-4" gutter={8}>
        {Object.keys(marketDistribution).map((k, v) => (
          <Col span={3} key={k}>
            <a onClick={() => showDistributeDetail(k)}>
              <Card hoverable>
                <Statistic
                  title={getText(k)}
                  value={marketDistribution[k]}
                  valueStyle={{
                    color: '#0f172a',
                  }}
                />
              </Card>
            </a>
          </Col>
        ))}
      </Row>
      <Row className="my-4" gutter={4}>
        {realTimeVol.length > 0 && (
          <Col span={12}>
            <Card title={'实时量比'} bodyStyle={{ padding: 8 }}>
              <SimpleVolTable data={realTimeVol} />
            </Card>
          </Col>
        )}

        <Col span={12}>
          <Card title={'板块排名'} bodyStyle={{ padding: 8 }}>
            <Industry data={industry} size={'small'} showPage />
          </Card>
        </Col>
      </Row>
      <Row className="my-4" gutter={4}>
        <Col span={24}>{lhbData.length > 0 && <StockLHB data={lhbData} />}</Col>
      </Row>
      <Modal
        open={modal}
        centered
        onCancel={() => closeModal()}
        footer={null}
        title={'数据'}
        width={'70%'}
      >
        <SimpleStockInfoTable data={marketDistributionDetail} />
      </Modal>
    </>
  )
}

export default Home
