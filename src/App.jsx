import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router'
import AMenu from './components/AMenu'
const { Header, Content } = Layout

const App = () => {
  return (
    <Layout>
      <Layout>
        <Header>
          <AMenu />
        </Header>
        <Content className="my-6 mx-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
