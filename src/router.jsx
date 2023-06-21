import { createHashRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Company from './pages/Company'
import Home from './pages/Home'
import VolAnalysis from './pages/VolAnalysis'
import IndustryAnalysis from './pages/IndustryAnalysis'
import SymbolAnalysis from './pages/SymbolAnalysis'
import RealTimeVolTable from './components/RealTimeVolTable'

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
      { path: '/industry/analysis', element: <IndustryAnalysis /> },
      { path: '/symbol/analysis', element: <SymbolAnalysis /> },
      { path: '/realtime/vol', element: <RealTimeVolTable /> },
    ],
  },
])

export default router
