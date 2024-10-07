import React from 'react'

import InputField from '@components/common/InputField'

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
    <div className="w-full max-w-md">
      <InputField
        type="text"
        value={characterData.name}
        labelValue="이름"
        isRequired={true}
        maxLength={50}
        isEditable={isEditable}
        onChange={(value) => onInputChange('name', value)}
      />
      <InputField
        type="number"
        value={characterData.age.toString()}
        labelValue="나이"
        isRequired={false}
        maxLength={50}
        isEditable={isEditable}
        onChange={(value) => onInputChange('age', value)}
      />
      <InputField
        type="text"
        value={characterData.gender}
        labelValue="성별"
        isRequired={false}
        maxLength={50}
        isEditable={isEditable}
        onChange={(value) => onInputChange('gender', value)}
      />
      <InputField
        type="text"
        value={characterData.role}
        labelValue="역할"
        isRequired={true}
        maxLength={200}
        isEditable={isEditable}
        onChange={(value) => onInputChange('role', value)}
      />
      <InputField
        type="text"
        value={characterData.details}
        labelValue="상세 정보"
        isRequired={false}
        maxLength={1000}
        isEditable={isEditable}
        onChange={(value) => onInputChange('details', value)}
      />
    </div>
  )
}

export default CharacterInputForm
