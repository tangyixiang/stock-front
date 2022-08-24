import React, { useState } from 'react'
import { NavLink } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function SLink(props) {
  const { data } = props;
  let navigate = useNavigate();

  const [active, setActive] = useState('');
  const [menus, setMenus] = useState([])

  // const links = () => {
  //   const temp = []
  //   for (let item in data) {
  //     const link = <NavLink
  //       key={item.label}
  //       label={item.label}
  //       childrenOffset={28}
  //       active={active === item.path}
  //       onClick={() => {
  //         setActive(item.path)
  //         navigate(item.path);
  //       }}
  //     />
  //     temp.push(link)
  //   }
  //   return temp
  // }

  // useEffect(() => {
  //   const aa = links()
  //   console.log(aa);
  //   setMenus(aa)
  // }, [])


  return (
    <>
      {data.map(item =>
        <NavLink
          key={item.label}
          label={item.label}
          component={Link}
          to={item.path}
          active={active === item.path}
          onClick={() => setActive(item.path)} />
      )}

    </>
  )
}

export default SLink