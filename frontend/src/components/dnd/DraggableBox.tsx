import { useRef } from 'react'

import { useDnd } from '@hooks/useDnd'

import { DraggableBoxProps } from '@types'
import { useDrag, useDrop } from 'react-dnd'

export default function DraggableBox({
  id,
  index,
  name,
  description,
  folderId,
}: DraggableBoxProps) {
  const { moveFileItem } = useDnd()
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: 'GRID_ITEM',
    hover(item: { id: string; index: number }) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      moveFileItem(folderId, dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'GRID_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`shadow-gray-300/50 m-2 h-56 rounded-[10px] bg-white p-2 shadow-lg dark:bg-verydarkblack dark:text-white ${
        isDragging ? 'opacity-20' : ''
      }`}
    >
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}
