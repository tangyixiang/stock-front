import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
)
