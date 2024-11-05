import React, { useEffect, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { useCharFlow } from '@hooks/useCharFlow'

import CastActionButtons from './CastActionButtons'
import CastImageSection from './CastImageSection'
import CastInputForm from './CastInputForm'
import PageTitle from './PageTitle'

import EmptyFolder from '@/components/common/EmptyFolder'
import {
  deleteCast as deleteCastService,
  getCast,
  putCast,
  uploadCastImage,
} from '@services/castService'
import { Cast } from '@types'
import { useNavigate } from 'react-router-dom'

const CastPage: React.FC = () => {
  const navigate = useNavigate()
  const { updateCast, deleteCast } = useCharFlow()

  const [castData, setCastData] = useState<Cast>({
    id: '',
    name: '',
    age: 0,
    gender: '',
    role: '',
    description: '',
    position: { x: 0, y: 0 },
    imageUrl: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const { selectedFileId, selectedFolderId } = useProjectStore()

  useEffect(() => {
    if (!selectedFileId) return
    const fetchCast = async () => {
      try {
        const data = await getCast(selectedFileId.toString())
        setCastData(data)
      } catch (error) {
        console.error('Failed to fetch cast:', error)
      }
    }

    if (selectedFileId) {
      fetchCast()
    }
  }, [selectedFileId])

  if (!selectedFolderId || !selectedFileId) {
    return <EmptyFolder isFolderEmpty={!selectedFolderId} />
  }

  const handleInputChange = (field: keyof Cast, value: string) => {
    setCastData((prev) => ({
      ...prev,
      [field]: field === 'age' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleSave = async () => {
    try {
      const updatedCast = await putCast(castData)
      updateCast(updatedCast)
      setCastData(updatedCast)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update cast:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = async () => {
    setIsEditing(false)
    // 수정 취소시 원래 데이터로 복구
    await getCast(selectedFileId.toString()).then(setCastData)
  }

  const handleDelete = async () => {
    if (!window.confirm('캐릭터를 삭제하시겠습니까?')) return

    try {
      await deleteCastService(selectedFileId.toString())
      deleteCast(selectedFileId.toString())
      navigate('/casts')
    } catch (error) {
      console.error('Failed to delete cast:', error)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadCastImage(file)
      setCastData((prev) => ({ ...prev, imageUrl }))
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }

  return (
    <div className="mx-[3%] flex w-[94%] flex-col items-center justify-center gap-2 p-4">
      <PageTitle id={selectedFileId} isEditing={isEditing} />

      <div className="flex w-full flex-col">
        <CastImageSection
          castData={castData}
          isEditing={isEditing}
          onImageUpload={handleImageUpload}
        />

        <div className="w-full flex-1">
          <CastInputForm
            castData={castData}
            onInputChange={handleInputChange}
            isEditable={isEditing}
          />

          <CastActionButtons
            isEditing={isEditing}
            hasId={true}
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
