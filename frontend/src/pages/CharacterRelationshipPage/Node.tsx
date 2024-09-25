import React, { memo } from 'react'

import { CustomNodeData } from '@/types/node'
import { Handle, NodeProps, Position } from '@xyflow/react'

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  const nodeData = data as CustomNodeData
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <img
        src={nodeData.image}
        alt={nodeData.name}
        style={{ width: 50, height: 50, borderRadius: '50%' }}
      />
      <div>{nodeData.name}</div>
      <div>{nodeData.role}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default memo(CustomNode)
