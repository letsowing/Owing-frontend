import MainButton from '@components/common/MainButton'
import Modal from '@components/common/Modal'
import SubButton from '@components/common/SubButton'

import ImageForm from './ImageForm'
import InputForm from './InputForm'

import TagField from '@/components/common/TagField'

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
  const mockData = [
    {
      value: '1화',
    },
    {
      value: '2화',
    },
    {
      value: '3화',
    },
  ]

  return (
    <Modal isOpen={isOpen} onRequestClose={() => null} setIsOpen={setIsOpen}>
      <div className="mx-20 my-10 flex justify-between">
        <div className="w-1/3">
          <ImageForm isEditable={isEditable} />
        </div>
        <div className="flex w-2/3 flex-col justify-between">
          <InputForm isEditable={isEditable} />
          {isEditable ? (
            <div className="mt-44 flex justify-end gap-2">
              <div className="w-1/3">
                <SubButton value={'Cancel'} />
              </div>
              <div className="w-1/3">
                <MainButton value={'Save'} />
              </div>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <TagField
                  labelValue={'등장원고'}
                  tagList={mockData}
                  isEditable={isEditable}
                />
              </div>
              <div className="mt-20 flex justify-end gap-2">
                <div className="w-1/3">
                  <SubButton value={'Back'} />
                </div>
                <div className="w-1/3">
                  <MainButton value={'Edit'} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default CharacterRelationshipModal
