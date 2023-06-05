import { createHashRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Company from './pages/Company'
import Home from './pages/Home'
import VolAnalysis from './pages/VolAnalysis'

// 路由
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/symbol/list', element: <Company /> },
      { path: '/vol/analysis', element: <VolAnalysis /> },
    ],
  },
])

export default router
