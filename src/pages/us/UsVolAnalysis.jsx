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
  Popover,
  Card,
  Row,
  Col,
  Pagination,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import AFloatButton from '../../components/layout/AFloatButton'
import Wrapper from '../../components/Wrapper'
import StockData from '../../components/StockData'

const UsVolAnalysis = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const [volData, setVolData] = useState([])
  const [pageInfo, setPageInfo] = useState({ pageSize: 20, pageNo: 1 })
  const [total, setTotal] = useState(0)
  // 上涨
  const [volType, setvolType] = useState(2)
  const [date, setDate] = useState(today)
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false) // 初始状态为 -1，表示没有 Button 被激活

  useEffect(() => {
    getData()
  }, [pageInfo])

  const getData = () => {
    setLoading(true)
    axios
      .get('/api/us/analysis/vol', {
        params: {
          date: date,
          volType: volType,
          pageSize: pageInfo.pageSize,
          pageNo: pageInfo.pageNo,
        },
      })
      .then((res) => {
        setLoading(false)
        setVolData(res.data.list)
        setTotal(res.data.total)
      })
      .catch((e) => {
        setLoading(false)
        message.error('异常')
      })
  }

  const getInfo = (symbol) => {
    axios
      .get('/api/cn/symbol/info', { params: { symbol: symbol } })
      .then((res) => {
        const data = res.data
        setInfo(data.description)
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
    <Wrapper>
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
            onChange={(value) => {
              setvolType(value)
            }}
          ></Select>
          <Typography.Text>总数:</Typography.Text>
          <Typography.Text>{total}</Typography.Text>
          <Button
            type="primary"
            onClick={() => setPageInfo({ ...pageInfo, pageNo: 1 })}
          >
            查询
          </Button>
        </Space>
        <Divider />
        <Row gutter={[16, 16]}>
          {loading && <Spin />}
          {volData.map((item) => (
            <Col xs={24} sm={12} xxl={8} key={item.symbol}>
              <Card
                title={`${item.symbol}-${item.name}-${(
                  item.marketValue /
                  10000 /
                  10000
                ).toFixed(2)}亿`}
                type="inner"
                style={{
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                }}
                extra={
                  <Space>
                    <Typography.Text>
                      量比:{item.tradeVolPct * 100}%
                    </Typography.Text>
                    <Popover content={info} trigger="click">
                      <Button onClick={() => getInfo(item.symbol)}>信息</Button>
                    </Popover>
                  </Space>
                }
              >
                <StockData data={item.data} />
              </Card>
            </Col>
          ))}
        </Row>
        {total > 0 && (
          <>
            <Divider />
            <div className="text-center">
              <Pagination
                defaultCurrent={1}
                pageSize={pageInfo.pageSize}
                total={total}
                showSizeChanger={false}
                onChange={(page) => {
                  setPageInfo({ ...pageInfo, pageNo: page })
                }}
              />
            </div>
          </>
        )}
      </Space>
      <AFloatButton watch={date} />
    </Wrapper>
  )
}

export default UsVolAnalysis
