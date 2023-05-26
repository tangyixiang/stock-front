import React, { useState } from 'react'
import {
  Space,
  DatePicker,
  Typography,
  Button,
  message,
  Col,
  Row,
  Divider,
  Select,
  Spin,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import StockCard from '../components/StockCard'
import AFloatButton from '../components/AFloatButton'

const VolUp = () => {
  const today = dayjs().format('YYYY-MM-DD')

  const [category, setCategory] = useState([])
  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false) // 初始状态为 -1，表示没有 Button 被激活
  const [stockData, setStockData] = useState()
  const [industry, setIndustry] = useState()

  const selectDate = (date, dateString) => {
    setDate(dateString)
  }

  const getCategory = () => {
    axios
      .get('/api/cn/vol/category', {
        params: {
          date: date,
        },
      })
      .then((res) => {
        const category = res.data.map((item) => {
          return { label: item, value: item }
        })
        setCategory(category)
      })
      .catch((error) => message.error('网络错误'))
  }

  const getData = (item) => {
    setLoading(true)
    setIndustry(item)
    axios
      .get('/api/cn/vol/up', {
        params: {
          date: date,
          industry: item,
        },
      })
      .then((res) => {
        setStockData(res.data)
        setLoading(false)
      })
  }

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
          <Typography.Text>行业:</Typography.Text>
          <Select
            className="w-40"
            options={category}
            onChange={getData}
          ></Select>
          <Button type="primary" onClick={getCategory}>
            查询
          </Button>
        </Space>
        <Divider />
        <Row gutter={[16, 16]}>
          {loading && <Spin />}
          {stockData &&
            stockData.list.map((symbolData) => (
              <Col xs={24} sm={12} xxl={8} key={symbolData.symbol}>
                <StockCard data={symbolData} />
              </Col>
            ))}
        </Row>
      </Space>
      <AFloatButton watch={industry} />
    </>
  )
}

export default VolUp
