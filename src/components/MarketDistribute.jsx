import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Statistic, Row, Col, Modal } from 'antd'
import { getText } from '../helper/MarketValueTextHelper'
import SimpleStockInfoTable from './SimpleStockInfoTable'

const MarketDistribute = () => {
  const [marketDistribution, setMarketDistribution] = useState({})

  const [modal, setModal] = useState(false)
  const [marketDistributionDetail, setMarketDistributionDetail] = useState([])

  useEffect(() => {
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
    setDetail([])
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
        title={'数据'}
        width={'70%'}
      >
        <SimpleStockInfoTable data={marketDistributionDetail} />
      </Modal>
    </>
  )
}

export default MarketDistribute
