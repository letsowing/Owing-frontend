import React from 'react'

import CharacterRelationshipInfo from './CharacterRelationshipInfo'

import { InfoItem } from '@/constants/characterRelationshipInfoList'

interface GridProps {
  infoList: InfoItem[]
}

const CharacterRelationshipGrid: React.FC<GridProps> = ({ infoList }) => {
  return (
    <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
      {infoList.map((info, index) => (
        <div key={index} className="p-2">
          <CharacterRelationshipInfo text={info.text} desc={info.desc} />
        </div>
      ))}
    </div>
  )
}

export default CharacterRelationshipGrid
