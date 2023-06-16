import React from 'react'
import { Progress, Tooltip } from 'antd'

const HorizontalBarChart = (props) => {
  return (
    <Tooltip title={`上涨:${props.up},下跌:${props.down}`}>
      <Progress
        strokeColor="#10B981"
        percent={100}
        success={{
          percent: (props.up / (props.up + props.down)) * 100,
          strokeColor: '#ef4444',
        }}
      />
    </Tooltip>
  )
}

export default HorizontalBarChart
