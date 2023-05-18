import React, { useState } from 'react'
import {
  Space,
  DatePicker,
  Button,
  Card,
  message,
  Col,
  Row,
  Divider,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import StockData from '../components/StockData'
import StockCard from '../components/StockCard'

const VolUp = () => {
  const [category, setCategory] = useState([])
  const [date, setDate] = useState('2023-05-17')
  const [activeIndex, setActiveIndex] = useState(-1) // 初始状态为 -1，表示没有 Button 被激活
  const [stockData, setStockData] = useState()

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
      .then((res) => setCategory(res.data))
      .catch((error) => message.error('网络错误'))
  }

  const getData = (index, item) => {
    setActiveIndex(index)
    axios
      .get('/api/cn/vol/up', {
        params: {
          date: date,
          industry: item,
        },
      })
      .then((res) => {
        setStockData(res.data)
      })
  }

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Space size={'large'}>
          <DatePicker
            onChange={selectDate}
            defaultValue={dayjs('2023-05-17', 'YYYY-MM-DD')}
            format={'YYYY-MM-DD'}
          />
          <Button type="primary" onClick={getCategory}>
            查询
          </Button>
        </Space>
        <Row>
          {category.map((item, index) => (
            <Button
              className="m-1"
              value={item}
              key={index}
              type={activeIndex === index ? 'primary' : 'default'}
              onClick={() => getData(index, item)}
            >
              {item}
            </Button>
          ))}
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          {stockData &&
            stockData.list.map((symbolData) => (
              <Col span={8}>
                <StockCard key={symbolData.symbol} data={symbolData} />
              </Col>
            ))}
        </Row>
      </Space>
    </>
  )
}

export default VolUp
