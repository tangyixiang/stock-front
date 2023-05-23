import React from 'react'
import { Layout, Typography } from 'antd'
import { Outlet } from 'react-router'
import AMenu from './components/AMenu'
const { Header, Content, Sider } = Layout

const App = () => {
  return (
    <Layout>
      <Layout>
        <Header className="flex items-center">
          <AMenu />
        </Header>
        <Content className="my-6 mx-4">
          <div className="bg-white p-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
