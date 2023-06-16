import { Table } from 'antd'
import React from 'react'

const columns = [
  {
    title: '代码',
    dataIndex: 'symbol',
  },
  {
    title: '最新价',
    dataIndex: 'price',
  },
  {
    title: '涨跌幅',
    dataIndex: 'diffPer',
  },
  {
    title: '量比',
    dataIndex: 'riseRatio',
  },
  {
    title: '总市值',
    dataIndex: 'marketValue',
    render: (text) => (text / 10000 / 10000).toFixed(2) + '亿'
  },
  {
    title: '成交金额',
    dataIndex: 'tradeQuote',
    render: (text) => (text / 10000).toFixed(2) + '万'
  },
]

const SimpleVolTable = (props) => {
  return <Table rowKey={'symbol'} columns={columns} dataSource={props.data}></Table>
}

export default SimpleVolTable
