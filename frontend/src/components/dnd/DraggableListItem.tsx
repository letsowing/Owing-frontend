import { useRef } from 'react'

import { useDnd } from '@hooks/useDnd'

import { useDrag, useDrop } from 'react-dnd'

interface DraggableListItemProps {
  id: string
  index: number
  name: string
  folderId: number
}

export default function DraggableListItem({
  id,
  index,
  name,
  folderId,
}: DraggableListItemProps) {
  const { moveFileItem } = useDnd()
  const ref = useRef<HTMLLIElement>(null)

  const [, drop] = useDrop({
    accept: 'TAB_ITEM',
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
    type: 'TAB_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <li
      ref={ref}
      className={`my-4 cursor-pointer list-none rounded-md p-2.5 ${
        isDragging ? 'bg-[#e0e0e0] opacity-50' : 'bg-[#f5f5f5]'
      }`}
    >
      <p className="m-0">{name}</p>
    </li>
  )
}
