import { useRef } from 'react'

import { useDnd } from '@hooks/useDnd'

import { useDrag, useDrop } from 'react-dnd'
import { GoPencil } from 'react-icons/go'
import { PiTrashSimpleLight } from 'react-icons/pi'

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

  const [, drag] = useDrag({
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
      className="${ isDragging? 'bg-[#e0e0e0] opacity-50' : 'bg-[#f5f5f5]' } my-2 flex h-10 w-full items-center justify-between"
    >
      <div className="flex items-center">
        <div
          className="h-1 w-1 rounded-full bg-redorange dark:bg-blue"
          // style={{ backgroundColor: 'orange' }}
        ></div>
        <p className="mx-4 text-darkgray">{name}</p>
      </div>

      <div className="flex w-10 items-center justify-between">
        <GoPencil className="text-darkgray" />
        <PiTrashSimpleLight className="text-darkgray" />
      </div>
    </li>
  )
}
