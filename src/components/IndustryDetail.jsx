import React from 'react'
import { Table, Tag } from 'antd'

const industryColumns = [
  {
    title: '代码',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '最新价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '涨跌幅',
    dataIndex: 'diffPer',
    key: 'diffPer',
    render: (text) =>
      text > 0 ? (
        <Tag color="#EF4444" className="text-sm">
          {text + '%'}
        </Tag>
      ) : (
        <Tag color="#10B981" className="text-sm">
          {text + '%'}
        </Tag>
      ),
  },
  {
    title: '涨跌额',
    dataIndex: 'diffQuota',
    key: 'diffQuota',
  },
  {
    title: '成交量',
    dataIndex: 'tradeVol',
    key: 'tradeVol',
  },
  {
    title: '成交额',
    dataIndex: 'tradeQuota',
    key: 'tradeQuota',
    render: (text) => (text / 10000 / 10000).toFixed(2) + ' 亿',
  },
  {
    title: '振幅',
    dataIndex: 'amplitude',
    key: 'amplitude',
  },
  {
    title: '最高',
    dataIndex: 'high',
    key: 'high',
  },
  {
    title: '最低',
    dataIndex: 'low',
    key: 'low',
  },
  {
    title: '今开',
    dataIndex: 'open',
    key: 'open',
  },
  {
    title: '昨收',
    dataIndex: 'yesterdayClose',
    key: 'yesterdayClose',
  },
  {
    title: '换手率',
    dataIndex: 'exchangeRate',
    key: 'exchangeRate',
  },
  {
    title: '市盈率-动态',
    dataIndex: 'pe',
    key: 'pe',
  },
  {
    title: '市净率',
    dataIndex: 'pb',
    key: 'pb',
  },
]

const IndustryDetail = (props) => {
  return (
    <Table
      rowKey={'symbol'}
      dataSource={props.data}
      columns={industryColumns}
      pagination={{ showQuickJumper: true }}
    />
  )
}

export default IndustryDetail
