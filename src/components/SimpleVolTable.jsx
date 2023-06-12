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
]

const SimpleVolTable = (props) => {
  return <Table columns={columns} dataSource={props.data}></Table>
}

export default SimpleVolTable
