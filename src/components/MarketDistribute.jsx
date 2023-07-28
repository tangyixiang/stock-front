import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Statistic, Row, Col, Modal, Button } from 'antd'
import { getText } from '../helper/MarketValueTextHelper'
import SimpleStockInfoTable from './SimpleStockInfoTable'
import StockData from './StockData'

const MarketDistribute = (props) => {
  const [marketDistribution, setMarketDistribution] = useState({})

  const [modal, setModal] = useState(false)
  const [marketDistributionDetail, setMarketDistributionDetail] = useState([])
  const [marketChart, setMarketChart] = useState([])
  const [showMarketChart, setShowMarketChart] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/${props.type}/analysis/market/value/distribution`)
      .then((res) => setMarketDistribution(res.data))
  }, [])

  const showDistributeDetail = (key) => {
    setModal(true)
    axios
      .get(`/api/${props.type}/analysis/market/value/distribution/detail`, {
        params: { type: key },
      })
      .then((res) => setMarketDistributionDetail(res.data))
  }

  const getCharData = () => {
    setShowMarketChart(true)
    const symbolList = marketDistributionDetail.map((item) => item.symbol)
    axios
      .post(`/api/${props.type}/collection/symbol/data`, {
        symbolList: symbolList,
        period: 180,
      })
      .then((res) => {
        setMarketChart(res.data)
      })
  }

  const closeModal = () => {
    setModal(false)
    setShowMarketChart(false)
    setMarketDistributionDetail([])
    setMarketChart([])
  }

  return (
    <>
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
      <Modal
        open={modal}
        centered
        onCancel={() => closeModal()}
        footer={null}
        title={'详细信息'}
        width={'80%'}
      >
        <Button onClick={getCharData} type={'primary'} className="mb-2">
          切换为图形
        </Button>
        {!showMarketChart && (
          <SimpleStockInfoTable data={marketDistributionDetail} />
        )}
        {showMarketChart && (
          <Row gutter={[16, 16]}>
            {marketChart.map((item) => (
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
        )}
      </Modal>
    </>
  )
}

export default MarketDistribute
