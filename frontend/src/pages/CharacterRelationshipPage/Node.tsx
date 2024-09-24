import { memo } from 'react'

import { Handle, Position } from 'reactflow'

const Node = memo(
  ({ data }: { data: { name: string; role: string; image: string } }) => {
    return (
      <>
        <Handle type="target" position={Position.Top} />
        <div className="w-48 rounded-lg bg-white p-4 shadow-md">
          <img
            src={data.image}
            alt={data.name}
            className="mx-auto mb-2 h-16 w-16 rounded-full"
          />
          <h3 className="text-center text-lg font-semibold">{data.name}</h3>
          <p className="text-gray-600 text-center text-sm">{data.role}</p>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </>
    )
  },
)

export default Node
