import { Routes, Route } from "react-router-dom";
import App from "../App";
import StockPool from "../pages/data/StockPool";
import LimitPool from '../pages/daylimit/LimitPool';
import MyFocus from '../pages/focus/MyFocus';

export const routers =
  <Routes>
    <Route path="/" element={<App />} >
      <Route path="focus" element={<MyFocus />} />
      <Route path="daylimit" element={<LimitPool />} />
      <Route path="datapool" element={<StockPool />} />
    </Route>
  </Routes>


export const links = [
  {
    label: '收藏', path: '/favourit', children: [
    ]
  },
  { label: '关注', path: '/focus', children: [] },
  { label: '涨停池', path: '/daylimit', children: [] },
  { label: '向上突破', path: '/breakup', children: [] },
  { label: '数据池', path: '/datapool', children: [] },
]
