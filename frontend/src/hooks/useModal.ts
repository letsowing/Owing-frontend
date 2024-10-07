import { useCallback } from 'react'

import { useModalStore } from '@stores/modalStore'

import { AnyModalProps } from '@types'

export const useModalManagement = () => {
  const { modals, openModal, closeModal, closeAllModals } = useModalStore()

  const handleOpenModal = useCallback(
    (modal: AnyModalProps) => {
      openModal(modal)
    },
    [openModal],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleCloseAllModals = useCallback(() => {
    closeAllModals()
  }, [closeAllModals])

  return {
    modals,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    closeAllModals: handleCloseAllModals,
  }
}
