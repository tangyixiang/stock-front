import React, { useContext } from 'react'
import { Tabs } from '@mantine/core';
import { CardContext } from '../pages/daylimit/CardData';
import { useEffect } from 'react';

const objs = [
  { name: 'react', url: 'https://zh-hans.reactjs.org/' },
  { name: 'vue', url: 'https://cn.vuejs.org/' }
]

function CommentTab(props) {

  const data = useContext(CardContext)
  const { parentWidth } = props

  return (
    <Tabs variant="outline" >
      <Tabs.List>
        {objs.map(obj => <Tabs.Tab key={obj.name} value={obj.name}>{obj.name}</Tabs.Tab>)}
      </Tabs.List>

      {
        objs.map(obj =>
          <Tabs.Panel key={obj.name} value={obj.name} pt="md" >
            <iframe width={parentWidth} height={500} src={obj.url}></iframe>
          </Tabs.Panel>)
      }
    </Tabs>
  )
}

export default CommentTab