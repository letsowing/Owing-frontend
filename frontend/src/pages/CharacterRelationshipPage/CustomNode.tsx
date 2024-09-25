import React, { memo } from 'react'

import { CustomNodeData } from '@/types/node'
import { Handle, Position } from '@xyflow/react'

interface CustomNodeProps {
  data: CustomNodeData
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="w-40 rounded-lg bg-white p-4 shadow-md">
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="h-3 w-3"
      />
      <img
        src={data.image}
        alt={data.name}
        className="mb-2 h-24 w-full rounded-md object-cover"
      />
      <div className="text-center font-semibold">{data.name}</div>
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="h-3 w-3"
      />
    </div>
  )
}

export default memo(CustomNode)
