import { useRef } from 'react'

import { useDndStore } from '../../stores/dndStore'

import { useDrag, useDrop } from 'react-dnd'

interface DraggableBoxProps {
  id: string
  index: number
  name: string
  description: string
}

export default function DraggableBox({
  id,
  index,
  name,
  description,
}: DraggableBoxProps) {
  const { moveItem } = useDndStore()
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: 'GRID_ITEM',
    hover(item: { id: string; index: number }) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      moveItem(dragIndex, hoverIndex)
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
      className={`shadow-gray-300/50 m-2 h-[250px] w-[360px] rounded-[10px] bg-white p-2 shadow-lg ${
        isDragging ? 'opacity-20' : ''
      }`}
    >
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}
