/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'

import AlertOwing from '@assets/common/AlertOwing.png'
import { DraggableBoxProps } from '@types'
import { useDrag, useDrop } from 'react-dnd'

export default function UniverseDraggableBox({
  id,
  index,
  name,
  description,
  folderId,
  imageUrl,
  currentService,
}: DraggableBoxProps) {
  const { moveFileItem, updateFile } = useDnd()
  const ref = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const [editedDescription, setEditedDescription] = useState(description)
  // const [editedImageUrl, setEditedImageUrl] = useState(imageUrl)

  const [, drop] = useDrop({
    accept: 'GRID_ITEM',
    hover(item: { id: number; index: number }) {
      if (!ref.current) return

      const dragIndex = item.index

      if (dragIndex === index) return

      moveFileItem(folderId, dragIndex, index)
      item.index = index

      const data = {
        position: item.index,
        folderId,
      }
      currentService.patchFile(item.id, data).catch((error: any) => {
        console.error('파일 이동 실패:', error)
      })
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

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await currentService.putFile(id, {
        name: editedName,
        description: editedDescription,
        imageUrl: imageUrl,
      })

      updateFile(folderId, id, {
        name: editedName,
        description: editedDescription,
        imageUrl: imageUrl,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('파일 업데이트 실패:', error)
    }
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditedName(name)
    setEditedDescription(description)
    setIsEditing(false)
  }

  return (
    <div
      ref={ref}
      className={`shadow-gray-300/50 m-4 flex items-center rounded-[6px] bg-white p-6 shadow-lg ${
        isDragging ? 'opacity-20' : ''
      }`}
    >
      <div className="flex w-full items-center">
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
            <div className="mt-4 text-redorange">이미지를 추가해 주세요!</div>
          </div>
        )}
        <div className="m-4 mb-auto flex w-3/4 flex-grow flex-col">
          {isEditing ? (
            <>
              <input
                className="mb-2 w-full border-b border-lightgray text-2xl font-semibold"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <textarea
                className="mt-1 h-[11rem] w-full min-w-full overflow-y-auto rounded border border-lightgray p-2 text-darkgray"
                rows={5}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <strong className="text-2xl font-semibold">{name}</strong>
              <p className="mt-4 h-[11rem] overflow-y-auto text-darkgray">
                {description}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="ml-auto flex h-56 w-1/4 flex-col items-end justify-between font-semibold">
        {isEditing ? (
          <>
            <div className="mb-auto flex flex-col items-end">
              <button className="h-10 from-redorange to-orange px-4 text-sm text-redorange hover:rounded-[10px] hover:bg-gradient-to-r hover:text-white">
                + Create Image with AI
              </button>
              <button className="mt-2 h-10 px-4 text-sm text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
                + Upload Image locally
              </button>
            </div>
            <div className="mt-auto flex flex-row items-center space-x-2">
              <button
                onClick={handleCancel}
                className="h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="mt-auto h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}
