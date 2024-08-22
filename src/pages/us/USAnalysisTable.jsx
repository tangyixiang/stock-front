import { ProTable } from '@ant-design/pro-components'
import { Button, Col, Drawer, Modal, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UpdateStockData from '../../components/UpdateStockData'
import StockData from '../../components/StockData'
import StockDataAnalysis from '../../components/StockDataAnalysis'

const USAnalysisTable = () => {
  const [open, setOpen] = useState(false)
  const [minuteData, setMinuteData] = useState()
  const [openAll, setOpenAll] = useState(false)
  const [allDate, setAllDate] = useState([])
  const [allDateData, setAllDateData] = useState({})

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
      title: '趋势',
      dataIndex: 'trend',
      width: 100,
    },
    {
      title: '区间',
      dataIndex: 'period',
      width: 100,
    },
    {
      title: '涨跌幅',
      dataIndex: 'diffPer',
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

  const showChart = () => {
    setOpenAll(true)
    axios
      .post('/api/us/analysis/qqq/lotOfDay', { days: allDate })
      .then((res) => setAllDateData(res.data))
  }
  const closeChart = () => {
    setOpenAll(false)
    setAllDateData([])
  }
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
      .then((res) => {
        setMinuteData(res.data)
      })
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

          const allDate = res.data.map((item) => item.date)
          setAllDate(allDate)
          const result = {
            data: res.data,
            row: res.data.length,
            success: true,
          }
          return result
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="showAllDate"
            onClick={() => {
              showChart()
            }}
          >
            显示全部图表
          </Button>,
        ]}
        pagination={{ defaultPageSize: 10, showQuickJumper: true }}
      />

      <Drawer
        title="图表"
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

      <Modal
        title="全局概览"
        open={openAll}
        width={'100%'}
        onCancel={() => {
          closeChart()
        }}
        footer={null}
      >
        {allDate.length > 0 && (
          <Row gutter={[16, 16]}>
            {Object.keys(allDateData).map((date) => (
              <Col span={8}>
                {date}
                <StockDataAnalysis
                  data={allDateData[date]}
                  highClass={'h-[300px]'}
                />
              </Col>
            ))}
          </Row>
        )}
      </Modal>
    </>
  )
}

export default USAnalysisTable
