import React from 'react'

const AutoRenderText = (props) => {
  if (props.data > 0) return <div className="text-red-500">{props.data}</div>
  return <div className="text-emerald-500">{props.data}</div>
}

export default AutoRenderText
