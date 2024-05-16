import { ProTable } from '@ant-design/pro-components'
import { Button, Drawer } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UpdateStockData from '../../components/UpdateStockData'

const USAnalysisTable = () => {
  const [open, setOpen] = useState(false)
  const [minuteData, setMinuteData] = useState()

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 100,
    },
    {
      title: '开盘',
      dataIndex: 'openDesc',
      width: 100,
    },
    {
      title: '区间',
      dataIndex: 'period',
      width: 100,
    },
    {
      title: '第一根',
      dataIndex: 'open5min',
      width: 100,
    },
    {
      title: '最高点',
      dataIndex: 'highTime',
      width: 100,
    },
    {
      title: '最低点',
      dataIndex: 'lowTime',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      hideInSearch: true,
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          onClick={() => {
            getMinuteData(record.date)
            setOpen(true)
          }}
        >
          查看
        </Button>,
      ],
    },
  ]

  const onClose = () => {
    setOpen(false)
    setMinuteData(undefined)
  }

  const getMinuteData = (date) => {
    debugger
    axios
      .get(`/api/practice/us/getMinuteData`, {
        params: { symbol: 'QQQ', date: date, interval: '5m' },
      })
      .then((res) => setMinuteData(res.data))
  }

  return (
    <>
      <ProTable
        rowKey="id"
        key="table"
        columns={columns}
        request={async (params) => {
          const res = await axios.get('/api/us/analysis/symbol', {
            params: { ...params, symbol: 'QQQ' },
          })

          const result = {
            data: res.data,
            row: res.data.length,
            success: true,
          }
          return result
        }}
        pagination={{ showQuickJumper: true }}
      />

      <Drawer
        title="Basic Drawer"
        placement={'left'}
        width={'50%'}
        closable={false}
        onClose={onClose}
        open={open}
        key={'left'}
      >
        {minuteData && (
          <UpdateStockData data={minuteData} highClass={'h-[550px]'} />
        )}
      </Drawer>
    </>
  )
}

export default USAnalysisTable
