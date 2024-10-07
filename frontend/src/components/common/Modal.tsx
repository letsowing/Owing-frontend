import { ReactNode } from 'react'

import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

import { useModalManagement } from '@hooks/useModal'

import { ModalType } from '@types'
import ReactModal from 'react-modal'

interface ModalProps {
  modalType: ModalType
  children?: ReactNode
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}

const Modal: React.FC<ModalProps> = ({
  modalType,
  children,
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
      className="modal-content z-50 mx-auto my-auto flex h-[88%] w-[70%] flex-col overflow-y-auto rounded-3xl bg-white drop-shadow-lg scrollbar-hide dark:bg-darkblack"
      overlayClassName="modal-overlay fixed inset-0 bg-gray bg-opacity-80 dark:bg-opacity-70 flex z-40"
    >
      <div className="flex h-full flex-col">
        <div className="flex-grow">{children}</div>
        <div className="my-10 me-20 ml-auto flex w-1/3 gap-4">
          <SubButton value={secondaryButtonText} onClick={onSecondaryAction} />
          <MainButton value={primaryButtonText} onClick={onPrimaryAction} />
        </div>
      </div>
    </ReactModal>
  )
}

export default Modal
