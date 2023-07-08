import React, { useEffect } from 'react'
import useModalStore from '../../store/ModalStore'
import SymbolCard from '../SymbolCard'

const CharWrapper = (props) => {
  const isOpen = useModalStore((state) => state.isOpen)
  const symbol = useModalStore((state) => state.symbol)
  const closeModal = useModalStore((state) => state.closeModal)

  useEffect(() => {
    return closeModal()
  }, [])

  return (
    <>
      {isOpen && (
        <SymbolCard symbol={symbol} open={isOpen} close={closeModal} />
      )}
      {props.children}
    </>
  )
}

export default CharWrapper
