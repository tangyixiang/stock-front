import React from 'react'
import { Table } from 'antd'
import CharWrapper from './stockchar/CharWrapper'
import useModalStore from '../store/ModalStore'

const stockInfoColumns = [
  {
    title: '代码',
    dataIndex: 'symbol',
    width: 100,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 250,
  },
  {
    title: '市值',
    dataIndex: 'marketValue',
    width: 100,
    render: (text) => (text / 10000 / 10000).toFixed(2) + '亿',
  },
  {
    title: '主营业务',
    dataIndex: 'description',
  },
]

const SimpleStockInfoTable = (props) => {
  const openModal = useModalStore((state) => state.openModal)
  return (
    <>
      <CharWrapper>
        <Table
          rowKey={'symbol'}
          dataSource={props.data}
          onRow={(record) => {
            return {
              onClick: (event) => {
                openModal(record.symbol)
              },
            }
          }}
          size="small"
          columns={stockInfoColumns}
          pagination={{ pageSize: 15 }}
        />
      </CharWrapper>
    </>
  )
}

export default SimpleStockInfoTable
