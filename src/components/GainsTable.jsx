import React, { useState, useEffect } from 'react'
import { Table, Tag, Card } from 'antd'
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
  const [showInfo, setshowInfo] = useState({
    symbol: '',
    open: false,
  })
  const [nextIndex, setNextIndex] = useState(0)

  const close = () => {
    setshowInfo({ ...showInfo, open: false })
  }

  const handleKeyDown = (event) => {
    setNextIndex((prevData) => {
      let tempIndex
      if (event.keyCode === 37) {
        tempIndex = prevData - 1
      } else if (event.keyCode === 39) {
        tempIndex = prevData + 1
      }
      console.log(tempIndex)
      console.log(props.data[tempIndex])

      setshowInfo({
        symbol: props.data[tempIndex].symbol,
        open: true,
      })
      return tempIndex
    })
  }

  return (
    <>
      <Table
        rowKey={'symbol'}
        dataSource={props.data}
        columns={columns}
        onRow={(record, index) => {
          return {
            onClick: (event) => {
              setNextIndex(index)
              setshowInfo({ symbol: record.symbol, open: true })
            },
          }
        }}
        pagination={{ showQuickJumper: true }}
      />
      {showInfo.symbol && (
        <Card onKeyDown={handleKeyDown}>
          <SymbolCard
            symbol={showInfo.symbol}
            open={showInfo.open}
            close={close}
          />
        </Card>
      )}
    </>
  )
}

export default GainsTable
