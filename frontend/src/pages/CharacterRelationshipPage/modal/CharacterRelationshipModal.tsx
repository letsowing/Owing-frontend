import { useEffect, useState } from 'react'

import Modal from '@components/common/Modal'
import TagField from '@components/common/TagField'

import { useModalManagement } from '@hooks/useModal'

import ImageForm from './ImageForm'
import InputForm from './InputForm'

import { Character, CharacterRelationshipModalProps, ModalType } from '@types'

const mockData = [{ value: '1화' }, { value: '2화' }, { value: '3화' }]

const initialCharacter: Character = {
  id: '',
  name: '',
  age: 0,
  gender: '',
  role: '',
  details: '',
  imageUrl: '',
}

const CharacterRelationshipModal = ({
  isEditable,
  onEdit,
  onSave,
  onClose,
}: CharacterRelationshipModalProps) => {
  const { modals } = useModalManagement()
  const [editableCharacter, setEditableCharacter] =
    useState<Character>(initialCharacter)

  useEffect(() => {
    if (modals.length > 0) {
      const currentModal = modals[modals.length - 1]
      if (currentModal.type === ModalType.CHARACTER_RELATIONSHIP) {
        setEditableCharacter(currentModal.character || initialCharacter)
      }
    }
  }, [modals])

  const handleInputChange = (
    field: keyof Character,
    value: string | number,
  ) => {
    setEditableCharacter((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(editableCharacter)
  }

  const handleAIImageGeneration = () => {
    console.log('Create AI Image!')
  }

  const handlePrimaryAction = () => {
    if (isEditable) {
      handleSave()
    } else {
      onEdit()
    }
  }

  return (
    <Modal
      modalType={ModalType.CHARACTER_RELATIONSHIP}
      primaryButtonText={isEditable ? 'Save' : 'Edit'}
      secondaryButtonText="Cancel"
      onPrimaryAction={handlePrimaryAction}
      onSecondaryAction={onClose}
    >
      <div className="mx-20 my-10 flex justify-between">
        <div className="w-1/3">
          <ImageForm
            isEditable={isEditable}
            image={editableCharacter.imageUrl}
            onImageChange={(image) => handleInputChange('imageUrl', image)}
            onAIGenerateClick={handleAIImageGeneration}
          />
        </div>
        <div className="flex w-3/5 flex-col justify-between">
          <InputForm
            isEditable={isEditable}
            character={editableCharacter}
            onInputChange={handleInputChange}
          />
          {!isEditable && (
            <div className="mt-8">
              <TagField
                labelValue="등장원고"
                tagList={mockData}
                isEditable={isEditable}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default CharacterRelationshipModal
