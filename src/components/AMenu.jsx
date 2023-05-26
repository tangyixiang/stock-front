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
  createItem('首页', '/home'),
  createItem('公司列表', '/symbol/list'),
  createItem('量价分析', '/volup'),
]

const AMenu = () => {
  const navigate = useNavigate()
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={items}
      onClick={({ key }) => navigate(key)}
    />
  )
}

export default AMenu
