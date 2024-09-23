import React from 'react'

import { Handle, Position } from 'reactflow'

interface CustomNodeProps {
  data: {
    label: string
    image: string
  }
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="w-40 rounded-lg bg-white p-4 shadow-md">
      <img
        src={data.image}
        alt={data.label}
        className="mb-2 h-24 w-full rounded-md object-cover"
      />
      <div className="text-center font-semibold">{data.label}</div>
      <Handle type="target" position={Position.Left} className="h-3 w-3" />
      <Handle type="source" position={Position.Right} className="h-3 w-3" />
    </div>
  )
}

export default CustomNode
