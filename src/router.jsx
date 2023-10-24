import { createHashRouter } from 'react-router-dom'
import App from './App'
import VolUp from './pages/VolUp'
import Company from './pages/Company'
import Home from './pages/Home'
import VolAnalysis from './pages/VolAnalysis'
import IndustryAnalysis from './pages/IndustryAnalysis'
import SymbolAnalysis from './pages/SymbolAnalysis'
import RealTimeVolTable from './components/RealTimeVolTable'
import PankouChange from './pages/PankouChange'
import USCompany from './pages/us/USCompany'
import USSymbolAnalysis from './pages/us/USSymbolAnalysis'
import USHome from './pages/us/USHome'
import USQQQ from './pages/us/USQQQ'

// 路由
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/ushome', element: <USHome /> },
      { path: '/symbol/list', element: <Company /> },
      { path: '/vol/analysis', element: <VolAnalysis /> },
      { path: '/industry/analysis', element: <IndustryAnalysis /> },
      { path: '/symbol/analysis', element: <SymbolAnalysis /> },
      { path: '/realtime/vol', element: <RealTimeVolTable /> },
      { path: '/pankou/change', element: <PankouChange /> },
      { path: '/us/symbol/list', element: <USCompany /> },
      { path: '/us/symbol/analysis', element: <USSymbolAnalysis /> },
      { path: '/us/analysis/qqq', element: <USQQQ /> },
    ],
  },
])

export default router
