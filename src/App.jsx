import React, { useState } from 'react'
import { AppShell, Container } from '@mantine/core';
import SNavBar from './components/SNavBar';
import SHeader from './components/SHeader';
import { Outlet } from 'react-router-dom';


function App(props) {

  return (
    <AppShell
      header={<SHeader />}
      navbar={<SNavBar />}
    >
      <Container size="xl" px="xs">
        <Outlet />
      </Container>
    </AppShell>
  )
}

export default App