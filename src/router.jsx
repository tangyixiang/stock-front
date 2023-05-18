import { createHashRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Stock from './pages/Stock'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/volup', element: <VolUp /> },
      { path: '/stock', element: <Stock /> },
    ],
  },
])

export default router
