import React, { useEffect, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { useCharFlow } from '@hooks/useCharFlow'

import CharacterActionButtons from './CharacterActionButtons'
import CharacterImageSection from './CharacterImageSection'
import CharacterInputForm from './CharacterInputForm'
import PageTitle from './PageTitle'

import {
  deleteCharacter as deleteCharacterService,
  getCharacter,
  putCharacter,
  uploadCharacterImage,
} from '@services/characterService'
import { Character } from '@types'
import { useNavigate } from 'react-router-dom'

const CharacterPage: React.FC = () => {
  const navigate = useNavigate()
  const { updateCharacter, deleteCharacter } = useCharFlow()

  const [characterData, setCharacterData] = useState<Character>({
    id: '',
    name: '',
    age: 0,
    gender: '',
    role: '',
    detail: '',
    position: { x: 0, y: 0 },
    imageUrl: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const { selectedFileId } = useProjectStore()

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacter(selectedFileId.toString())
        setCharacterData(data)
      } catch (error) {
        console.error('Failed to fetch character:', error)
      }
    }

    if (selectedFileId) {
      fetchCharacter()
    }
  }, [selectedFileId])

  const handleInputChange = (field: keyof Character, value: string) => {
    setCharacterData((prev) => ({
      ...prev,
      [field]: field === 'age' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleSave = async () => {
    try {
      const updatedCharacter = await putCharacter(characterData)
      updateCharacter(updatedCharacter)
      setCharacterData(updatedCharacter)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update character:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = async () => {
    setIsEditing(false)
    // 수정 취소시 원래 데이터로 복구
    await getCharacter(selectedFileId.toString()).then(setCharacterData)
  }

  const handleDelete = async () => {
    if (!window.confirm('캐릭터를 삭제하시겠습니까?')) return

    try {
      await deleteCharacterService(selectedFileId.toString())
      deleteCharacter(selectedFileId.toString())
      navigate('/characters')
    } catch (error) {
      console.error('Failed to delete character:', error)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadCharacterImage(file)
      setCharacterData((prev) => ({ ...prev, imageUrl }))
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }

  return (
    <div className="mx-[3%] flex w-[94%] flex-col items-center justify-center gap-2 p-4">
      <PageTitle id={selectedFileId} isEditing={isEditing} />

      <div className="flex w-full flex-col">
        <CharacterImageSection
          characterData={characterData}
          isEditing={isEditing}
          onImageUpload={handleImageUpload}
        />

        <div className="w-full flex-1">
          <CharacterInputForm
            characterData={characterData}
            onInputChange={handleInputChange}
            isEditable={isEditing}
          />

          <CharacterActionButtons
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

export default CharacterPage
