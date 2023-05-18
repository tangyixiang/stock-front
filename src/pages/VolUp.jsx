import React, { useState } from 'react'
import {
  Space,
  DatePicker,
  Button,
  Collapse,
  message,
  Col,
  Row,
  Divider,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import StockCard from '../components/StockCard'

const VolUp = () => {
  const today = dayjs().format('YYYY-MM-DD')

  const [category, setCategory] = useState([])
  const [date, setDate] = useState(today)
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

  const { Panel } = Collapse

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Space size={'large'}>
          <DatePicker
            onChange={selectDate}
            defaultValue={dayjs(today, 'YYYY-MM-DD')}
            format={'YYYY-MM-DD'}
          />
          <Button type="primary" onClick={getCategory}>
            查询
          </Button>
        </Space>
        <Collapse>
          <Panel header="行业" key="1">
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
          </Panel>
        </Collapse>
        <Divider />
        <Row gutter={[16, 16]}>
          {stockData &&
            stockData.list.map((symbolData) => (
              <Col xs={24} sm={12} xxl={8} key={symbolData.symbol}>
                <StockCard data={symbolData} />
              </Col>
            ))}
        </Row>
      </Space>
    </>
  )
}

export default VolUp
