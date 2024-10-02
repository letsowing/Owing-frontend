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
        <TbArrowsUpRight />
      </button>
      <button
        className={`rounded px-3 py-1 ${
          !isBidirectional
            ? 'bg-lightredorange font-semibold text-white dark:bg-skyblue dark:text-darkgray'
            : 'bg-beige text-gray dark:bg-coldbeige'
        }`}
        onClick={() => onChange(false)}
      >
        <PiFlowArrowBold />
      </button>
    </>
  )
}

export default SelectEdgeButton
