import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { InputNumber, Button, Row, Col, Card, Input, Form, Divider } from 'antd'
import axios from 'axios'
import StockData from '../../components/StockData'

function SymbolDailyPractice() {
  const [tempData, setTempData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [dailyData, setDailyData] = useState([])

  const getDayData = (values) => {
    axios
      .get(`/api/us/symbol/history/data`, {
        params: { symbol: values.symbol, period: 3000 },
      })
      .then((res) => {
        setDailyData(res.data)
        setStartIndex(values.index)
        setTempData(res.data.slice(0, values.index))
      })
  }

  function handleKeyDown(event) {
    if (event.keyCode === 37) {
      // 左箭头键
      if (startIndex > 0) {
        const tempIndex = startIndex - 1
        setStartIndex(tempIndex)
        setTempData(dailyData.slice(0, tempIndex))
      }
    } else if (event.keyCode === 39) {
      // 右箭头键
      const tempIndex = startIndex + 1
      if (tempIndex <= dailyData.length) {
        setStartIndex(tempIndex)
        setTempData(dailyData.slice(0, tempIndex))
      }
    }
  }
  return (
    <Wrapper nobg>
      <Form onFinish={getDayData} layout="inline">
        <Form.Item name="symbol" label="代码:">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="index" label="开始序号:">
          <InputNumber
            autoComplete="off"
            style={{
              width: 180,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询历史数据
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      {tempData.length > 0 && (
        <Row gutter={12}>
          <Col span={24} onKeyDown={handleKeyDown}>
            <Card>
              <StockData data={tempData} highClass={'h-[550px]'} />
            </Card>
          </Col>
        </Row>
      )}
    </Wrapper>
  )
}

export default SymbolDailyPractice
