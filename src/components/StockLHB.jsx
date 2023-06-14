import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import axios from 'axios'

function StockLHB(props) {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   axios
  //     .get('/api/stocklhb')
  //     .then((response) => {
  //       setData(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

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
      title: '解读',
      dataIndex: 'interpretation',
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
    },
    {
      title: '买入额',
      dataIndex: 'buyingAmount',
    },
    {
      title: '卖出额',
      dataIndex: 'sellingAmount',
    },
    {
      title: '成交额',
      dataIndex: 'turnover',
    },
    {
      title: '市场总成交额',
      dataIndex: 'totalMarketTurnover',
    },
    {
      title: '净买额占总成交比',
      dataIndex: 'netBuyingRatio',
    },
    {
      title: '成交额占总成交比',
      dataIndex: 'turnoverRatio',
    },
    {
      title: '换手率',
      dataIndex: 'turnoverRate',
    },
    {
      title: '流通市值',
      dataIndex: 'circulatingMarketValue',
    },
    {
      title: '上榜原因',
      dataIndex: 'reason',
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
    <Table
      scroll={{
        x: 2000,
      }}
      dataSource={props.data}
      columns={columns}
    />
  )
}

export default StockLHB
