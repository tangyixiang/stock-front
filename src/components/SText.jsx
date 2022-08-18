import React, { useEffect, useState } from 'react'
import { Text } from '@mantine/core';

function SText(props) {

  const [num, setNum] = useState(0)

  useEffect(() => {
    setNum(() => {
      const value = Reflect.get(props.object, props.k)
      if (props.convert) {
        return (value / 10000 / 10000).toFixed(2) + ' 亿'
      }
      if (props.fixed) {
        return value.toFixed(2) + '%'
      }
      return value
    })
  })

  return (
    <Text size={14} weight={550}>
      <span>{props.k}: </span>
      <span>{num}</span>
    </Text>
  )
}

export default SText