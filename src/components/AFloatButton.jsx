import React, { useEffect, useState } from 'react'
import {
  UpOutlined,
  DownOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { FloatButton } from 'antd'

const AFloatButton = (props) => {
  const screenHeight = window.innerHeight

  const [times, setTimes] = useState(0)

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.scroll({
      top: times * screenHeight,
      behavior: 'smooth',
    })
  }, [times])

  useEffect(() => {
    setTimes(0)
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [props.watch])

  return (
    <FloatButton.Group shape="circle" className="right-10">
      <FloatButton
        icon={<VerticalAlignTopOutlined />}
        onClick={() => setTimes(0)}
      />
      <FloatButton icon={<UpOutlined />} onClick={() => setTimes(times - 1)} />
      <FloatButton
        icon={<DownOutlined />}
        onClick={() => setTimes(times + 1)}
      />
      <FloatButton
        icon={<VerticalAlignBottomOutlined />}
        onClick={scrollToBottom}
      />
    </FloatButton.Group>
  )
}

export default AFloatButton
