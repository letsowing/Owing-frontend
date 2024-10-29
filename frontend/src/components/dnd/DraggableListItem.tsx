/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import { useDrag, useDrop } from 'react-dnd'
import { GoPencil } from 'react-icons/go'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface DraggableListItemProps {
  id: number
  file: any
  index: number
  name: string
  folderId: number
  currentService: any
  onSelectFile: (fileId: number) => void
}

export default function DraggableListItem({
  id,
  file,
  index,
  name,
  folderId,
  currentService,
  onSelectFile,
}: DraggableListItemProps) {
  const { moveFileItem, updateFileName, deleteFile } = useDnd()
  const { activePath, goToScenario, goToCharacter } = useNavigation()
  const ref = useRef<HTMLLIElement>(null)

  const [isFileEditing, setIsFileEditing] = useState(false)
  const [newFileName, setNewFileName] = useState(file.name)

  const fileNameRef = useRef<HTMLDivElement>(null)

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

  const handleSaveFileName = async () => {
    if (newFileName.trim() && newFileName !== file.name) {
      try {
        const data = {
          name: newFileName,
          description: file.description,
        }
        await currentService.putFile(id, data)
        updateFileName(folderId, id, newFileName)
      } catch (error) {
        console.error('파일 이름 업데이트 실패:', error)
        setNewFileName(file.name)
      }
    } else {
      setNewFileName(file.name)
    }
    setIsFileEditing(false)
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFileName()
  }

  const handleDeleteFile = async () => {
    try {
      await currentService.deleteFile(id)
      deleteFile(folderId, id)
    } catch (error) {
      console.error('파일 삭제 실패:', error)
    }
  }

  const handleItemClick = () => {
    onSelectFile(id)
    if (activePath.includes('scenarioManagement')) {
      goToScenario(id)
    }
    if (activePath.includes('character')) {
      goToCharacter(id)
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'TAB_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'TAB_ITEM',
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
      className={`${
        isDragging ? 'bg-white opacity-50' : ''
      } group my-2 flex h-10 w-full items-center justify-between rounded-[7px] hover:bg-white`}
      onClick={handleItemClick}
    >
      <div className="flex items-center">
        <div className="ms-2 h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>

        {isFileEditing ? (
          <div
            ref={fileNameRef}
            contentEditable={isFileEditing}
            suppressContentEditableWarning={true}
            onInput={(e) => setNewFileName(e.currentTarget.textContent || '')}
            onBlur={handleSaveFileName}
            onKeyDown={handleFileNameKeyDown}
            className="h-auto w-40 max-w-[130px] resize-none overflow-hidden whitespace-pre-wrap bg-transparent px-2 text-base outline-none"
          ></div>
        ) : (
          <p className="mx-4 text-[15px] text-darkgray">{name}</p>
        )}
      </div>

      <div className="flex hidden w-10 items-center justify-between group-hover:flex">
        <GoPencil
          className={`${
            isFileEditing ? 'text-redorange dark:text-blue' : 'text-darkgray'
          } cursor-pointer`}
          onClick={handleEditFileClick}
        />
        <PiTrashSimpleLight
          onClick={handleDeleteFile}
          className="cursor-pointer text-darkgray"
        />
      </div>
    </li>
  )
}
