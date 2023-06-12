import React, { useState, useEffect } from 'react'
import { Space, Typography, DatePicker, Button, Divider } from 'antd'
import dayjs from 'dayjs'
import axios from 'axios'
import Industry from '../components/Industry'

const IndustryAnalysis = () => {
  const today = dayjs().format('YYYYMMDD')
  const [date, setDate] = useState(today)
  const [industry, setIndustry] = useState()

  const selectDate = (date, dateString) => {
    setDate(dateString)
  }

  useEffect(() => {
    getIndustryData(date)
  }, [])

  const getIndustryData = (date) => {
    axios
      .get('/api/cn/analysis/history/industry', { params: { date: date } })
      .then((res) => setIndustry(res.data))
  }

  return (
    <Space direction={'vertical'} size="middle" style={{ display: 'flex' }}>
      <Space>
        <Typography.Text>日期:</Typography.Text>
        <DatePicker
          onChange={selectDate}
          defaultValue={dayjs(today, 'YYYYMMDD')}
          format={'YYYYMMDD'}
        />
        <Button type="primary" onClick={() => getIndustryData(date)}>
          查询
        </Button>
      </Space>
      <Divider />
      <Industry data={industry} />
    </Space>
  )
}

export default IndustryAnalysis
