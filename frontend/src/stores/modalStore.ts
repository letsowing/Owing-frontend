import { AnyModalProps } from '@types'
import { create } from 'zustand'

interface ModalState {
  modals: AnyModalProps[]
  openModal: (modal: AnyModalProps) => void
  closeModal: () => void
  closeAllModals: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (modal) =>
    set((state) => ({
      modals: [...state.modals, modal],
    })),
  closeModal: () =>
    set((state) => {
      if (state.modals.length === 0) return state
      return { modals: state.modals.slice(0, -1) }
    }),

  closeAllModals: () =>
    set((state) => {
      if (state.modals.length === 0) return state
      return { modals: [] }
    }),
}))
