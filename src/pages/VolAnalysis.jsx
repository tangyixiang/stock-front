import React, { useState, useEffect } from 'react'
import {
  Space,
  DatePicker,
  Typography,
  Divider,
  Select,
  Spin,
  Button,
  message,
  Row,
  Col,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import StockCard from '../components/StockCard'
import AFloatButton from '../components/AFloatButton'

const VolAnalysis = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const [volData, setVolData] = useState([])
  // 上涨
  const [volType, setvolType] = useState(2)
  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false) // 初始状态为 -1，表示没有 Button 被激活

  useEffect(() => {
    if (!loading) return
    getData()
  }, [date, volType])

  const getData = () => {
    axios
      .get('/api/cn/analysis/vol', {
        params: {
          date: date,
          vol_type: volType,
        },
      })
      .then((res) => {
        setLoading(false)
        setVolData(res.data)
      })
      .catch((e) => {
        setLoading(false)
        message.error('异常')
      })
  }

  const selectDate = (date, dateString) => {
    setDate(dateString)
  }

  const options = [
    {
      value: '2',
      label: '量升价涨',
    },
    {
      value: '1',
      label: '恐慌抛售',
    },
  ]
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Space size={'large'}>
          <Typography.Text>日期:</Typography.Text>
          <DatePicker
            onChange={selectDate}
            defaultValue={dayjs(today, 'YYYY-MM-DD')}
            format={'YYYY-MM-DD'}
          />
          <Typography.Text>类型:</Typography.Text>
          <Select
            className="w-40"
            options={options}
            defaultValue={'2'}
            onChange={(value) => setvolType(value)}
          ></Select>
          <Button
            type="primary"
            onClick={() => {
              setLoading(true)
              getData()
            }}
          >
            查询
          </Button>
        </Space>
        <Divider />
        <Row gutter={[16, 16]}>
          {loading && <Spin />}
          {volData.map((item) => (
            <Col xs={24} sm={12} xxl={8}>
              <StockCard data={item} />
            </Col>
          ))}
        </Row>
      </Space>
      <AFloatButton watch={date} />
    </>
  )
}

export default VolAnalysis
