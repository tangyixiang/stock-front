import React, { useState } from 'react'
import axios from 'axios'
import {
  Card,
  Row,
  Col,
  Tag,
  Space,
  Input,
  Button,
  Divider,
  Modal,
  Image,
  Form,
  message,
} from 'antd'
import Wrapper from '../../components/Wrapper'

const USQQQ = () => {
  const [data, setData] = useState([])
  const [param, setParam] = useState([])
  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState({})
  const [form] = Form.useForm()

  //   useEffect(() => {}, [])

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
        form.setFieldsValue(res.data)
      })
  }

  const onFinish = (value) => {
    axios
      .post('/api/us/analysis/qqq/update', value)
      .then((res) => message.success('成功'))
  }

  return (
    <Wrapper nobg>
      <Space direction="horizontal">
        <Input placeholder="月份" onChange={(e) => setParam(e.target.value)} />
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
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        width="90%"
      >
        <Row className="p-1">
          <Col span={18}>
            <Image src={detail.imagesUrl} preview={false} />
          </Col>
          <Col span={6} className="px-4">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="id"
                label="id"
                labelCol={{ span: 5 }}
                hidden={true}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="symbol"
                label="symbol"
                labelCol={{ span: 5 }}
                hidden={true}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item name="date" label="日期" labelCol={{ span: 5 }}>
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item name="openDesc" label="开盘" labelCol={{ span: 5 }}>
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="openRate"
                label="开盘百分比"
                labelCol={{ span: 5 }}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item name="period" label="区间" labelCol={{ span: 5 }}>
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item name="trend" label="趋势" labelCol={{ span: 5 }}>
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="sharpShock"
                label="震荡幅度"
                labelCol={{ span: 5 }}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="open5min"
                label="前五分钟"
                labelCol={{ span: 5 }}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="highTime"
                label="最高时间点"
                labelCol={{ span: 5 }}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="lowTime"
                label="最低时间点"
                labelCol={{ span: 5 }}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item name="description" label="描述" labelCol={{ span: 5 }}>
                <Input.TextArea autoComplete="off" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </Wrapper>
  )
}

export default USQQQ
