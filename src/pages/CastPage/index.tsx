import React, { useEffect, useState } from 'react'

import EmptyFolder from '@components/common/EmptyFolder'

import { useProjectStore } from '@stores/projectStore'

import { useCast } from '@hooks/useCast'
import { useConfirm } from '@hooks/useConfirm'
import { useDnd } from '@hooks/useDnd'

import CastActionButtons from './CastActionButtons'
import CastImageSection from './CastImageSection'
import CastInputForm from './CastInputForm'
import PageTitle from './PageTitle'

import { Cast } from '@types'

const initialCastData: Cast = {
  id: '',
  name: '',
  age: 0,
  gender: '',
  role: '',
  description: '',
  position: { x: 0, y: 0 },
  imageUrl: '',
}

const CastPage: React.FC = () => {
  const { updateCast, deleteCast, getCast } = useCast()
  const { confirmDelete, showSuccessDialog } = useConfirm()
  const { deleteFile } = useDnd()
  const { selectedFileId, selectedFolderId } = useProjectStore()

  const [originalCastData, setOriginalCastData] =
    useState<Cast>(initialCastData)
  const [castData, setCastData] = useState<Cast>(initialCastData)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setIsEditing(false)

    if (!selectedFileId) {
      return
    }

    const fetchCast = async () => {
      try {
        const data = await getCast(selectedFileId.toString())
        setCastData({ ...data, position: data.coordinate })
        setOriginalCastData({ ...data, position: data.coordinate })
      } catch (error) {
        console.error('Failed to fetch cast:', error)
      }
    }

    if (selectedFileId) {
      fetchCast()
    }
  }, [selectedFileId, getCast])

  if (!selectedFolderId || !selectedFileId) {
    return <EmptyFolder isFolderEmpty={!selectedFolderId} />
  }

  const isFormValid = () => {
    return !!(castData.name.trim() && castData.role.trim())
  }

  const handleInputChange = (field: keyof Cast, value: string) => {
    setCastData((prev) => ({
      ...prev,
      [field]: field === 'age' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleSave = async () => {
    try {
      const cast = {
        folderId: selectedFolderId,
        name: castData.name,
        age: castData.age,
        gender: castData.gender,
        role: castData.role,
        description: castData.description,
        imageUrl: castData.imageUrl,
      }
      await updateCast(castData.id, cast)
      setCastData(castData)
    } catch (error) {
      console.error('Failed to update cast:', error)
    } finally {
      setIsEditing(false)
      showSuccessDialog('저장되었습니다.')
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 수정 취소시 원래 데이터로 복구
    setCastData(originalCastData)
  }

  const handleDelete = async () => {
    const isConfirmed = await confirmDelete({
      title: '파일을 삭제하시겠습니까?',
      text: '휴지통으로 옯겨집니다.',
    })
    if (isConfirmed) {
      try {
        await deleteCast(selectedFileId.toString())
        deleteFile(selectedFolderId, selectedFileId)
      } catch (error) {
        console.error('Failed to delete cast:', error)
      }
    }
  }

  return (
    <div className="mx-[3%] flex w-[94%] flex-col items-center justify-center gap-2 p-4">
      <PageTitle id={selectedFileId} isEditing={isEditing} />

      <div className="flex w-full flex-col">
        <CastImageSection castData={castData} isEditing={isEditing} />
        <div className="w-full flex-1">
          <CastInputForm
            castData={castData}
            onInputChange={handleInputChange}
            isEditable={isEditing}
          />
          <CastActionButtons
            isEditing={isEditing}
            isValid={isFormValid()}
            hasId={true} // 저장/수정을 가르는 요소
            onSave={handleSave}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default CastPage
