import React, { useState } from 'react'
import { NavLink } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import {
  IconNotes
} from '@tabler/icons';

function SLink(props) {
  const { data } = props;
  const [active, setActive] = useState('');

  return (
    <>
      {data.map(item =>
        <NavLink
          key={item.label}
          label={item.label}
          icon={<IconNotes size={16} stroke={1.5} />}
          component={Link}
          to={item.path}
          active={active === item.path}
          onClick={() => setActive(item.path)} />
      )}

    </>
  )
}

export default SLink