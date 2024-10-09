import { useEffect, useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'

import { useDrag, useDrop } from 'react-dnd'
import { GoPencil } from 'react-icons/go'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface DraggableListItemProps {
  id: string
  file: any
  index: number
  name: string
  folderId: string
}

export default function DraggableListItem({
  id,
  file,
  index,
  name,
  folderId,
}: DraggableListItemProps) {
  const { moveFileItem, updateFileName, deleteFile } = useDnd()
  const ref = useRef<HTMLLIElement>(null)

  const [isFileEditing, setIsFileEditing] = useState(false) // 파일 이름 입력 상태
  const [newFileName, setNewFileName] = useState(file.name)

  const fileNameRef = useRef<HTMLDivElement>(null) // 파일 이름 입력을 위한 ref

  const moveCursorToEnd = () => {
    if (fileNameRef.current) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(fileNameRef.current)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  const handleEditFileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFileEditing(true)
    setTimeout(() => moveCursorToEnd(), 0)
  }

  const handleSaveFileName = () => {
    if (newFileName.trim()) {
      updateFileName(folderId, id, newFileName)
    } else {
      setNewFileName(file.name)
    }
    setIsFileEditing(false)
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFileName()
  }

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

  useEffect(() => {
    if (isFileEditing) {
      fileNameRef.current?.focus()

      if (fileNameRef.current) {
        fileNameRef.current.textContent = newFileName
      }
    }
  }, [isFileEditing, newFileName])

  return (
    <li
      ref={ref}
      className="${ isDragging? 'bg-[#e0e0e0] opacity-50' : 'bg-[#f5f5f5]' } group my-2 flex h-10 w-full items-center justify-between rounded-[7px] hover:bg-white"
    >
      <div className="flex items-center">
        <div className="h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>

        {isFileEditing ? (
          <div
            ref={fileNameRef}
            contentEditable={isFileEditing}
            suppressContentEditableWarning={true}
            onInput={(e) => setNewFileName(e.currentTarget.textContent || '')}
            onBlur={handleSaveFileName}
            onKeyDown={handleFileNameKeyDown}
            className="w-40 resize-none overflow-hidden bg-transparent px-2 text-base outline-none"
            style={{
              whiteSpace: 'pre-wrap',
              maxWidth: '130px',
              height: 'auto',
            }}
          ></div>
        ) : (
          <p className="mx-4 text-[15px] text-darkgray">{name}</p>
        )}
      </div>

      <div className="flex hidden w-10 items-center justify-between group-hover:flex">
        <GoPencil
          className={`${isFileEditing ? 'text-redorange dark:text-blue' : 'text-darkgray'} cursor-pointer`}
          onClick={handleEditFileClick}
        />
        <PiTrashSimpleLight
          onClick={() => deleteFile(folderId, id)}
          className="cursor-pointer text-darkgray"
        />
      </div>
    </li>
  )
}
