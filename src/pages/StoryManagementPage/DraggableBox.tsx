/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import { putStory } from '@services/storyService'
import { DraggableBoxProps } from '@types'
import { useDrag, useDrop } from 'react-dnd'

export default function DraggableBox({
  index,
  folderId,
  files,
  currentService,
  onSelectFile,
}: DraggableBoxProps) {
  const file = files[index]
  const { moveFileItem, updateFile } = useDnd()
  const ref = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(file.name)
  const [editedDescription, setEditedDescription] = useState(file.description)
  const { goToStory } = useNavigation()

  const [, drop] = useDrop({
    accept: 'GRID_ITEM',
    hover(item: { id: number; index: number }) {
      if (!ref.current) return

      const dragIndex = item.index
      if (dragIndex === index) return

      let beforeId = null
      let afterId = null

      if (index > 0) {
        beforeId = files[index - 1].id
      }

      if (index < files.length - 1) {
        afterId = files[index].id
      }

      moveFileItem(folderId, dragIndex, index)
      item.index = index

      currentService
        .patchFilePosition(item.id, {
          beforeId,
          afterId,
          folderId,
        })
        .catch((error: any) => {
          console.error('파일 이동 실패:', error)
        })
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'GRID_ITEM',
    item: { id: file.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const isFormValid = () => {
    return !!editedName.trim()
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const trimmedEditedName = editedName.trim()
    if (!trimmedEditedName) {
      setIsEditing(false)
      return
    }
    try {
      await putStory(file.id, {
        name: trimmedEditedName,
        description: editedDescription,
      })

      updateFile(folderId, file.id, {
        name: trimmedEditedName,
        description: editedDescription,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('파일 업데이트 실패:', error)
    }
  }

  const handleCancel = () => {
    setEditedName(file.name)
    setEditedDescription(file.description)
    setIsEditing(false)
  }

  const handleItemClick = (id: number) => {
    onSelectFile!(id)
    goToStory(id)
  }

  return (
    <div
      ref={ref}
      className={`shadow-gray-300/50 m-2 flex h-56 flex-col rounded-md bg-white p-2 shadow-lg dark:bg-verydarkblack dark:text-coldbeige ${
        isDragging ? 'opacity-20' : ''
      }`}
      onClick={() => !isEditing && handleItemClick(file.id)}
    >
      {isEditing ? (
        <>
          <input
            placeholder="필수 입력입니다."
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="mb-2 rounded border p-1 dark:text-darkgray"
          />
          <textarea
            placeholder="줄거리를 입력할 수 있습니다."
            value={editedDescription || ''}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="flex-grow resize-none rounded border p-1 dark:text-darkgray"
          />
          <div className="ml-auto mt-5 flex flex-row items-center space-x-2">
            <button
              onClick={handleCancel}
              className="text-md h-7 px-4 text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white dark:text-coldbeige dark:hover:bg-coldbeige dark:hover:text-darkgray"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="text-md h-7 px-4 text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white dark:text-coldbeige dark:hover:bg-coldbeige dark:hover:text-darkgray"
              disabled={!isFormValid()}
            >
              저장
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="mb-2 font-semibold">{file.name}</h3>
          <p>{file.description || '줄거리를 입력할 수 있습니다.'}</p>
          <button
            onClick={handleEdit}
            className="text-md ml-auto mt-auto h-7 from-redorange to-orange px-4 text-redorange hover:rounded-[10px] hover:bg-gradient-to-r hover:text-white dark:from-blue dark:to-skyblue dark:text-blue dark:hover:text-coldbeige"
          >
            줄거리 수정
          </button>
        </>
      )}
    </div>
  )
}
