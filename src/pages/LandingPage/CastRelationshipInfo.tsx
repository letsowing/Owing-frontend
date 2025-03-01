import React from 'react'

import DocumentIcon from '@assets/landing/document.png'

interface InfoProps {
  text: string
  desc: string
}

const CastRelationshipInfo: React.FC<InfoProps> = ({ text, desc }) => {
  return (
    <div className="flex flex-col">
      <img src={DocumentIcon} alt="Info" className="mb-4 h-24 w-24" />
      <span>
        <p className="mb-2 text-[30px] font-bold text-darkgray dark:text-[#ddebff]">{text}</p>
        <p className="text-[25px] font-semibold text-[#999999]">{desc}</p>
      </span>
    </div>
  )
}

export default CastRelationshipInfo
