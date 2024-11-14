import { useEffect, useState } from 'react'

import ImageForm from '@components/common/ImageForm'
import Modal from '@components/common/Modal'
import TagField from '@components/common/TagField'

import { useModalManagement } from '@hooks/useModal'

import InputForm from './InputForm'

import { postCastGenerateAiImage } from '@/services/castService'
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
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(
    folderId,
  )
  const [isGenerating, setIsGenerating] = useState(false)

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

  const handleAIImageGeneration = async () => {
    setIsGenerating(true)
    try {
      const data = await postCastGenerateAiImage({
        name: editableCast.name,
        age: editableCast.age,
        gender: editableCast.gender,
        role: editableCast.role,
        description: editableCast.description,
      })
      handleInputChange('imageUrl', data.imageUrl)
    } catch (error) {
      console.error('인물 AI 이미지 생성 실패', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    try {
      await onSave(editableCast, selectedFolderId)
      onClose()
    } catch (error) {
      console.error('Failed to save cast:', error)
    }
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
            image={editableCast.imageUrl || ''}
            onImageChange={(image) => handleInputChange('imageUrl', image)}
            onAIGenerateClick={handleAIImageGeneration}
            isGenerating={isGenerating}
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
