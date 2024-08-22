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
  createItem('美国首页', '/ushome'),
  createItem('技术选股', '/symbol/choose'),
  createItem('中国', '/china', '', [
    createItem('公司列表', '/symbol/list'),
    createItem('公司分析', '/symbol/analysis'),
    createItem('量价分析', '/vol/analysis'),
    createItem('行业分析', '/industry/analysis'),
    createItem('盘口异动', '/pankou/change'),
    createItem('实时量比', '/realtime/vol'),
  ]),
  createItem('美国', '/us', '', [
    createItem('公司列表', '/us/symbol/list'),
    createItem('量价分析', '/us/vol/analysis'),
    createItem('QQQ日历', '/us/analysis/qqq'),
    createItem('QQQ开盘区间', '/us/analysis/qqq/period'),
    createItem('QQQ分析', '/us/analysis/data'),
  ]),
  createItem('模拟', '/practice', '', [
    // createItem('日内练习', '/practice/us'),
    createItem('日内练习', '/practice/us'),
    createItem('日内5分钟模拟', '/practice/us/five'),
    createItem('日K练习', '/practice/daily'),
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
