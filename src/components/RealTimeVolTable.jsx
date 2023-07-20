import React, { useState, useEffect } from 'react'
import { Table, Button, Divider } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Wrapper from './Wrapper'

const columns = [
  {
    title: '代码',
    dataIndex: 'symbol',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '最新价',
    dataIndex: 'price',
  },
  {
    title: '涨跌幅',
    dataIndex: 'diffPer',
    sorter: (a, b) => a.diffPer - b.diffPer,
  },
  {
    title: '量比',
    dataIndex: 'riseRatio',
    sorter: (a, b) => a.riseRatio - b.riseRatio,
  },
  {
    title: '总市值',
    dataIndex: 'marketValue',
    render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    sorter: (a, b) => a.marketValue - b.marketValue,
  },
  {
    title: '成交金额',
    dataIndex: 'tradeQuote',
    render: (text) => (text / 10000).toFixed(2) + '万',
    sorter: (a, b) => a.tradeQuote - b.tradeQuote,
  },
]

const RealTimeVolTable = () => {
  const navigate = useNavigate()
  const [realTimeVol, setRealTimeVol] = useState([])

  useEffect(() => {
    axios.get('/api/realtime/cn/vol/up').then((res) => setRealTimeVol(res.data))
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get('/api/realtime/cn/vol/up')
        .then((res) => setRealTimeVol(res.data))
    }, 4000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const linkToDetail = () => {
    const symbolStr = realTimeVol.map((obj) => obj.symbol).join(',')
    navigate(`/symbol/analysis?symbolStr=${symbolStr}`)
  }

  return (
    <Wrapper>
      <Button onClick={linkToDetail}>明细</Button>
      <Divider />
      <Table
        rowKey={'symbol'}
        columns={columns}
        dataSource={realTimeVol}
        pagination={{ showQuickJumper: true }}
      ></Table>
    </Wrapper>
  )
}

export default RealTimeVolTable
