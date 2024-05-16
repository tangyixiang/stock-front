import { createHashRouter } from 'react-router-dom'
import App from './App'
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
import UsPractice from './pages/practice/UsPractice'
import SymbolDailyPractice from './pages/practice/SymbolDailyPractice'
import UsVolAnalysis from './pages/us/UsVolAnalysis'
import Choose from './pages/Choose'
import USQQQPeriod from './pages/us/USQQQPeriod'
import UsMinutePractice from './pages/practice/UsMinutePractice'
import USAnalysisTable from './pages/us/USAnalysisTable'

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
      { path: '/symbol/choose', element: <Choose /> },
      { path: '/realtime/vol', element: <RealTimeVolTable /> },
      { path: '/pankou/change', element: <PankouChange /> },
      { path: '/us/symbol/list', element: <USCompany /> },
      { path: '/us/symbol/analysis', element: <USSymbolAnalysis /> },
      { path: '/us/vol/analysis', element: <UsVolAnalysis /> },
      { path: '/us/analysis/qqq', element: <USQQQ /> },
      { path: '/us/analysis/qqq/period', element: <USQQQPeriod /> },
      { path: '/practice/us/five', element: <UsPractice /> },
      { path: '/practice/us', element: <UsMinutePractice /> },
      { path: '/practice/daily', element: <SymbolDailyPractice /> },
      { path: '/us/analysis/data', element: <USAnalysisTable /> },
    ],
  },
])

export default router
