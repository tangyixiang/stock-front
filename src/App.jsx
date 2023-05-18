import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router'
import AMenu from './components/AMenu'
const { Header, Content, Sider } = Layout

const App = () => {
  return (
    <Layout>
      <Sider className="min-h-screen" breakpoint="lg" collapsedWidth="0">
        <AMenu />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white" />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div className="bg-white p-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
