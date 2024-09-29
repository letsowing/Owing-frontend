import ImageForm from './ImageForm'
import InputForm from './InputForm'

import MainButton from '@/components/common/MainButton'
import Modal from '@/components/common/Modal'
import SubButton from '@/components/common/SubButton'

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
    <div>
      <Modal isOpen={isOpen} onRequestClose={() => null} setIsOpen={setIsOpen}>
        <div className="mx-20 my-20 flex justify-between space-x-10">
          <div className="mt-100 w-1/3">
            <ImageForm />
          </div>
          <div className="flex w-2/3 flex-col justify-between">
            <InputForm isEditable={isEditable} />
            <div className="my-20 flex justify-end gap-2">
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
    </div>
  )
}

export default CharacterRelationshipModal
