import { ReactNode } from 'react'

import ReactModal from 'react-modal'

interface ModalProps {
  isOpen: boolean
  children?: ReactNode
  onRequestClose: () => void
  setIsOpen: (state: boolean) => void
}

const Modal = ({
  isOpen,
  children,
  // onRequestClose,
  setIsOpen,
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      className="mx-auto mt-[4%] flex h-[88%] w-[70%] flex-col overflow-y-auto rounded-3xl bg-white drop-shadow-lg dark:bg-darkblack"
      overlayClassName="fixed inset-0 bg-gray bg-opacity-80 dark:bg-opacity-70 flex"
    >
      <div>{children}</div>
      {/* <button className="onClick={onRequestClose}>exit</button> */}
    </ReactModal>
  )
}

export default Modal
