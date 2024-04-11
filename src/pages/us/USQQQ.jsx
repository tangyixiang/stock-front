import React, { useState } from 'react'
import axios from 'axios'
import {
  Card,
  Row,
  Col,
  Tag,
  Space,
  Button,
  Divider,
  Modal,
  DatePicker,
} from 'antd'
import Wrapper from '../../components/Wrapper'
import UsMinutePractice from '../practice/UsMinutePractice'
import OneDayMinutePractice from '../practice/OneDayMinutePractice'

const USQQQ = () => {
  const [data, setData] = useState([])
  const [param, setParam] = useState([])
  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState({})

  const getData = () => {
    axios
      .get('/api/us/analysis/qqq/history', { params: { month: param } })
      .then((res) => {
        setData(res.data)
      })
  }

  const showDetail = (date) => {
    axios
      .get('/api/us/analysis/qqq/oneday', { params: { date: date } })
      .then((res) => {
        setModal(true)
        setDetail(res.data)
      })
  }

  return (
    <Wrapper nobg>
      <Space direction="horizontal">
        <DatePicker
          onChange={(date, dateString) => setParam(dateString.replace('-', ''))}
          picker="month"
        />
        <Button onClick={getData}>查询</Button>
      </Space>
      <Divider />
      <Row gutter={8}>
        {data.map((item) => (
          <Col className="mb-2" span={4} key={item.id}>
            <Card
              title={item.date}
              bordered={false}
              style={{ height: '300px' }}
              onClick={() => showDetail(item.date)}
              extra={
                <>
                  {item.period == '大区间' ? (
                    <Tag color="#108ee9">{item.period}</Tag>
                  ) : (
                    <div>{item.period}</div>
                  )}
                </>
              }
            >
              <Space direction="vertical">
                {item.diffPer > 0 ? (
                  <div className="text-red-600">涨幅：{item.diffPer}%</div>
                ) : (
                  <div className="text-green-600">涨幅：{item.diffPer}%</div>
                )}
                {item.openDesc == '高开' ? (
                  <Space direction="horizontal">
                    <Tag color="#FF0000">{item.openDesc}</Tag>
                    <div className="text-base">{item.openRate}%</div>
                  </Space>
                ) : (
                  <Space direction="horizontal">
                    <Tag color="#3CB371">{item.openDesc}</Tag>
                    <div className="text-base">{item.openRate}%</div>
                  </Space>
                )}
                {item.trend == '高走' ? (
                  <Tag color="#FF0000">{item.trend}</Tag>
                ) : (
                  <Tag color="#3CB371">{item.trend}</Tag>
                )}
                <Space direction="horizontal">
                  <div>{item.sharpShock}</div>
                  <div className="text-base">{item.amplitude}%</div>
                </Space>
                <div>{item.closeCompareOpen}</div>
                <div>{item.description}</div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={detail.date}
        destroyOnClose
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        width="90%"
      >
        <OneDayMinutePractice date={detail.date} />
      </Modal>
    </Wrapper>
  )
}

export default USQQQ
