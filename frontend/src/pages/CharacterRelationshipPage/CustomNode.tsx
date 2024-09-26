import React, { memo } from 'react'

import characterImage from '@/assets/character/Character.png'
import { CustomNodeData } from '@/types/node'
import { Handle, Position } from '@xyflow/react'

interface CustomNodeProps {
  data: CustomNodeData
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="w-32 overflow-hidden rounded-lg bg-white shadow-md dark:shadow-gray">
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="h-3 w-3"
      />
      <div className="border-b border-lightgray px-2 py-2">
        <div className="truncate text-xs font-semibold text-gray">
          {data.name}
        </div>
        <div className="truncate text-xs font-semibold text-gray">
          {data.role}
        </div>
      </div>
      <div className="p-2">
        <img
          src={characterImage}
          alt={data.name}
          className="m-auto w-20 object-cover"
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="h-3 w-3"
      />
    </div>
  )
}

export default memo(CustomNode)
