import React from 'react'
import { Table } from 'antd'

const stockInfoColumns = [
  {
    title: '代码',
    dataIndex: 'symbol',
    width: 100,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '市值',
    dataIndex: 'marketValue',
    width: 100,
    render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
  },
  {
    title: '主营业务',
    dataIndex: 'description',
  },
]

const SimpleStockInfoTable = (props) => {
  return (
    <Table
      rowKey={'symbol'}
      dataSource={props.data}
      size="small"
      columns={stockInfoColumns}
      pagination={{ pageSize: 15 }}
    />
  )
}

export default SimpleStockInfoTable
