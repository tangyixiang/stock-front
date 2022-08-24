import React, { useState, useLayoutEffect } from 'react'
import { Stock } from '@antv/g2plot'
import { HistoryPrice } from '../api/FinanceApi'
import moment from 'moment'
import { Text } from '@mantine/core'



function StockChart(props) {

  const { symbol } = props


  useLayoutEffect(() => {
    const start_date = moment().subtract(60, 'days').format('YYYYMMDD')
    const end_date = moment().format('YYYYMMDD')
    const param = { symbol, start_date, end_date }

    HistoryPrice(param).then(res => res.data).then(data => {
      console.log(data);
      const plot = new Stock('container', {
        data,
        xField: '日期',
        yField: ['开盘', '收盘', '最高', '最低', '涨跌幅'],
        // slider: {
        //   start: 0.755,
        //   end: 0.76,
        // },
      });
      plot.render();
    })
  }, [symbol])



  return (
    <>
      <Text>最近60日</Text>
      <div id="container" style={{ height: '400px' }}></div>
    </>
  )
}

export default StockChart