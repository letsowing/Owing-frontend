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
      className="mx-auto mt-[5%] flex h-4/5 w-[85%] flex-col rounded-3xl bg-white drop-shadow-lg"
      overlayClassName="fixed inset-0 bg-gray bg-opacity-75 flex"
    >
      <div>{children}</div>
      {/* <button className="onClick={onRequestClose}>exit</button> */}
    </ReactModal>
  )
}

export default Modal
