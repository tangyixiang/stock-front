import React from 'react'
import { Group, Button, Indicator, Accordion } from '@mantine/core';
import { useState, useEffect } from 'react';

function Industrial(props) {

  const { data, click, total, date } = props
  const [allIndustrial, setAllIndustrial] = useState([])

  useEffect(() => {
    const tempArray = []
    const all = <Button.Group key='all'>
      <Button size='xs' radius='lg' variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={() => click('all')} >
        全部
      </Button>
      <Button size='xs' radius='lg' variant="gradient" gradient={{ from: 'orange', to: 'red' }} >
        {total}
      </Button>
    </Button.Group>
    tempArray.push(all)
    for (let k in data) {
      const temp = <Button.Group key={k}>
        <Button
          size='xs'
          radius='lg'
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          onClick={() => click(k)}
        >
          {k}
        </Button>
        <Button
          size='xs'
          radius='lg'
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
        >
          {data[k]}
        </Button>
      </Button.Group>

      tempArray.push(temp)
    }
    setAllIndustrial(tempArray)
  }, [data])

  return (
    <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
      <Accordion variant="filled"  >
        <Accordion.Item value='industrial' style={{ background: '#FFF' }}>
          <Accordion.Control>行业分布(日期: {date} 总数：{total})</Accordion.Control>
          <Accordion.Panel>
            <Group>
              {allIndustrial}
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Industrial