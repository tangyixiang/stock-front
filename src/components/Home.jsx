import React from 'react'
import { AppShell } from '@mantine/core';
import SNavBar from './SNavBar';
import { Routes, Route } from "react-router-dom";
import LimitPool from '../pages/daylimit/LimitPool';
import MyFocus from '../pages/focus/MyFocus';

const routers = <Routes>
  <Route path="/focus" element={<MyFocus />} />
  <Route path="/daylimit" element={<LimitPool />} />

</Routes>


function Home() {
  return (
    <AppShell
      navbar={<SNavBar />}
    >
      <div style={{ margin: '16px' }}>
        {routers}
      </div>
    </AppShell>
  )
}

export default Home