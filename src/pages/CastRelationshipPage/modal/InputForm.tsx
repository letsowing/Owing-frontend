import React from 'react'

import InputField from '@components/common/InputField'
import TextAreaField from '@components/common/TextAreaField'

import { Cast } from '@types'

interface InputFormProps {
  isEditable: boolean
  cast: Cast
  onInputChange: (field: keyof Cast, value: string | number) => void
}

const InputForm: React.FC<InputFormProps> = ({
  isEditable,
  cast,
  onInputChange,
}) => {
  return (
    <div className="flex flex-col space-y-9 pe-1">
      <InputField
        type="text"
        labelValue="이름"
        value={cast.name}
        isRequired={true}
        maxLength={50}
        isEditable={isEditable}
        onChange={(value) => onInputChange('name', value)}
      />
      <div className="flex justify-evenly gap-4">
        <div className="w-full">
          <InputField
            type="number"
            labelValue="나이"
            value={cast.age.toString()}
            isRequired={false}
            maxLength={50}
            isEditable={isEditable}
            onChange={(value) => onInputChange('age', parseInt(value, 10) || 0)}
          />
        </div>
        <div className="w-full">
          <InputField
            type="text"
            labelValue="성별"
            value={cast.gender}
            isRequired={false}
            maxLength={50}
            isEditable={isEditable}
            onChange={(value) => onInputChange('gender', value)}
          />
        </div>
      </div>
      <InputField
        type="text"
        labelValue="역할/직업"
        value={cast.role}
        isRequired={true}
        maxLength={200}
        isEditable={isEditable}
        onChange={(value) => onInputChange('role', value)}
      />
      <TextAreaField
        labelValue="세부사항"
        value={cast.detail}
        isRequired={false}
        maxLength={1000}
        isEditable={isEditable}
        onChange={(value) => onInputChange('detail', value)}
      />
    </div>
  )
}

export default InputForm
