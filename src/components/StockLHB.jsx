import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import CharWrapper from './stockchar/CharWrapper'
import useModalStore from '../store/ModalStore'

function StockLHB(props) {
  const openModal = useModalStore((state) => state.openModal)

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '代码',
      dataIndex: 'symbol',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '上榜原因',
      dataIndex: 'reason',
    },
    {
      title: '解读',
      dataIndex: 'interpretation',
    },
    {
      title: '流通市值',
      dataIndex: 'circulatingMarketValue',
      render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    },
    {
      title: '收盘',
      dataIndex: 'close',
    },
    {
      title: '涨跌幅',
      dataIndex: 'diffPer',
    },
    {
      title: '净买额',
      dataIndex: 'netBuyingAmount',
      render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    },
    {
      title: '买入额',
      dataIndex: 'buyingAmount',
      render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    },
    {
      title: '卖出额',
      dataIndex: 'sellingAmount',
      render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    },
    {
      title: '成交额',
      dataIndex: 'turnover',
      render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    },
    {
      title: '市场总成交额',
      dataIndex: 'totalMarketTurnover',
      render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
    },
    {
      title: '净买额占总成交比',
      dataIndex: 'netBuyingRatio',
      render: (text) => text.toFixed(2) + '%',
    },
    {
      title: '成交额占总成交比',
      dataIndex: 'turnoverRatio',
      render: (text) => text.toFixed(2) + '%',
    },
    {
      title: '换手率',
      dataIndex: 'turnoverRate',
      render: (text) => text.toFixed(2) + '%',
    },

    // {
    //   title: '上榜后1日',
    //   dataIndex: 'day1',
    // },
    // {
    //   title: '上榜后2日',
    //   dataIndex: 'day2',
    // },
    // {
    //   title: '上榜后5日',
    //   dataIndex: 'day5',
    // },
    // {
    //   title: '上榜后10日',
    //   dataIndex: 'day10',
    // },
  ]

  return (
    <>
      <CharWrapper>
        <Table
          rowKey={'symbol'}
          dataSource={props.data}
          scroll={{ x: 2000 }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                openModal(record.symbol)
              },
            }
          }}
          columns={columns}
          pagination={{ showQuickJumper: true }}
        />
      </CharWrapper>
    </>
  )
}

export default StockLHB
