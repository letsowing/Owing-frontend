import React, { memo } from 'react'

import characterImage from '@assets/character/character.png'
import { CustomNodeRemoveProps } from '@types'
import { Handle, Position } from '@xyflow/react'
import { MdDelete } from 'react-icons/md'

const CustomNode: React.FC<CustomNodeRemoveProps> = ({
  id,
  data,
  onNodeRemove,
}) => {
  const handleDelete = () => {
    onNodeRemove(id)
  }

  return (
    <div className="w-32 overflow-hidden rounded-lg bg-white shadow-md dark:shadow-gray">
      <div className="flex justify-between border-b border-lightgray px-2 py-2">
        <div>
          <div className="truncate text-xs font-semibold text-gray">
            {data.name}
          </div>
          <div className="truncate text-xs font-semibold text-gray">
            {data.role}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray hover:text-redorange"
        >
          <MdDelete />
        </button>
      </div>
      <div className="p-2">
        <img
          src={characterImage}
          alt={data.name}
          className="m-auto w-20 object-cover"
        />
      </div>
      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left" />
    </div>
  )
}

export default memo(CustomNode)
