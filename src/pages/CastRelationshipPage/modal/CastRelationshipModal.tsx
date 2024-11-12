import { useEffect, useState } from 'react'

import ImageForm from '@components/common/ImageForm'
import Modal from '@components/common/Modal'
import TagField from '@components/common/TagField'

import { useModalManagement } from '@hooks/useModal'

import InputForm from './InputForm'

import { Cast, CastRelationshipModalProps, ModalType } from '@types'

const mockData = [
  { name: '1화', value: '1' },
  { name: '2화', value: '2' },
  { name: '3화', value: '3' },
]

const initialCast: Cast = {
  id: '',
  name: '',
  age: 0,
  gender: '',
  role: '',
  description: '',
  position: { x: Math.random() * 500, y: Math.random() * 500 },
  imageUrl: '',
}

const CastRelationshipModal = ({
  isEditable,
  folderId,
  folderList,
  onEdit,
  onSave,
  onClose,
}: CastRelationshipModalProps) => {
  const { modals } = useModalManagement()
  const [editableCast, setEditableCast] = useState<Cast>(initialCast)
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>()

  useEffect(() => {
    if (modals.length > 0) {
      const currentModal = modals[modals.length - 1]
      if (currentModal.type === ModalType.CHARACTER_RELATIONSHIP) {
        setEditableCast(currentModal.cast || initialCast)

        if (folderId) {
          setSelectedFolderId(folderId)
        }
      }
    }
  }, [folderId, modals])

  const handleInputChange = (field: keyof Cast, value: string | number) => {
    setEditableCast((prev) => ({ ...prev, [field]: value }))
  }

  const handleFolderSelect = (folderId: number) => {
    setSelectedFolderId(folderId)
  }

  const handleSave = async () => {
    onSave(editableCast, selectedFolderId)
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
            image={editableCast.imageUrl}
            onImageChange={(image) => handleInputChange('imageUrl', image)}
            onAIGenerateClick={handleAIImageGeneration}
          />
        </div>
        <div className="flex w-3/5 flex-col justify-between">
          <InputForm
            isEditable={isEditable}
            cast={editableCast}
            selectedFolderId={selectedFolderId}
            folderList={folderList}
            onInputChange={handleInputChange}
            onFolderSelect={handleFolderSelect}
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

export default CastRelationshipModal
