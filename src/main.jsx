import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { routers } from './config/Router'

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
  <HistoryRouter history={history}>
    <MantineProvider
      theme={{ fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif' }}
      withGlobalStyles withNormalizeCSS>
      {routers}
    </MantineProvider>
  </HistoryRouter>
)
