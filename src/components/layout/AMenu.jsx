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
  createItem('中国', '/china', '', [
    createItem('公司列表', '/symbol/list'),
    createItem('公司分析', '/symbol/analysis'),
    createItem('量价分析', '/vol/analysis'),
    createItem('行业分析', '/industry/analysis'),
    createItem('盘口异动', '/pankou/change'),
    createItem('实时量比', '/realtime/vol'),
  ]),
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
