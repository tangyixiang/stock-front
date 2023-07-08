import { create } from 'zustand'

const useModalStore = create((set) => ({
  isOpen: false,
  symbol: null,
  openModal: (symbol) => set({ isOpen: true, symbol: symbol }),
  closeModal: () => set({ isOpen: false, symbol: null }),
}))

export default useModalStore
