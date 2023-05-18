import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Stock from './pages/Stock'

const router = createBrowserRouter([
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
