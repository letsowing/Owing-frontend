import React from 'react'

import CastRelationshipInfo from './CastRelationshipInfo'

import { InfoItem } from '@constants/castRelationshipInfoList'

interface GridProps {
  infoList: InfoItem[]
}

const CastRelationshipGrid: React.FC<GridProps> = ({ infoList }) => {
  return (
    <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
      {infoList.map((info, index) => (
        <div key={index} className="p-2">
          <CastRelationshipInfo text={info.text} desc={info.desc} />
        </div>
      ))}
    </div>
  )
}

export default CastRelationshipGrid
