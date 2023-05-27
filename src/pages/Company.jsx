import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  List,
  Modal,
  Form,
  Input,
  InputNumber,
  Typography,
} from 'antd'
import StockData from '../components/StockData'
import AFloatButton from '../components/AFloatButton'

const Company = () => {
  const [pageInfo, setPageInfo] = useState({ pageSize: 20, pageNo: 1 })
  const [data, setData] = useState()
  const [company, setCompany] = useState()
  const [tempData, setTempData] = useState()
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValue, setFormValue] = useState({})
  const [form] = Form.useForm()

  useEffect(() => {
    axios
      .post('/api/cn/symbol/list', { ...pageInfo, ...formValue })
      .then((res) => {
        setTotal(res.data.total)
        setData(res.data.list)
      })
  }, [pageInfo, formValue])

  const showModal = (company) => {
    setCompany(company)
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setTempData(undefined)
  }

  const companyHistory = (symbol) => {
    axios
      .get('/api/cn/symbol/history/data', { params: { symbol: symbol } })
      .then((res) => setTempData(res.data))
  }

  const onFinish = (values) => {
    setFormValue(values)
  }

  return (
    <>
      <Form form={form} layout={'inline'} onFinish={onFinish}>
        <Form.Item label="代码" name="symbol">
          <Input className="w-[96px]" allowClear />
        </Form.Item>
        <Form.Item label="市值范围" name="min">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="至" name="max">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <List
        pagination={{
          onChange: (page) => {
            setPageInfo({ ...pageInfo, pageNo: page })
          },
          pageSize: pageInfo.pageSize,
          total: total,
        }}
        header={<Typography.Title level={5}>数量:{total}</Typography.Title>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              className="w-full"
              title={`${item.symbol}-${item.name}-${(
                item.market_value /
                10000 /
                10000
              ).toFixed(2)}亿`}
              extra={<Button onClick={() => showModal(item)}>信息</Button>}
            >
              {item.description}
            </Card>
          </List.Item>
        )}
      ></List>
      <Modal
        title="信息"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={'60%'}
        afterOpenChange={(open) => {
          if (open) {
            companyHistory(company.symbol)
          }
        }}
      >
        {tempData && <StockData data={tempData} highClass={'h-[600px]'} />}
      </Modal>
      <AFloatButton watch={pageInfo} />
    </>
  )
}

export default Company
