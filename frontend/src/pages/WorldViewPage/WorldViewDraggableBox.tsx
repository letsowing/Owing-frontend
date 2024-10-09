import { useRef, useState } from 'react'

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
  const { moveFile, updateFileName, updateFileDescription } =
    useWorldViewStore()
  const ref = useRef<HTMLDivElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true) // 드래그 활성화 상태 관리

  const [editedName, setEditedName] = useState(name)
  const [editedDescription, setEditedDescription] = useState(description)

  const [, drop] = useDrop({
    accept: 'FILE_ITEM',
    hover(item: { id: string; index: number }) {
      if (!ref.current || !isDraggingEnabled) return

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
    canDrag: isDraggingEnabled, // 드래그 가능 여부를 상태에 따라 제어
  })

  drag(drop(ref))

  // 저장 핸들러
  const handleSave = () => {
    updateFileName(folderId, id, editedName)
    updateFileDescription(folderId, id, editedDescription)
    setIsEditing(false)
  }

  // 취소 핸들러
  const handleCancel = () => {
    setEditedName(name) // 원래 이름으로 되돌림
    setEditedDescription(description) // 원래 설명으로 되돌림
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

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
        <div className="m-8 mb-auto flex w-[50rem] flex-grow flex-col">
          {isEditing ? (
            <div
              onFocus={() => setIsDraggingEnabled(false)} // 포커스 시 드래그 비활성화
              onBlur={() => setIsDraggingEnabled(true)} // 포커스 해제 시 드래그 활성화
            >
              <input
                className="mb-2 w-full border-b border-lightgray text-2xl font-semibold"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <textarea
                className="mt-2 w-full min-w-full rounded border border-lightgray p-2 text-darkgray"
                rows={5}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
          ) : (
            <>
              <strong className="text-2xl font-semibold">{name}</strong>
              <p className="mt-4 text-darkgray">{description}</p>
            </>
          )}
        </div>
      </div>

      {/* 오른쪽 버튼 그룹 */}
      <div className="ml-auto flex h-full w-1/4 flex-col items-end justify-between font-semibold">
        <div className="mt-4 flex flex-col items-end">
          <button className="h-10 px-4 text-sm text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
            + Create Image with AI
          </button>
          <button className="h-10 px-4 text-sm text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
            + Upload Image locally
          </button>
        </div>
        <div className="mt-auto">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="h-12 px-4 text-lg text-redorange hover:rounded-[10px] hover:bg-redorange hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="h-12 px-4 text-lg text-redorange hover:rounded-[10px] hover:bg-redorange hover:text-white"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
