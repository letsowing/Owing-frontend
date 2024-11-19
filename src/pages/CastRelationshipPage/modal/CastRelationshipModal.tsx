import { useEffect, useState } from 'react'

import ImageForm from '@components/common/ImageForm'
import Modal from '@components/common/Modal'

import { useProjectStore } from '@stores/projectStore'

import { useConfirm } from '@hooks/useConfirm'
import { useModalManagement } from '@hooks/useModal'

import InputForm from './InputForm'

import { Cast, CastRelationshipModalProps, ModalType } from '@types'
import { postCastFolder, postCastGenerateAiImage } from 'services/castService'

// const mockData = [
//   { name: '1화', value: '1' },
//   { name: '2화', value: '2' },
//   { name: '3화', value: '3' },
// ]

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
  onFolderListUpdate,
}: CastRelationshipModalProps) => {
  const { confirmAIImageGeneration, promptFolderName } = useConfirm()
  const { modals } = useModalManagement()
  const [editableCast, setEditableCast] = useState<Cast>(initialCast)
  const [selectedFolderId, setSelectedFolderId] = useState<number>(folderId)
  const [isGenerating, setIsGenerating] = useState(false)
  const [localFolderList, setLocalFolderList] = useState(folderList)
  const currentProject = useProjectStore((state) => state.currentProject)

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

  const isFormValid = () => {
    return !!(
      editableCast.name?.trim() &&
      editableCast.role?.trim() &&
      selectedFolderId
    )
  }

  const handleInputChange = (field: keyof Cast, value: string | number) => {
    setEditableCast((prev) => ({ ...prev, [field]: value }))
  }

  const handleFolderSelect = (folderId: number) => {
    setSelectedFolderId(folderId)
  }

  const handleAIImageGeneration = async () => {
    const isConfirmed = await confirmAIImageGeneration()
    if (!isConfirmed) {
      return
    }
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

  const handleCreateFolder = async () => {
    try {
      const folderName = await promptFolderName()
      if (folderName) {
        const newFolder = await postCastFolder({
          projectId: currentProject.id,
          name: folderName,
        })
        const newFolderItem = {
          id: newFolder.id,
          name: folderName,
        }
        setLocalFolderList((prev) => [...prev, newFolderItem])

        if (onFolderListUpdate) {
          onFolderListUpdate()
        }
        setSelectedFolderId(newFolder.id)
      }
    } catch (error) {
      console.error('폴더 생성 실패:', error)
    }
  }

  return (
    <Modal
      modalType={ModalType.CHARACTER_RELATIONSHIP}
      isValid={isFormValid()}
      primaryButtonText={isEditable ? '저장' : '편집'}
      secondaryButtonText="취소"
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
            folderList={localFolderList}
            onInputChange={handleInputChange}
            onFolderSelect={handleFolderSelect}
            onCreateFolder={handleCreateFolder}
          />
          {/* {!isEditable && (
            <div className="mt-8">
              <TagField
                labelValue="등장원고"
                tagList={mockData}
                isEditable={isEditable}
              />
            </div>
          )} */}
        </div>
      </div>
    </Modal>
  )
}

export default CastRelationshipModal
