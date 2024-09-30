import { useEffect, useState } from 'react'
import React from 'react'

interface TextAreaFieldProps {
  labelValue: string
  isRequired?: boolean
  maxLength?: number
  initialValue?: string
  isEditable?: boolean
}

const TextAreaField = ({
  labelValue,
  isRequired = false,
  maxLength = 50,
  initialValue = '',
  isEditable = true,
}: TextAreaFieldProps) => {
  const [inputValue, setInputValue] = useState(initialValue)

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditable && e.target.value.length <= maxLength) {
      setInputValue(e.target.value)
    }
  }

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="font-semibold text-darkgray dark:text-white">
          {labelValue}
          {isRequired && (
            <span className="ml-1 text-redorange dark:text-blue">*</span>
          )}
        </label>
        <span className="text-sm font-medium text-redorange dark:text-blue">
          {isEditable ? inputValue.length + '/' + maxLength : ''}
        </span>
      </div>
      <textarea
        value={inputValue}
        onChange={onChangeInput}
        maxLength={maxLength}
        readOnly={!isEditable}
        className="dark:focus-blue dark:bg-verydarkblack dark:border-lightdarkgray mt-1 h-[150px] w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:text-white dark:ring-blue"
      />
    </div>
  )
}
export default TextAreaField
