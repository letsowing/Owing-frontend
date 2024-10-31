import React from 'react'

import InputField from '@components/common/InputField'
import TextAreaField from '@components/common/TextAreaField'

import { Character } from '@types'

interface CharacterInputFormProps {
  characterData: Character
  onInputChange: (field: keyof Character, value: string) => void
  isEditable: boolean
}

const CharacterInputForm: React.FC<CharacterInputFormProps> = ({
  characterData,
  onInputChange,
  isEditable,
}) => {
  return (
    <div className="w-full flex-col">
      <div className="mt-3">
        <InputField
          type="text"
          value={characterData.name}
          labelValue="이름"
          isRequired={true}
          maxLength={50}
          isEditable={isEditable}
          onChange={(value) => onInputChange('name', value)}
        />
      </div>
      <div className="mt-3 flex justify-evenly gap-4">
        <div className="w-full">
          <InputField
            type="number"
            value={characterData.age.toString()}
            labelValue="나이"
            isRequired={false}
            maxLength={50}
            isEditable={isEditable}
            onChange={(value) => onInputChange('age', value)}
          />
        </div>
        <div className="w-full">
          <InputField
            type="text"
            value={characterData.gender}
            labelValue="성별"
            isRequired={false}
            maxLength={50}
            isEditable={isEditable}
            onChange={(value) => onInputChange('gender', value)}
          />
        </div>
      </div>
      <div className="mt-3">
        <InputField
          type="text"
          value={characterData.role}
          labelValue="역할"
          isRequired={true}
          maxLength={200}
          isEditable={isEditable}
          onChange={(value) => onInputChange('role', value)}
        />
      </div>
      <div className="mt-3">
        <TextAreaField
          value={characterData.detail}
          labelValue="상세 정보"
          isRequired={false}
          maxLength={1000}
          isEditable={isEditable}
          onChange={(value) => onInputChange('detail', value)}
        />
      </div>
    </div>
  )
}

export default CharacterInputForm
