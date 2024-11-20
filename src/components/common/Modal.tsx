import { ReactNode } from 'react'

import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

import { useModalManagement } from '@hooks/useModal'

import { ModalType } from '@types'
import ReactModal from 'react-modal'

interface ModalProps {
  modalType: ModalType
  children?: ReactNode
  isValid: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}

const Modal: React.FC<ModalProps> = ({
  modalType,
  children,
  isValid,
  primaryButtonText = 'Save',
  secondaryButtonText = 'Cancel',
  onPrimaryAction,
  onSecondaryAction,
}) => {
  const { modals, closeModal } = useModalManagement()

  const isOpen = modals.some((modal) => modal.type === modalType)

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      className="modal-content z-50 mx-auto mt-[4%] flex h-5/6 w-3/4 flex-col overflow-y-auto rounded-3xl bg-white drop-shadow-lg scrollbar-hide dark:bg-verydarkblack"
      overlayClassName="modal-overlay fixed inset-0 bg-gray bg-opacity-80 dark:bg-opacity-70 flex z-40"
    >
      <div className="flex flex-col">
        {children}
        <div className="mb-6 me-20 ml-auto mt-16 flex w-1/3 gap-4">
          <SubButton value={secondaryButtonText} onClick={onSecondaryAction} />
          <MainButton
            value={primaryButtonText}
            onClick={onPrimaryAction}
            disabled={!isValid}
          />
        </div>
      </div>
    </ReactModal>
  )
}

export default Modal
