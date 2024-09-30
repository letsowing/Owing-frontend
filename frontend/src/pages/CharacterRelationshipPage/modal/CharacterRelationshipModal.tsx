import MainButton from '@components/common/MainButton'
import Modal from '@components/common/Modal'
import SubButton from '@components/common/SubButton'

import ImageForm from './ImageForm'
import InputForm from './InputForm'

interface CharacterRelationshipModalProps {
  isOpen: boolean
  onRequestClose: () => void
  setIsOpen: (state: boolean) => void
  isEditable: boolean
}

const CharacterRelationshipModal = ({
  isOpen,
  setIsOpen,
  isEditable,
}: CharacterRelationshipModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => null} setIsOpen={setIsOpen}>
      <div className="mx-20 my-10 flex justify-between space-x-10">
        <div className="w-1/3">
          <ImageForm />
        </div>
        <div className="flex w-2/3 flex-col justify-between">
          <InputForm isEditable={isEditable} />
          <div className="mt-20 flex justify-end gap-2">
            <div className="w-1/3">
              <SubButton value={'Cancel'} />
            </div>
            <div className="w-1/3">
              <MainButton value={'Save'} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CharacterRelationshipModal
