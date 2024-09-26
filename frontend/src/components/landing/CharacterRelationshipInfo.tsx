import React from 'react'

interface InfoProps {
  text: string
  desc: string
}

const CharacterRelationshipInfo: React.FC<InfoProps> = ({ text, desc }) => {
  return (
    <div className="flex flex-col">
      <img
        src="src/assets/landing/document.png"
        alt="Info"
        className="mb-4 h-24 w-24"
      />
      <span>
        <p className="mb-2 text-[30px] font-bold text-darkgray">{text}</p>
        <p className="text-[25px] font-semibold text-[#999999]">{desc}</p>
      </span>
    </div>
  )
}

export default CharacterRelationshipInfo
