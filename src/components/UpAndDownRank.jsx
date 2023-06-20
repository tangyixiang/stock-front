import React, { useState, useEffect } from 'react'
import { Card, Segmented, Space } from 'antd'
import axios from 'axios'
import GainsTable from './GainsTable'

const UpAndDownRank = () => {
  const [conditionData, setConditionData] = useState({
    up: true,
    type: 'd',
    period: 5,
  })
  const [gainsData, setGainsData] = useState([])

  useEffect(() => {
    const { up, type, period } = conditionData
    const url = up
      ? '/api/cn/analysis/gains/increase/list'
      : '/api/cn/analysis/gains/decrease/list'
    giansList(url, type, period)
  }, [conditionData])

  //TODO watch 变量修改
  const changeUpState = (v) => {
    if (v == '涨') {
      setConditionData({ ...conditionData, up: true })
    } else {
      setConditionData({ ...conditionData, up: false })
    }
  }

  const giansList = (url, type, period) => {
    axios
      .get(url, {
        params: {
          type: type,
          period: period,
        },
      })
      .then((res) => setGainsData(res.data))
  }

  const gainCalculate = (v) => {
    let type = 'd'
    let period = 5
    if (v == '5日') {
      period = 5
    }
    if (v == '10日') {
      period = 10
    }
    if (v == '30日') {
      period = 30
    }
    if (v == '3个月') {
      period = 90
    }
    if (v == '6个月') {
      period = 180
    }
    if (v == '今年') {
      type = 'y'
      period = 1
    }
    setConditionData({ ...conditionData, type: type, period: period })
  }

  return (
    <Card
      title={'涨跌幅榜'}
      bodyStyle={{ padding: 8 }}
      extra={
        <Space direction={'horizontal'}>
          <Segmented
            defaultValue="涨"
            options={['涨', '跌']}
            onChange={(v) => changeUpState(v)}
          />
          <Segmented
            defaultValue="5日"
            options={['5日', '10日', '30日', '3个月', '6个月', '今年']}
            onChange={(v) => gainCalculate(v)}
          />
        </Space>
      }
    >
      <GainsTable data={gainsData} />
    </Card>
  )
}

export default UpAndDownRank
