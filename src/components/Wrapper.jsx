import React from 'react'

const Wrapper = (props) => {
  let classNames = ''
  if (!props.nobg) {
    classNames = 'bg-white p-4'
  }
  return <div className={classNames}>{props.children}</div>
}

export default Wrapper
