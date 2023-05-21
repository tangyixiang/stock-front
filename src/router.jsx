import { createHashRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Stock from './pages/Stock'
import Company from './pages/Company'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/volup', element: <VolUp /> },
      { path: '/stock', element: <Stock /> },
      { path: '/symbol/list', element: <Company /> },
    ],
  },
])

export default router
