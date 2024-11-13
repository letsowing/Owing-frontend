import React, { memo, useCallback } from 'react'

import { useThemeStore } from '@/stores/themeStore'
import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'
import { CustomNodeProps, CustomNode as CustomNodeType } from '@types'
import { Handle, Position } from '@xyflow/react'
import { MdDelete } from 'react-icons/md'

export interface CustomNodeRemoveProps extends CustomNodeProps {
  onNodeRemove: (nodeId: string) => void
  onNodeClick: (event: React.MouseEvent, node: CustomNodeType) => void
}

const CustomNode: React.FC<CustomNodeRemoveProps> = ({
  id,
  data,
  onNodeRemove,
  onNodeClick,
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const imageUrl = data.image || isDarkMode ? DarkAlertOwing : AlertOwing

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onNodeRemove(id)
    },
    [id, onNodeRemove],
  )

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onNodeClick(event, { id, data } as CustomNodeType)
    },
    [id, data, onNodeClick],
  )

  return (
    <div
      className="z-10 w-32 cursor-pointer overflow-hidden rounded-lg bg-white shadow-md dark:shadow-gray"
      onClick={handleClick}
    >
      <div className="flex justify-between border-b border-lightgray px-2 py-2">
        <div>
          <p className="line-clamp-1 text-xs font-semibold text-gray">
            {data.name}
          </p>
          <p className="mt-1 line-clamp-1 text-xs font-semibold text-gray">
            {data.role}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray hover:text-redorange"
        >
          <MdDelete />
        </button>
      </div>
      <div className="h-full w-full p-2">
        <img
          src={data.image || imageUrl}
          alt={'잘못된 경로입니다'}
          className="m-auto w-5/6 object-cover text-xs text-gray"
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
