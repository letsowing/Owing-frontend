import React, { useState } from 'react'

import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

import { useCharFlow } from '@hooks/useCharFlow'

import CharacterImage from './CharacterImage'
import CharacterInputForm from './CharacterInputForm'

import { Character } from '@types'
import { BsPlusCircle } from 'react-icons/bs'
import { MdLightbulbOutline } from 'react-icons/md'

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
      <div className="flex w-full flex-col">
        <div className="flex justify-center">
          <div className="flex-col">
            {isEditing && (
              <label
                htmlFor="imageUpload"
                className="mb-1 flex w-80 cursor-pointer justify-end"
                // onClick={ }
              >
                <BsPlusCircle className="mt-1 text-redorange dark:text-blue" />
              </label>
            )}
            <div className="flex-center align-center flex h-80 w-80 rounded-xl bg-coldbeige">
              <CharacterImage imageUrl={characterData.imageUrl} />
            </div>
            {isEditing && (
              <div
                // onClick={onAIGenerateClick}
                className="my-3 flex w-80 cursor-pointer items-center justify-between rounded-full border border-lightgray p-3 px-4 dark:border-lightdarkgray"
              >
                <div className="flex items-center space-x-2">
                  <div className="text-xl font-medium text-redorange dark:text-blue">
                    <MdLightbulbOutline />
                  </div>
                  <span className="text-[10px] text-darkgray dark:text-coldbeige">
                    AI를 활용하여 이미지를 생성할 수 있어요!
                  </span>
                </div>
                <span className="mx-2 rounded-full bg-orange bg-opacity-20 px-2 text-sm text-redorange dark:bg-coldbeige dark:text-blue">
                  Click
                </span>
              </div>
            )}
          </div>
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
