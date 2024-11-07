import React, { useEffect, useState } from 'react'

interface TextAreaFieldProps {
  value: string
  labelValue: string
  isRequired?: boolean
  maxLength?: number
  isEditable?: boolean
  onChange: (value: string) => void
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  value,
  labelValue,
  isRequired = false,
  maxLength = 1000,
  isEditable = true,
  onChange,
}) => {
  const [textValue, setTextValue] = useState(value)

  useEffect(() => {
    setTextValue(value)
  }, [value])

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (isEditable && newValue.length <= maxLength) {
      setTextValue(newValue)
      onChange(newValue)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="flex font-semibold text-darkgray dark:text-white">
          {labelValue}
          {isRequired && isEditable && (
            <div className="flex items-center gap-3">
              <span className="ml-1 text-redorange dark:text-blue">*</span>
              {!textValue && (
                <p className="text-xs font-normal text-redorange dark:text-blue">
                  입력값이 없습니다.
                </p>
              )}
            </div>
          )}
        </label>
        <span className="text-sm font-medium text-redorange dark:text-blue">
          {isEditable ? textValue.length + '/' + maxLength : ''}
        </span>
      </div>
      <textarea
        value={textValue}
        onChange={onChangeTextArea}
        maxLength={maxLength}
        readOnly={!isEditable}
        className="mt-1 h-[100px] w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-verydarkblack dark:text-coldbeige dark:ring-blue"
      />
    </div>
  )
}

export default TextAreaField
