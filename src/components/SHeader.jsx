import React from 'react'
import { Header } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';

function SHeader() {
  return (
    <Header height={60} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MantineLogo size={28} />
      </div>
    </Header>
  )
}

export default SHeader