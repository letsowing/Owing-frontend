import React, { useEffect, useState } from 'react'

interface InputFieldProps {
  type: 'text' | 'number'
  value: string
  labelValue: string
  isRequired?: boolean
  maxLength?: number
  isEditable?: boolean
  onChange: (value: string) => void
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  labelValue,
  isRequired = false,
  maxLength = 50,
  isEditable = true,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (isEditable && newValue.length <= maxLength) {
      setInputValue(newValue)
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
              {!inputValue && (
                <p className="text-xs font-normal text-redorange dark:text-blue">
                  입력값이 없습니다.
                </p>
              )}
            </div>
          )}
        </label>
        <span className="text-sm font-medium text-redorange dark:text-blue">
          {isEditable ? inputValue.length + '/' + maxLength : ''}
        </span>
      </div>
      <input
        required={isRequired}
        type={type}
        value={inputValue}
        onChange={onChangeInput}
        maxLength={maxLength}
        readOnly={!isEditable}
        className="mt-1 h-[50px] w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-verydarkblack dark:text-coldbeige dark:ring-blue"
      />
    </div>
  )
}

export default InputField
