import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router'

function createItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = [
  createItem('公司列表', '/symbol/list'),
  createItem('量价分析', '/volup'),
]

function AMenu() {
  const navigate = useNavigate()
  return (
    <Menu
      className="py-4"
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['4']}
      items={items}
      onClick={({ key }) => navigate(key)}
    />
  )
}

export default AMenu
