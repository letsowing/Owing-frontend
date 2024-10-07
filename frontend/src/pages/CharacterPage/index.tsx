import React, { useState } from 'react'

import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

import { useCharFlow } from '@hooks/useCharFlow'

import CharacterImage from './CharacterImage'
import CharacterInputForm from './CharacterInputForm'

import { Character } from '@types'

const CharacterPage: React.FC = () => {
  const { addCharacter, updateCharacter } = useCharFlow()
  const [characterData, setCharacterData] = useState<Character>({
    id: '',
    name: '',
    age: 0,
    gender: '',
    role: '',
    details: '',
    imageUrl: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field: keyof Character, value: string) => {
    setCharacterData((prev) => ({
      ...prev,
      [field]: field === 'age' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleSave = () => {
    if (isEditing) {
      updateCharacter(characterData)
    } else {
      const newCharacter = addCharacter(characterData)
      setCharacterData(newCharacter)
    }
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 필요한 경우 characterData를 원래 상태로 되돌립니다.
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        캐릭터 {isEditing ? '수정' : '생성'}
      </h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <CharacterImage imageUrl={characterData.imageUrl} />
        <div className="flex-1">
          <CharacterInputForm
            characterData={characterData}
            onInputChange={handleInputChange}
            isEditable={isEditing}
          />
          <div className="mt-4 flex gap-2">
            {isEditing ? (
              <>
                <SubButton value="취소" onClick={handleCancel} />
                <MainButton value="저장" onClick={handleSave} />
              </>
            ) : (
              <MainButton value="수정" onClick={handleEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterPage
