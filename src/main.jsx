import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import 'antd/dist/antd.css'
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MantineProvider
      theme={{ fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif' }}
      withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </BrowserRouter>
)
