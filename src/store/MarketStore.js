import { create } from 'zustand'

const useMarketStore = create((set) => ({
  marketType: "cn",
  setMarketType: (data) => set({ marketType: data }),
}))

export default useModalStore