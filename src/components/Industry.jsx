import React, { useState } from 'react'
import { Table, Tag, Modal } from 'antd'
import axios from 'axios'
import IndustryDetail from './IndustryDetail'

const industryColumns = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: '行业代码',
    dataIndex: 'industryCode',
    key: 'industryCode',
  },
  {
    title: '行业名称',
    dataIndex: 'industryName',
    key: 'industryName',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '涨跌幅',
    dataIndex: 'diffPer',
    key: 'diffPer',
    render: (text) =>
      text > 0 ? (
        <Tag color="#EF4444" className="text-sm">
          {text + '%'}
        </Tag>
      ) : (
        <Tag color="#10B981" className="text-sm">
          {text + '%'}
        </Tag>
      ),
  },
  {
    title: '市值',
    dataIndex: 'marketValue',
    key: 'marketValue',
    render: (text) => (text / 10000 / 10000).toFixed(2) + ' 亿',
  },
  {
    title: '换手率',
    dataIndex: 'exchangeRate',
    key: 'exchangeRate',
    render: (text) => text + '%',
  },
  {
    title: '上涨数',
    dataIndex: 'upNum',
    key: 'upNum',
  },
  {
    title: '下跌数',
    dataIndex: 'downNum',
    key: 'downNum',
  },
  {
    title: '领涨股',
    dataIndex: 'leaderName',
    key: 'leaderName',
  },
  {
    title: '领涨股比例',
    dataIndex: 'leaderPer',
    key: 'leaderPer',
  },
]

const Industry = (props) => {
  const [detail, setDetail] = useState([])
  const [modal, setModal] = useState(false)

  const getDetail = (name) => {
    axios
      .get('/api/cn/analysis/industry/detail', {
        params: {
          name: name,
        },
      })
      .then((res) => setDetail(res.data))
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setDetail([])
  }

  return (
    <>
      <Table
        columns={industryColumns}
        dataSource={props.data}
        size={props.size}
        rowKey={'industryCode'}
        onRow={(record) => {
          return {
            onClick: (event) => {
              getDetail(record.industryName)
            }, // 点击行
          }
        }}
      />
      <Modal
        open={modal}
        centered
        onCancel={() => closeModal()}
        footer={null}
        title={'数据'}
        width={'70%'}
      >
        <IndustryDetail data={detail} />
      </Modal>
    </>
  )
}

export default Industry
