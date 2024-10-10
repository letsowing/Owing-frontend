import { useState } from 'react'

import { SlArrowDown } from 'react-icons/sl'

interface ToggleProps {
  question: string
  answer: string
}

const ToggleMenu: React.FC<ToggleProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAnswer = () => setIsOpen(!isOpen)

  return (
    <div className="mx-40 mb-4 rounded-lg border border-lightgray bg-white px-4 py-2 shadow-sm">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={toggleAnswer}
      >
        <h3 className="text-md text-redorange text-opacity-80">{question}</h3>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } text-orange`}
        >
          <SlArrowDown />
        </span>
      </div>
      {isOpen && (
        <div className="px-4 pb-4 text-darkgray">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default ToggleMenu
