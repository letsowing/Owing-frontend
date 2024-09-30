import { useRef } from 'react'

import { useDndStore } from '../../stores/dndStore'

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
  folderId
}: DraggableListItemProps) {
  const { moveFileItem } = useDndStore()
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
      style={{
        margin: '30px 0',
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
        listStyle: 'none',
        padding: '5px 10px',
        backgroundColor: isDragging ? '#e0e0e0' : '#f5f5f5',
        borderRadius: '4px',
      }}
    >
      <p style={{ margin: 0 }}>{name}</p>
    </li>
  )
}
