import React, { useEffect, useState } from 'react'

import EmptyFolder from '@components/common/EmptyFolder'

import { useProjectStore } from '@stores/projectStore'

import { useCast } from '@hooks/useCast'

import CastActionButtons from './CastActionButtons'
import CastImageSection from './CastImageSection'
import CastInputForm from './CastInputForm'
import PageTitle from './PageTitle'

import { Cast } from '@types'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const { updateCast, deleteCast, getCast } = useCast()

  const [originalCastData, setOriginalCastData] =
    useState<Cast>(initialCastData)
  const [castData, setCastData] = useState<Cast>(initialCastData)
  const [isEditing, setIsEditing] = useState(false)
  const { selectedFileId, selectedFolderId } = useProjectStore()

  useEffect(() => {
    if (!selectedFileId) return
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

  const handleInputChange = (field: keyof Cast, value: string) => {
    setCastData((prev) => ({
      ...prev,
      [field]: field === 'age' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleSave = async () => {
    try {
      const cast = {
        name: castData.name,
        age: castData.age,
        gender: castData.gender,
        role: castData.role,
        description: castData.description,
        imageUrl: castData.imageUrl,
      }
      await updateCast(castData.id, cast)
      setCastData(castData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update cast:', error)
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
    if (!window.confirm('캐릭터를 삭제하시겠습니까?')) return

    try {
      await deleteCast(selectedFileId.toString())
      navigate('/casts')
    } catch (error) {
      console.error('Failed to delete cast:', error)
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
