import { useRef } from 'react'

import { useWorldViewStore } from '@stores/worldViewStore'

import { useDrag, useDrop } from 'react-dnd'
import { GoPencil } from 'react-icons/go'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface WorldViewFolderItemProps {
  id: number
  folder: any
  index: number
  name: string
  folderId: number
}

export default function WorldViewFolderItem({
  // id,
  // folder,
  index,
  name,
  folderId,
}: WorldViewFolderItemProps) {
  const { moveFile } = useWorldViewStore()
  const ref = useRef<HTMLLIElement>(null)

  // useDrop 설정
  const [, drop] = useDrop({
    accept: 'FILE',
    hover(item: { index: number }) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      // 드래그 인덱스와 호버 인덱스가 같으면 리턴
      if (dragIndex === hoverIndex) return

      // moveFile 함수 호출
      moveFile(folderId, dragIndex, hoverIndex)

      // 드래그 중인 아이템의 인덱스를 업데이트
      item.index = hoverIndex
    },
  })

  // useDrag 설정
  const [, drag] = useDrag({
    type: 'FILE',
    item: { index }, // 드래그할 때 index 전달
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
        <div className="h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>
        <p className="mx-4 text-darkgray text-[15px]">{name}</p>
      </div>

      <div className="flex w-10 items-center justify-between">
        <GoPencil className="text-darkgray" />
        <PiTrashSimpleLight className="text-darkgray" />
      </div>
    </li>
  )
}
