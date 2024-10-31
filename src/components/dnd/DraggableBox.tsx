/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import { DraggableBoxProps } from '@types'
import { useDrag, useDrop } from 'react-dnd'

export default function DraggableBox({
  id,
  index,
  name,
  description,
  folderId,
  currentService,
}: DraggableBoxProps) {
  const { moveFileItem, updateFile } = useDnd()
  const ref = useRef<HTMLDivElement>(null)
  const { goToScenario } = useNavigation()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const [editedDescription, setEditedDescription] = useState(description)

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
      })

      updateFile(folderId, id, {
        name: editedName,
        description: editedDescription,
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
      className={`shadow-gray-300/50 m-2 flex h-56 flex-col rounded-[10px] bg-white p-2 shadow-lg dark:bg-verydarkblack dark:text-coldbeige ${
        isDragging ? 'opacity-20' : ''
      }`}
      onClick={() => !isEditing && goToScenario(id)}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="mb-2 rounded border p-1 dark:text-darkgray"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="flex-grow resize-none rounded border p-1 dark:text-darkgray"
          />
          <div className="ml-auto mt-5 flex flex-row items-center space-x-2">
            <button
              onClick={handleCancel}
              className="text-md h-7 px-4 text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white dark:text-coldbeige dark:hover:bg-coldbeige dark:hover:text-darkgray"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-md h-7 px-4 text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white dark:text-coldbeige dark:hover:bg-coldbeige dark:hover:text-darkgray"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{name}</h3>
          <p>{description}</p>
          <button
            onClick={handleEdit}
            className="text-md ml-auto mt-auto h-7 from-redorange to-orange px-4 text-redorange hover:rounded-[10px] hover:bg-gradient-to-r hover:text-white dark:from-blue dark:to-skyblue dark:text-blue dark:hover:text-coldbeige"
          >
            Edit
          </button>
        </>
      )}
    </div>
  )
}
