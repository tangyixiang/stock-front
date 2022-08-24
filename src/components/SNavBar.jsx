import React from 'react'
import { Navbar, Group, NavLink, ScrollArea, Code, Divider } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useState } from 'react';

import SLink from './SLink';

const data = [
  {
    label: '收藏', path: '/favourit', children: [
      // { label: 'Favourit22', path: '/favourit22' }
    ]
  },
  { label: '关注', path: '/focus', children: [] },
  { label: '涨停池', path: '/daylimit', children: [] },
  { label: '向上突破', path: '/breakup', children: [] },
]

function SNavBar() {

  return (
    <Navbar width={{ base: 300 }} height={'100vh'} p="xs">
      <Navbar.Section >
        <Group position="apart">
          <MantineLogo size={28} />
          <Code sx={{ fontWeight: 800 }}>BETA</Code>
        </Group>
        <Divider my="sm" />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} >
        <SLink data={data} />
      </Navbar.Section>
    </Navbar>
  )
}

export default SNavBar