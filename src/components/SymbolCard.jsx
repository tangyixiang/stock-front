import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Space, Typography, Button } from 'antd'
import StockData from './StockData'
import { getSymbolOfMarket } from '../helper/MarketHelper'

const { Title, Paragraph } = Typography

const SymbolCard = (props) => {
  const [info, setInfo] = useState({})
  const [title, setTitle] = useState('')
  const [data, setData] = useState()

  useEffect(() => {
    axios
      .get('/api/cn/symbol/info', { params: { symbol: props.symbol } })
      .then((res) => {
        const data = res.data
        setInfo(res.data)
        const title = `${data.symbol}-${data.name}-${
          (data.marketValue / 10000 / 10000).toFixed(2) + '亿'
        }`
        setTitle(title)
      })

    axios
      .get('/api/cn/symbol/history/data', {
        params: { symbol: props.symbol, period: 500 },
      })
      .then((res) => setData(res.data))
    return () => {
      setData(undefined)
      setInfo({})
      setTitle('')
    }
  }, [props])

  const openFutu = () => {
    const type = getSymbolOfMarket(info.symbol)
    const marketType = type == 'SH' ? 3 : 4
    const futuUrl = `ftnn://quote/${marketType}/${info.symbol}/`
    window.location.href = futuUrl
    // window.open('https://www.example.com', '_blank');
  }
  const openXueqiu = () => {
    const type = getSymbolOfMarket(info.symbol)
    const xueqiuUrl = `https://xueqiu.com/S/${type}${info.symbol}/`
    window.open(xueqiuUrl, '_blank')
  }

  return (
    <Modal
      title={title}
      open={props.open}
      footer={null}
      onCancel={() => props.close()}
      destroyOnClose={true}
      width={'70%'}
      centered
    >
      <Typography>
        <Title level={5}>主营业务</Title>
        <Paragraph>{info.description}</Paragraph>
      </Typography>
      <Space wrap>
        <Button onClick={openXueqiu}>雪球</Button>
        <Button onClick={openFutu}>富途</Button>
      </Space>
      {data && <StockData data={data} highClass={'h-[450px]'} />}
    </Modal>
  )
}

export default SymbolCard
