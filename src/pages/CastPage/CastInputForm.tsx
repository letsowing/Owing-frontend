import React from 'react'

import InputField from '@components/common/InputField'
import TextAreaField from '@components/common/TextAreaField'

import { Cast } from '@types'

interface CastInputFormProps {
  castData: Cast
  onInputChange: (field: keyof Cast, value: string) => void
  isEditable: boolean
}

const CastInputForm: React.FC<CastInputFormProps> = ({
  castData,
  onInputChange,
  isEditable,
}) => {
  return (
    <div className="w-full flex-col">
      <div className="mt-3">
        <InputField
          type="text"
          value={castData.name || ''}
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
            value={castData.age?.toString() || '0'}
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
            value={castData.gender || ''}
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
          value={castData.role || ''}
          labelValue="역할"
          isRequired={true}
          maxLength={200}
          isEditable={isEditable}
          onChange={(value) => onInputChange('role', value)}
        />
      </div>
      <div className="mt-3">
        <TextAreaField
          value={castData.description || ''}
          labelValue="상세 정보"
          isRequired={false}
          maxLength={1000}
          isEditable={isEditable}
          onChange={(value) => onInputChange('description', value)}
        />
      </div>
    </div>
  )
}

export default CastInputForm
