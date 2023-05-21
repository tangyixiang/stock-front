import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, List, Modal, Space } from 'antd'
import StockData from '../components/StockData'

const Company = () => {
  const [pageInfo, setPageInfo] = useState({ pageSize: 20, pageNo: 1 })
  const [data, setData] = useState()
  const [company, setCompany] = useState()
  const [tempData, setTempData] = useState()
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    axios
      .get('/api/cn/symbol/list', {
        params: pageInfo,
      })
      .then((res) => {
        setTotal(res.data.total)
        setData(res.data.list)
      })
  }, [pageInfo])

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

  return (
    <>
      <List
        pagination={{
          onChange: (page) => {
            setPageInfo({ ...pageInfo, pageNo: page })
          },
          pageSize: pageInfo.pageSize,
          total: total,
        }}
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
        {tempData && <StockData data={tempData} />}
      </Modal>
    </>
  )
}

export default Company
