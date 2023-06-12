import React from 'react'
import { Table, Tag } from 'antd'
import RedText from './RedText'
import GreenText from './DataRender/GreenText'

const industryColumns = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: '行业代码',
    dataIndex: 'industryCode',
    key: 'industryCode',
  },
  {
    title: '行业名称',
    dataIndex: 'industryName',
    key: 'industryName',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  // {
  //   title: '涨跌额',
  //   dataIndex: 'diffQuota',
  //   key: 'diffQuota',
  // },
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
    title: '市值',
    dataIndex: 'marketValue',
    key: 'marketValue',
    render: (text) => (text / 10000 / 10000).toFixed(2) + ' 亿',
  },
  {
    title: '换手率',
    dataIndex: 'exchangeRate',
    key: 'exchangeRate',
    render: (text) => text + '%',
  },
  {
    title: '上涨数',
    dataIndex: 'upNum',
    key: 'upNum',
  },
  {
    title: '下跌数',
    dataIndex: 'downNum',
    key: 'downNum',
  },
  {
    title: '领涨股',
    dataIndex: 'leaderName',
    key: 'leaderName',
  },
  {
    title: '领涨股比例',
    dataIndex: 'leaderPer',
    key: 'leaderPer',
  },
]

const Industry = (props) => {
  return (
    <Table
      columns={industryColumns}
      dataSource={props.data}
      size={props.size}
      rowKey={'industryCode'}
      pagination={{ pageSize: props.showPage ? 10 : props.data?.length }}
    />
  )
}

export default Industry
