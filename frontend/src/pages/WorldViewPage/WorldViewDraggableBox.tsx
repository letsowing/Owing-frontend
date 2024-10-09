import { useRef } from 'react'

import { useWorldViewStore } from '@stores/worldViewStore'

import AlertOwing from '@assets/common/AlertOwing.png'
import { useDrag, useDrop } from 'react-dnd'

interface WorldViewDraggableBoxProps {
  id: string
  index: number
  name: string
  description: string
  folderId: string
  imageUrl: string
}

export default function WorldViewDraggableBox({
  id,
  index,
  name,
  description,
  folderId,
  imageUrl,
}: WorldViewDraggableBoxProps) {
  const { moveFile } = useWorldViewStore()
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: 'FILE_ITEM',
    hover(item: { id: string; index: number }) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      moveFile(folderId, dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'FILE_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`shadow-gray-300/50 m-4 flex w-full items-center rounded-[6px] bg-white p-6 shadow-lg ${isDragging ? 'opacity-20' : ''}`}
    >
      <div className="flex items-center">
        {imageUrl ? (
          <div
            className="h-[240px] w-[240px] min-w-[240px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        ) : (
          <div className="flex h-[240px] w-[240px] min-w-[240px] flex-col items-center justify-center rounded-[6px] border border-[#CFCDCD]">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto h-auto w-12"
            />
            <div className="m-2 text-redorange">이미지를 추가해 주세요!</div>
          </div>
        )}
        <div className="m-8 flex w-full flex-col">
          <strong className="text-2xl font-semibold">{name}</strong>
          <p className="mt-4 text-darkgray">{description}</p>
        </div>
      </div>

      {/* 오른쪽 버튼 그룹 */}
      <div className="flex h-full w-1/4 flex-col items-end justify-between font-semibold">
        <div className="mt-4">
          <button className="h-10 px-4 text-sm text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
            + Create Image with AI
          </button>
          <button className="h-10 px-4 text-sm text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
            + Upload Image locally
          </button>
        </div>
        <div className="mt-auto">
          <button className="h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
