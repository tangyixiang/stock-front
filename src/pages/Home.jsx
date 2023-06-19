import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  Statistic,
  Modal,
  Typography,
  Segmented,
  Space,
} from 'antd'
import axios from 'axios'
import Industry from '../components/Industry'
import SimpleVolTable from '../components/SimpleVolTable'
import StockLHB from '../components/StockLHB'
import { getText } from '../helper/MarketValueTextHelper'
import SimpleStockInfoTable from '../components/SimpleStockInfoTable'
import HorizontalBarChart from '../components/HorizontalBarChart'
import Wrapper from '../components/Wrapper'
import GainsTable from '../components/GainsTable'

const Home = () => {
  const [industry, setIndustry] = useState()
  const [upState, setUpState] = useState('up')
  const [realTimeVol, setRealTimeVol] = useState([])
  const [upAndDownCount, setUpAndDownCount] = useState({})
  const [lhbData, setLhbData] = useState([])
  const [gainsData, setGainsData] = useState([])
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
    giansList('/api/cn/analysis/gains/increase/list', 'd', 5)
  }, [])

  const giansList = (url, type, period) => {
    axios
      .get(url, {
        params: {
          type: type,
          period: period,
        },
      })
      .then((res) => setGainsData(res.data))
  }

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

  const gainCalculate = (v) => {
    let type = 'd'
    let period = 5
    let url
    if (v == '5日') {
      period = 5
    }
    if (v == '10日') {
      period = 10
    }
    if (v == '30日') {
      period = 30
    }
    if (v == '3个月') {
      period = 90
    }
    if (v == '6个月') {
      period = 180
    }
    if (v == '今年') {
      type = 'y'
      period = 1
    }
    if (upState == 'up') {
      url = '/api/cn/analysis/gains/increase/list'
    } else {
      url = '/api/cn/analysis/gains/decrease/list'
    }
    giansList(url, type, period)
  }

  //TODO watch 变量修改
  const changeUpState = (v) => {
    if (v == '涨') {
      setUpState('up')
    } else {
      setUpState('down')
    }
  }

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
      <Row className="my-4" gutter={8}>
        {realTimeVol.length > 0 && (
          <Col span={24}>
            <Card title={'实时量比'} bodyStyle={{ padding: 8 }}>
              <SimpleVolTable data={realTimeVol} />
            </Card>
          </Col>
        )}
      </Row>
      <Row className="my-4" gutter={8}>
        <Col span={12}>
          <Card
            title={'涨跌幅榜'}
            bodyStyle={{ padding: 8 }}
            extra={
              <Space direction={'horizontal'}>
                <Segmented
                  defaultValue="涨"
                  options={['涨', '跌']}
                  onChange={(v) => changeUpState(v)}
                />
                <Segmented
                  defaultValue="5日"
                  options={['5日', '10日', '30日', '3个月', '6个月', '今年']}
                  onChange={(v) => gainCalculate(v)}
                />
              </Space>
            }
          >
            <GainsTable data={gainsData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'今日板块'} bodyStyle={{ padding: 8 }}>
            <Industry data={industry} showPage />
          </Card>
        </Col>
      </Row>
      <Row className="my-4" gutter={4}>
        <Col span={24}>
          {lhbData.length > 0 && (
            <Card title={'龙虎榜'} bodyStyle={{ padding: 8 }}>
              <StockLHB data={lhbData} />
            </Card>
          )}
        </Col>
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
    </Wrapper>
  )
}

export default Home
