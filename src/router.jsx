import { createHashRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Company from './pages/Company'

// 路由
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/volup', element: <VolUp /> },
      { path: '/symbol/list', element: <Company /> },
    ],
  },
])

export default router
