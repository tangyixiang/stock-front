import React from 'react'
import { Navbar, Group, NavLink, ScrollArea, Code, Divider } from '@mantine/core';
import { links } from '../config/Router'
import SLink from './SLink';

function SNavBar() {

  return (
    <Navbar width={{ base: 300 }} height={'100vh'} p="xs">
      <Navbar.Section grow component={ScrollArea} >
        <SLink data={links} />
      </Navbar.Section>
    </Navbar>
  )
}

export default SNavBar