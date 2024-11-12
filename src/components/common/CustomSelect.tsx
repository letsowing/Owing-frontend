import React, { useEffect, useRef, useState } from 'react'

import { ChevronDown } from 'lucide-react'

interface SelectOption {
  id: number
  name: string
  value: string | number
}

interface CustomSelectProps {
  value: string | number
  onChange: (value: string | number) => void
  options: SelectOption[]
  disabled?: boolean
  className?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        className={`mt-1 h-[50px] w-full cursor-pointer rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-verydarkblack dark:text-coldbeige dark:ring-blue ${className} ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-darkgray dark:text-coldbeige">
            {options.find((option) => option.value === value)?.name ||
              '옵션을 선택해주세요'}
          </span>
          <ChevronDown className="h-5 w-5 text-redorange dark:text-blue" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border border-lightgray bg-white shadow-lg dark:border-lightdarkgray dark:bg-verydarkblack">
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`w-full cursor-pointer px-3 py-2 text-left text-darkgray hover:bg-gray focus:outline-none focus:ring-2 focus:ring-redorange dark:text-coldbeige dark:hover:bg-gray dark:focus:ring-blue ${
                option.value === value ? 'bg-gray dark:bg-gray' : ''
              }`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
