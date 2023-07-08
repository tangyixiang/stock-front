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
  Modal,
  Table,
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import StockData from '../components/StockData'
import AFloatButton from '../components/layout/AFloatButton'
import Wrapper from '../components/Wrapper'

const columns = [
  {
    title: '代码',
    dataIndex: 'symbol',
    width: 100,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '市值',
    dataIndex: 'marketValue',
    width: 100,
    render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
  },
  {
    title: '次数',
    dataIndex: 'count',
    width: 100,
  },
  {
    title: '信息',
    dataIndex: 'detail',
    ellipsis: true,
    render: (detail) => (
      <span>
        {detail
          .map((item) => {
            const temp = `金额:${item.message.split(',')[1]},数量:${
              item.message.split(',')[0] / 100
            }手`
            return temp
          })
          .join('\n')}
      </span>
    ),
  },
]

const PankouChange = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const [data, setData] = useState([])
  const [pageInfo, setPageInfo] = useState({ pageSize: 20, pageNo: 1 })
  const [total, setTotal] = useState(0)
  const [modal, setModal] = useState(false)
  const [date, setDate] = useState(today)
  const [rankData, setRankData] = useState()
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [pageInfo])

  useEffect(() => {
    axios
      .get('/api/cn/analysis/pankou/change/counts', {
        params: { date: date },
      })
      .then((res) => setRankData(res.data))
  }, [date])

  const getData = () => {
    setLoading(true)
    axios
      .get('/api/cn/analysis/pankou/change', {
        params: {
          date: date,
          pageSize: pageInfo.pageSize,
          pageNo: pageInfo.pageNo,
        },
      })
      .then((res) => {
        setLoading(false)
        setData(res.data.list)
        setTotal(res.data.total)
      })
      .catch((e) => {
        setLoading(false)
        message.error('异常')
      })
  }

  const getInfo = (detail) => {
    const message = detail
      .map((item) => {
        const temp = `金额:${item.message.split(',')[1]},数量:${
          item.message.split(',')[0] / 100
        }手`
        return temp
      })
      .join('\n')
    setInfo(message)
  }

  const selectDate = (date, dateString) => {
    setDate(dateString)
  }

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
          <Typography.Text>总数:</Typography.Text>
          <Typography.Text>{total}</Typography.Text>
          <Button
            type="primary"
            onClick={() => setPageInfo({ ...pageInfo, pageNo: 1 })}
          >
            查询
          </Button>
          <Button type="primary" onClick={() => setModal(true)}>
            显示排行
          </Button>
        </Space>
        <Divider />
        <Row gutter={[16, 16]}>
          {loading && <Spin />}
          {data.map((item) => (
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
                    <Typography.Text>次数:{item.count}</Typography.Text>
                    <Popover content={info} trigger="click">
                      <Button onClick={() => getInfo(item.detail)}>详情</Button>
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
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        width={'60%'}
      >
        <Table columns={columns} dataSource={rankData} rowKey={'symbol'} />
      </Modal>
    </Wrapper>
  )
}

export default PankouChange
