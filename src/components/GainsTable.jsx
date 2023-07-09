import React, { useState } from 'react'
import { Table, Tag } from 'antd'
import SymbolCard from './SymbolCard'

const columns = [
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
    title: '涨幅',
    dataIndex: 'diffPer',
    width: 100,
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
    title: '主营业务',
    dataIndex: 'description',
    ellipsis: true,
  },
]

const GainsTable = (props) => {
  const [showInfo, setshowInfo] = useState({ symbol: '', open: false })

  const close = () => {
    setshowInfo({ ...showInfo, open: false })
  }

  return (
    <>
      <Table
        rowKey={'symbol'}
        dataSource={props.data}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: (event) => {
              setshowInfo({ symbol: record.symbol, open: true })
            },
          }
        }}
        pagination={{ showQuickJumper: true }}
      />
      {showInfo.symbol && (
        <SymbolCard
          symbol={showInfo.symbol}
          open={showInfo.open}
          close={close}
        />
      )}
    </>
  )
}

export default GainsTable
