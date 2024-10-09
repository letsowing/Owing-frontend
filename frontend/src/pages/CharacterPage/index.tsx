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
    <div className="mx-[3%] flex w-[94%] flex-col items-center justify-center gap-2 p-4">
      <div className="flex-start w-full">
        <h1 className="mb-4 text-2xl font-bold dark:text-coldbeige">
          캐릭터 {isEditing ? '수정' : '생성'}
        </h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex-center align-center flex h-[15rem] w-[15rem] rounded-xl bg-coldbeige">
          <CharacterImage imageUrl={characterData.imageUrl} />
        </div>
        <div className="w-full flex-1">
          <CharacterInputForm
            characterData={characterData}
            onInputChange={handleInputChange}
            isEditable={isEditing}
          />
          <div className="mt-4 flex justify-end gap-2">
            {isEditing ? (
              <>
                <div className="w-[12rem]">
                  <SubButton value="취소" onClick={handleCancel} />
                </div>
                <div className="w-[12rem]">
                  <MainButton value="저장" onClick={handleSave} />
                </div>
              </>
            ) : (
              <div className="w-[12rem]">
                <MainButton value="수정" onClick={handleEdit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterPage
