import React, { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import Wrapper from '../../components/Wrapper'
import {
  DatePicker,
  Button,
  Space,
  Row,
  Divider,
  Col,
  Table,
  Spin,
  message,
  Card,
  Form,
  Select,
  Input,
} from 'antd'
import axios from 'axios'
import StockData from '../../components/StockData'
import UpdateStockData from '../../components/UpdateStockData'

const options = [
  {
    value: 'QQQ',
    label: 'QQQ',
  },
]

const UsMinutePractice = () => {
  const [practiceData, setPracticeData] = useImmer({
    date: undefined,
    symbol: undefined,
    nextTradeDate: undefined,
    currentDateBarData: [],
    nextDateBarData: undefined,
  })
  const [specifyDateData, setSpecifyDateData] = useState([])
  // 默认下标
  const [startIndex, setstartIndex] = useState(0)

  const finish = (formData) => {
    const data = { ...formData, date: formData['date'].format('YYYY-MM-DD') }
    setPracticeData((draft) => {
      draft.symbol = data.symbol
      draft.date = data.date
    })

    axios.get('/api/practice/us/trade/day', { params: data }).then((res) => {
      setPracticeData((draft) => {
        draft.nextTradeDate = res.data
      })
    })
    axios
      .get('/api/practice/us/getMinuteData', {
        params: { ...data, interval: '5m' },
      })
      .then((res) => {
        setPracticeData((draft) => {
          draft.currentDateBarData = res.data
        })
        // console.log(res.data)
        setSpecifyDateData(res.data)
      })
    axios
      .get('/api/practice/us/multi/minute/data', {
        params: data,
      })
      .then((res) => {
        setPracticeData((draft) => {
          draft.nextDateBarData = res.data
        })
      })
  }

  return (
    <Wrapper>
      <Form layout="inline" onFinish={finish}>
        <Form.Item label="代码:" name={'symbol'}>
          <Select
            style={{
              width: 120,
            }}
            options={options}
          />
        </Form.Item>
        <Form.Item label="日期:" name={'date'}>
          <DatePicker format={'YYYY-MM-DD'} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询历史数据
          </Button>
        </Form.Item>
        <Button type="primary" danger onClick={() => reset()}>
          重置
        </Button>
      </Form>
      {specifyDateData.length > 0 && (
        <Card>
          <UpdateStockData data={specifyDateData} highClass={'h-[550px]'} />
        </Card>
      )}

      {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex justify-center items-center">
        <Space>
          <Button type="primary">买入</Button>
          <Button>暂停</Button>
          <Button type="primary" danger>
            卖出
          </Button>
        </Space>
      </div> */}
    </Wrapper>
  )
}

export default UsMinutePractice
