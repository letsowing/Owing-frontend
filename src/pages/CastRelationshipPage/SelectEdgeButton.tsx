import React from 'react'

import { PiFlowArrowBold } from 'react-icons/pi'
import { TbArrowsUpRight } from 'react-icons/tb'

interface SelectEdgeProps {
  isBidirectional: boolean
  onChange: (isBidirectional: boolean) => void
}

const SelectEdgeButton: React.FC<SelectEdgeProps> = ({
  isBidirectional,
  onChange,
}) => {
  return (
    <>
      <button
        className={`rounded px-3 py-1 ${
          isBidirectional
            ? 'bg-lightredorange font-semibold text-white dark:bg-skyblue dark:text-darkgray'
            : 'bg-beige text-gray dark:bg-coldbeige'
        }`}
        onClick={() => onChange(true)}
      >
        <TbArrowsUpRight className="h-9 w-9" />
      </button>
      <button
        className={`rounded px-3 py-1 ${
          !isBidirectional
            ? 'bg-lightredorange font-semibold text-white dark:bg-skyblue dark:text-darkgray'
            : 'bg-beige text-gray dark:bg-coldbeige'
        }`}
        onClick={() => onChange(false)}
      >
        <PiFlowArrowBold className="h-9 w-9" />
      </button>
    </>
  )
}

export default SelectEdgeButton
